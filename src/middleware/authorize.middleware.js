/*
 * Title:
 * Description:
 * Author: Md Naimur Rahman
 * Date: 03/09/2026
 */

const authorize = (...allowedRoles) => {
  return (req, res, next) => {
    if (!allowedRoles.includes(req.user.role)) {
      return next(
        new AppError(
          "You do not have permission to perform this action",
          403,
          "FORBIDDEN",
        ),
      );
    }

    next();
  };
};

export default authorize;
