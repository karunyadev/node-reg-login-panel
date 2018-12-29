const express = require("express");
const expressLayouts = require("express-ejs-layouts");
const app = express();

//EJS
app.use(expressLayouts);
app.set("view engine", "ejs");

//routes
app.use("/", require("./routes/index"));
app.use("/users", require("./routes/users"));

const PORT = process.env.PORT || 1337;

app.listen(PORT, () => console.log(`Server running on ${PORT}`));
