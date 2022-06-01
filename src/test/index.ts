let exports = {};
if (process.env.NODE_ENV === "development") {
  exports = require("./dev-server");
  // module.exports = require("./dev-server");
} else if (process.env.NODE_ENV === "test") {
  exports = require("./test-server");

  // module.exports = require("./test-server");
}
export default exports;
