const express = require("express");
const path = require("path");
const hbs = require("express-handlebars");

const app = express();
app.engine(".hbs", hbs());
app.set("view engine", ".hbs");

app.use((req, res, next) => {
  res.show = (name) => {
    res.sendFile(path.join(__dirname, `/views/${name}`));
  };
  next();
});

app.use(express.static(path.join(__dirname, "/public")));

app.get("/hello/:name", (req, res) => {
  res.render("hello", { name: req.params.name });
});

app.get("/", (req, res) => {
  res.render("index");
});
app.get("/about", (req, res) => {
  res.render("about", { layout: "dark" });
});
app.get("/contact", (req, res) => {
  res.render("contact");
});
app.get("/info", (req, res) => {
  res.render("info");
});
app.get("/history", (req, res) => {
  res.render("history");
});
app.post("/contact/send-message", (req, res) => {
  res.json(req.body);
});

app.use((req, res) => {
  res.status(404).send("404 not found...");
});
app.listen(8000, () => {
  console.log("serwer is running on port: 8000");
});
