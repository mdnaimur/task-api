/*
 * Title:
 * Description:
 * Author: Md Naimur Rahman
 * Date: 03/09/2026
 */

const logger = (req, res, next) => {
  console.log(`[APP MIDDLEWARE(logger)] ${req.method} ${req.url}`);

  next();
};

export default logger;
