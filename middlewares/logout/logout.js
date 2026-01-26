export const logout = (_, res, next) => {
  try {
    return res
      .clearCookie("token", {
        httpOnly: true,
        sameSite: "none",
        secure: true,
      })
      .status(200)
      .json({ message: "user logged out" });
  } catch (error) {
    next(error);
  }
};
