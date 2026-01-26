export const validateUpdatedPassword = (req, res, next) => {
  try {
    const { newPassword } = req.body;
    if (newPassword.length < 6) {
      return res
        .status(400)
        .json({ message: "password must be at least 6 characters long" });
    }
    next();
  } catch (error) {
    next(error);
  }
};
