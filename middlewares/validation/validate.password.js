export const validatePassword = (req, res, next) => {
  try {
    const { password, confirmPassword } = req.body;
    if (password.length < 6) {
      return res
        .status(400)
        .json({ message: "password must be at least 6 characters long" });
    }

    if (confirmPassword !== password) {
      return res.status(400).json({ message: "passwords don't match" });
    }
    next();
  } catch (error) {
    next(error);
  }
};
