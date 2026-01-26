export const checkLoginFields = (req, res, next) => {
  try {
    const { username, password } = req.body;
    if (!username || !password) {
      return res.status(400).json({ message: "please fill all fields" });
    }

    next();
  } catch (error) {
    next(error);
  }
};
