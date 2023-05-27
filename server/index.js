//import
const express = require("express");
var exphbs = require("express-handlebars");
require("dotenv").config();
const mongoose = require("mongoose");
const useRoute = require("./routes/userRoute");
const productRoute = require("./routes/productRoute");
const path = require("path");
const app = express();
const userModel = require('./models/UserModel');
//change .handlebars -> .hbs
app.engine("hbs", exphbs.engine({ defaultLayout: "main", extname: ".hbs" }));
app.set("view engine", "hbs");

app.listen(9999, () => console.log("server is connecting!"));

app.use(express.static("public"));
const fileUpload = require("express-fileupload");
app.use(fileUpload({ useTempFiles: true }));
//connect mongoDB
mongoose
  .connect(process.env.MONGO_URI, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  })
  .then(() => {
    console.log("connect to database");
  })
  .catch((err) => {
    console.log(err.message);
  });

app.use("/users", useRoute);
app.use("/products", productRoute);

// login & signin
app.use(express.json());
app.set('views', path.join(__dirname, 'views'));

app.set('view engine', 'hbs');
app.use(express.urlencoded({extended:false}));

//get URL
app.get("/login", function (req, res) {
  res.render("login");
});
app.get("/signup", function (req, res) {
  res.render("signup");
});

app.get("/home", function (req, res) {
  res.render("index");
});

app.get("/product", function (req, res) {
  res.render("product");
});
//
app.get("/users", function (req, res) {
  res.render("users");
});

app.post("/signup", async(req, res) => {
  const data = {
    name:req.body.name,
    password:req.body.password
  }
  console.log(data);

  try{
    await userModel.create({ name: req.body.name, password: req.body.password });
  } catch (e){
    return res.send("wrong inputs")
  }

  return res.status(201).render("login");
});
app.post('/login', async (req, res) => {
  try {
      const check = await userModel.findOne({ name: req.body.name })
      if (check.password === req.body.password) {
          res.status(201).render("index", { naming: `${req.body.name}+${req.body.password}` })
      }
      else {
          res.send("incorrect password")
      }
  } catch (e) {
      res.send("wrong details")
  }
})

const productsControllter = require("./controller/productsControllter");
app.use("/client/product", productsControllter);
