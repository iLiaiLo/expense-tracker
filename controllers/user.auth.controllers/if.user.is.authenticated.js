export const ifUserIsAuthenticated = (_, res, next) => {
  try {
    return res
      .status(200)
      .json({
        success: true,
        message: "user has been successfully authenticated",
      });
  } catch (error) {
    next(error);
  }
};
