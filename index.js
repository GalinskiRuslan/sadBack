const express = require("express");
const jwt = require("jsonwebtoken");
const corse = require("cors");
const app = express();
const auth = require("./routers/authRouter");
const regims = require("./routers/regimRouter");

app.use(express.json());
app.use(corse({ credentials: true, origin: "http://localhost:3000" }));
app.use("/", auth, regims);

const serverStart = () => {
  try {
    app.listen(6969, () => {
      console.log("Server started on port 6969");
    });
  } catch (error) {
    console.log(error);
  }
};
serverStart();
