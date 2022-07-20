// require("dotenv").config();

module.exports = {
  connectionString: process.env.DB_CONNECTION_STRING.replace(
    "__DATABASENAME__",
    process.env.DB_NAME
  ),
};
