export const checkSignupFields = (req, res, next) => {
  try {
    const { username, email, password, confirmPassword } = req.body;

    if (!username || !email || !password || !confirmPassword) {
      return res
        .status(400)
        .json({ message: "username email and password fields are required" });
    }
    next();
  } catch (error) {
    next(error);
  }
};
