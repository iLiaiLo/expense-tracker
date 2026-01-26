export const validateEmail = (req, res, next) => {
  try {
    const { email } = req.body;
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    if (!emailRegex.test(email)) {
      return res.status(400).json({ message: "please provide valid email" });
    }
    next();
  } catch (error) {
    next(error);
  }
};
