export const validateUsername = (req, res, next) => {
  try {
    const { username } = req.body;
    const usernameRegex = /(?=.+[A-Za-z]).{3,}$/;

    if (!usernameRegex.test(username)) {
      return res
        .status(400)
        .json({ message: "username should contain at least three letters" });
    }
    next();
  } catch (error) {
    next(error);
  }
};
