import jwt from "jsonwebtoken";

export const generateTokenAfterLogin = (req, res, next) => {
  try {
    const userId = res.locals.userId;
    const token = jwt.sign({ id: userId }, process.env.JWT_SECRET_KEY, {
      expiresIn: "1d",
    });
    return res
      .cookie("token", token, {
        httpOnly: true,
        secure: true,
        sameSite: "strict",
        maxAge: 24 * 60 * 60 * 1000,
      })
      .status(200)
      .json({ message: "user logged in successfully" });
  } catch (error) {
    next(error);
  }
};
