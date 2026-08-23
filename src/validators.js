/*
 * Title: Validator
 * Description:
 * Author: Md Naimur Rahman
 * Date: 22/08/2026
 */

function validateTask(data) {
  const errors = {};

  console.log("inside validateask", data);

  if (typeof data.title !== "string" || data.title.trim() === "") {
    errors.title = "Title is required";
  }

  if (data.completed !== undefined && typeof data.completed !== "boolean") {
    errors.completed = "completed must be a boolean";
  }

  return errors;
}

module.exports = {
  validateTask,
};
