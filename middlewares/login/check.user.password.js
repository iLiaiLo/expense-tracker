import bcrypt from "bcrypt";
export const checkUserPassword = async (req, res, next) => {
  try {
    const { password } = req.body;
    const userPassword = res.locals.userPassword;
    const passwordsAreMatched = await bcrypt.compare(password, userPassword);
    if (!passwordsAreMatched) {
      return res.status(401).json({ message: "passwords are not matched" });
    }
    next();
  } catch (error) {
    next(error);
  }
};
