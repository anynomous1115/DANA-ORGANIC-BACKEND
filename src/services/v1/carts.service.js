const Cart = require("../../models/carts.model");
const ProductCart = require("../../models/products-carts.model");

const createCartsService = async (customerId) => {
  const checkExist = await Cart.findOne({ customerId: customerId });
  if (checkExist) {
    throw {
      code: 400,
      message: "Cart already exist",
    };
  }
  const cart = await Cart.create({
    customerId: customerId,
  });
  return cart;
};

const getCartsService = async (customerId) => {
  let cart = await Cart.findOne({ customerId: customerId });
  if (!cart) {
    cart = await createCartsService(customerId);
  }
  const products = await getProductsInCartService(cart._id);
  return {
    cart: cart,
    products: products,
  };
};

const getProductsInCartService = async (cartId) => {
  const productsCarts = await ProductCart.find({ cartId: cartId });
  if (!productsCarts) {
    throw {
      code: 400,
      message: "Cart is empty",
    };
  }
  return productsCarts;
};

const createProductInCartService = async (
  productId,
  customerId,
  quantity,
  price
) => {
  const cart = await Cart.findOne({ customerId: customerId });

  const productCart = await ProductCart.create({
    productId: productId,
    cartId: cart._id,
    quantity: quantity,
    price: price,
  });
  return productCart;
};

const updateProductInCartService = async (
  productId,
  customerId,
  quantity,
  price
) => {
  const cart = await Cart.findOne({ customerId: customerId });
  const productCart = await ProductCart.findOne({
    productId: productId,
    cartId: cart._id,
  });
  if (!productCart) {
    throw {
      code: 400,
      message: "Product not found in cart",
    };
  }
  productCart.quantity = quantity;
  productCart.price = price;
  await productCart.save();
  return productCart;
};

const deleteProductInCartService = async (productId, customerId) => {
  const cart = await Cart.findOne({ customerId: customerId });
  const productCart = await ProductCart.findOne({
    productId: productId,
    cartId: cart._id,
  });
  if (!productCart) {
    throw {
      code: 400,
      message: "Product not found in cart",
    };
  }
  await ProductCart.deleteOne({
    productId: productId,
    cartId: cart._id,
  });
  return productCart;
};

module.exports = {
  createCartsService,
  getCartsService,
  getProductsInCartService,
  createProductInCartService,
  updateProductInCartService,
  deleteProductInCartService,
};
