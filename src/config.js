const config = {
  appName: process.env.APP_NAME || "Task Management API",
  port: Number(process.env.PORT) || 3000,
  environment: process.env.NODE_ENV || "development",
};

module.exports = config;
