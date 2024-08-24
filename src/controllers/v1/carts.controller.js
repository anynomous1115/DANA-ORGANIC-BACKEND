const { errorHandler, successHandler } = require("../../helper/response");
const {
  createProductInCartService,
  getCartsService,
  deleteProductInCartService,
  updateProductInCartService,
} = require("../../services/v1/carts.service");

const createCarts = async (req, res) => {
  try {
    const { _id } = req.user;
    const cart = await createCartsService(_id);
    successHandler(res, cart, "Cart created successfully", 201);
  } catch (error) {
    errorHandler(error, res);
  }
};
const getCarts = async (req, res) => {
  try {
    const { _id } = req.user;
    const cart = await getCartsService(_id);
    successHandler(res, cart, "Cart retrieved successfully", 200);
  } catch (error) {
    errorHandler(error, res);
  }
};

const createProductInCart = async (req, res) => {
  try {
    const { _id } = req.user;
    const { productId, quantity, price } = req.body;
    const cart = await createProductInCartService(
      productId,
      _id,
      quantity,
      price
    );
    successHandler(res, cart, "Product added to cart successfully", 201);
  } catch (error) {
    errorHandler(error, res);
  }
};

const updateProductInCart = async (req, res) => {
  try {
    const { _id } = req.user;
    const { productId, quantity, price } = req.body;
    if (typeof quantity !== "number" || typeof price !== "number") {
      throw {
        code: 400,
        message: "Quantity and price must be a number",
      };
    }

    const productCart = await updateProductInCartService(
      productId,
      _id,
      quantity,
      price
    );
    successHandler(
      res,
      productCart,
      "Product updated in cart successfully",
      200
    );
  } catch (error) {
    errorHandler(error, res);
  }
};

const deleteProductInCart = async (req, res) => {
  try {
    const { _id } = req.user;
    const { productId } = req.body;
    const productCart = await deleteProductInCartService(productId, _id);
    successHandler(
      res,
      productCart,
      "Product deleted from cart successfully",
      200
    );
  } catch (error) {
    errorHandler(error, res);
  }
};

module.exports = {
  createCarts,
  getCarts,
  createProductInCart,
  updateProductInCart,
  deleteProductInCart,
};
