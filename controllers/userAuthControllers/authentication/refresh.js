import AppError from "../../../errorHandlers/appError.js";

const refreshToken = (req, res, next) => {
  try {
    const refreshToken = req.cookies.refreshToken;
    if (!refreshToken) {
      const error = new AppError("You are not authenticated", 401);
      return next(error);
    }

    jwt.verify(refreshToken, process.env.JWT_REFRESH_KEY, (err, user) => {
      if (err) {
        const error = new AppError(err.message, 403);
        return next(error);
      }
      const newAccessToken = jwt.sign(
        { id: user.id },
        process.env.JWT_ACCESS_KEY,
        { expiresIn: "1d" },
      );

      return res
        .cookie("accessToken", newAccessToken, {
          httpOnly: true,
          secure: process.env.NODE_ENV === "production",
          sameSite: "strict",
          maxAge: 24 * 60 * 60 * 1000,
        })
        .json({ message: "Token refreshed successfully" });
    });
  } catch (error) {
    next(error);
  }
};

export default refreshToken;
