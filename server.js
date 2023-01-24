const mongoose = require("mongoose");

const app = require("./app");

const { DB_HOST, PORT = 5005 } = process.env;

mongoose
  .set("strictQuery", false)
  .connect(DB_HOST)
  .then(() => {
    app.listen(PORT, () => {
      console.log("Server running. Use our API on port: 5005");
    });
  })
  .catch((error) => {
    console.log(error);
    process.exit(1);
  });
