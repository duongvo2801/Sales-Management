const express = require("express");
const productModel = require("../models/ProductModel");
const app = express();
const bodyParser = require("body-parser");
const path = require("path");
//
const cloudinary = require("cloudinary").v2;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json());
app.use(bodyParser.json());

cloudinary.config({
  cloud_name: "dqngbja8r",
  api_key: "973987491387615",
  api_secret: "LKINWUCeHISqmzR0dJctEEEI8c4"
});

//get danh sach tu db
app.get("/list", (req, res) => {
  productModel.find({}).then((products) => {
    res.render("products/listPs", {
      products: products.map((product) => product.toJSON()),
    });
  });
});
// get add prod
app.get("/add", (req, res) => {
  res.render("products/addP");
  console.log(req.body);
});

function addPd(file, req, res){
  console.log(req.body);
  const u = new productModel({
    name: req.body.name,
    image: file,
    rating: parseInt(req.body.rating),
    price: parseInt(req.body.price),
    description: req.body.description,
    countInStock: parseInt(req.body.countInStock),
  });
  try {
    u.save();
    res.render("products/addP", {
      viewTitle: "Thêm mới thành công!",
    });
  } catch (error) {
    res.status(500).send(err);
  }
}

//add
app.post('/addProduct',(req, res) => {
  const file = req.files.image;
  cloudinary.uploader.upload(
    file.tempFilePath,
    { folder: "product" },
    (err, result) => {
      if (err) {
        return res.send(err.message);
      }
      if(req.body._id == "") {
        addPd(result.url, req, res);
      } else {
        updateproduct(result.url, req, res);
      }
    })
  
  console.log(req.body);
});

const updateproduct = async(file, req, res) => {
  try {
    const product = await productModel.findByIdAndUpdate(
      req.body._id,
      {
        name: req.body.name,
        image: file,
        rating: parseInt(req.body.rating),
        price: parseInt(req.body.price),
        description: req.body.description,
        countInStock: parseInt(req.body.countInStock),
      },
      {
        new: true,
        upsert: true,
      }
    );
    product.save();
    res.redirect("/products/list");
  } catch (err) {
    console.log(err);
    res.render("products/addP", {
      viewTitle: "Cật nhập thất bại!",
    });
  }
};

// btn 
//update product
app.get("/edit/:_id", (req, res) => {
  productModel
    .findOne({ _id: req.params._id })
    .then((product) => {
      if (product) {
        res.render("products/addP", {
          viewTitle: "Cập nhật thông tin",
          product: product.toJSON(),
        });
      }
    })
    .catch((err) => {
      console.log(err);
      res.send(400, "Bad Request");
    });
});
//delete product
app.get("/delete/:id", async(req, res) => {
  try {
    const user = await productModel.findByIdAndDelete(req.params.id, req.body);
    if(!user) {
      res.status(404).send("Không tìm thấy id");
    } else {
      res.redirect("/products/list");
    }
  } catch (error) {
    res.status(500).send(error);
  }
});
module.exports = app;
