import jwt from "jsonwebtoken";

const login = (req, res, next) => {
  try {
    const userId = res.locals.userId;
    const refreshToken = jwt.sign({ id: userId }, process.env.JWT_REFRESH_KEY, {
      expiresIn: "1d",
    });
    const accessToken = jwt.sign({ id: userId }, process.env.JWT_ACCESS_KEY, {
      expiresIn: "15m",
    });

    return res
      .cookie("refreshToken", refreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 24 * 60 * 60 * 1000,
      })
      .cookie("accessToken", accessToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 15 * 60 * 1000,
      })
      .status(200)
      .json({ message: "user logged in successfully" });
  } catch (error) {
    next(error);
  }
};

export default login;
