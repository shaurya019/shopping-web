const  Product = require('../models/productModel');
const ErrorHander = require("../utils/errorhander");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const ApiFeatures = require("../utils/apifeatures");

// create product -- Admin
exports.createProduct = catchAsyncErrors(async (req,res,next) => {
  req.body.user = req.user.id;
    const product = await Product.create(req.body);
    res.status(200).json({
        success:true,
        product
    })
});


// get all product
exports.getAllProducts = catchAsyncErrors(async (req,res) => {
    const apiFeature = new ApiFeatures(Product.find(), req.query).search();
    let products = await apiFeature.query;
  res.status(200).json({
    success: true,
    products,
  });
});

// Get Product Details
exports.getProductDetails = catchAsyncErrors( async (req, res, next) => {
    const product = await Product.findById(req.params.id);
  
    if (!product) {
      return next(new ErrorHander("Product not found", 404));
    }
  
    res.status(200).json({
      success: true,
      product,
    });
  });


// update product --admin
exports.updateProduct = catchAsyncErrors( async (req,res) => {
    let product = await Product.findById(req.params.id);

    if (!product) {
        return next(new ErrorHander("Product not found", 404));
      }

    product = await Product.findByIdAndUpdate(req.params.id,req.body,{
        new:true,
        runValidators:true,
        useFindAndModify:false
    });
  res.status(200).json({
    success: true,
    product,
  });
})


// Delete Product
exports.deleteProduct = catchAsyncErrors( async (req,res) => {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return next(new ErrorHander("Product not found", 404));
    }

    await product.remove();

    res.status(200).json({
      success: true,
      message: "Product Delete Successfully",
    });
    });