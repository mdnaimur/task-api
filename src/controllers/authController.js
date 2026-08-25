/*
 * Title: auth controller
 * Description:
 * Author: Md Naimur Rahman
 * Date: 25/08/2026
 */

const userService = require("../services/userService");
const { sendJson } = require("../utils/http");
const { AppError } = require("../errors");
