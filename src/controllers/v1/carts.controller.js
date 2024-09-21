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
    errorHandler(res, error);
  }
};
const getCarts = async (req, res) => {
  try {
    const { _id } = req.user;
    const cart = await getCartsService(_id);
    successHandler(res, cart, "Cart retrieved successfully", 200);
  } catch (error) {
    errorHandler(res, error);
  }
};

const createProductInCart = async (req, res) => {
  try {
    const { _id } = req.user;
    const { productId, quantity, price, image, productName } = req.body;
    const cart = await createProductInCartService(
      productId,
      _id,
      quantity,
      price,
      image,
      productName
    );
    successHandler(res, cart, "Product added to cart successfully", 201);
  } catch (error) {
    console.log(error);

    errorHandler(res, error);
  }
};

const updateProductInCart = async (req, res) => {
  try {
    const id = req.params.id;
    const { quantity } = req.body;
    if (typeof quantity !== "number") {
      throw {
        code: 400,
        message: "Quantity must be a number",
      };
    }

    const productCart = await updateProductInCartService(id, quantity);
    successHandler(
      res,
      productCart,
      "Product updated in cart successfully",
      200
    );
  } catch (error) {
    errorHandler(res, error);
  }
};

const deleteProductInCart = async (req, res) => {
  try {
    const id = req.params.id;
    const productCart = await deleteProductInCartService(id);
    successHandler(
      res,
      productCart,
      "Product deleted from cart successfully",
      200
    );
  } catch (error) {
    errorHandler(res, error);
  }
};

module.exports = {
  createCarts,
  getCarts,
  createProductInCart,
  updateProductInCart,
  deleteProductInCart,
};
