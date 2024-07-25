require("dotenv").config();
const Product = require("../models/products.model");
const products = [
  {
    productName: "consequat fugiat",
    origin: "Japan",
    description:
      "Tempor ut aute ullamco irure voluptate dolore culpa consequat commodo non. Ad nostrud et id reprehenderit incididunt id reprehenderit. Ut excepteur voluptate est consequat. Nostrud esse ex sunt ut exercitation eiusmod et amet dolore sint. Consectetur quis do qui labore quis eu excepteur cupidatat sunt velit irure est mollit. Eu duis enim laborum nulla veniam labore. Duis eu consectetur tempor excepteur exercitation quis sint ut reprehenderit.\r\n",
    price: 12.18,
    categoriesId: "66a262ee36c2434fa2baa4b5",
    weight: 10,
    sold: 606,
    quantity: 93,
  },
  {
    productName: "commodo pariatur",
    origin: "St. Pierre and Miquelon",
    description:
      "Pariatur qui eu quis officia commodo occaecat velit. Officia aute minim mollit magna pariatur labore aliqua sit laborum. Deserunt esse consequat nostrud minim.\r\n",
    price: 10.08,
    categoriesId: "66a262eed5db8ecf8386b5dc",
    weight: 3,
    sold: 556,
    quantity: 81,
  },
  {
    productName: "exercitation voluptate",
    origin: "Ireland",
    description:
      "Et laborum et duis nisi elit culpa aute culpa enim est pariatur eu. Commodo magna est duis tempor eiusmod anim ex. Laboris veniam magna ipsum adipisicing dolore consectetur consequat labore in id commodo duis ea.\r\n",
    price: 74.2,
    categoriesId: "66a262ee634bbe4dc7b76ba6",
    weight: 10,
    sold: 634,
    quantity: 99,
  },
  {
    productName: "aute non",
    origin: "Thailand",
    description:
      "Incididunt officia eiusmod ut magna commodo veniam dolore cillum veniam eiusmod exercitation. Esse dolore consectetur aliquip reprehenderit velit ullamco ad ad est. Sit cupidatat est veniam sit nulla eiusmod pariatur incididunt Lorem. Laborum nisi nostrud elit commodo. Eiusmod pariatur nisi labore elit incididunt esse fugiat dolore do cupidatat fugiat. Ullamco cillum do adipisicing labore nostrud est in nostrud esse laboris. Occaecat deserunt laborum qui exercitation dolor.\r\n",
    price: 80.64,
    categoriesId: "66a262ee499d19e4b2d06b2f",
    weight: 1,
    sold: 87,
    quantity: 60,
  },
  {
    productName: "voluptate cupidatat",
    origin: "Argentina",
    description:
      "Consequat ut sit dolor anim in ipsum est dolor dolor cillum exercitation proident irure. Culpa irure magna nulla exercitation. Non nulla ex ex ad et. Culpa nulla qui veniam cillum id minim tempor. Commodo ullamco officia laboris dolore est ut ullamco. Non cupidatat duis eiusmod dolor dolor tempor. Dolor tempor excepteur laborum ex velit velit ut quis mollit voluptate.\r\n",
    price: 56.87,
    categoriesId: "66a262ee6b418bad9f1a0fac",
    weight: 3,
    sold: 918,
    quantity: 32,
  },
  {
    productName: "adipisicing adipisicing",
    origin: "Spain",
    description:
      "Proident incididunt cupidatat occaecat et excepteur anim non excepteur. Nulla in aute et ex anim sit commodo ad elit deserunt consequat magna. Incididunt voluptate officia pariatur dolor occaecat laborum esse qui. Ad non magna eu est incididunt duis. Qui Lorem eiusmod ut ad cupidatat fugiat aute sunt anim irure proident id. Officia nulla deserunt amet et fugiat aliqua culpa.\r\n",
    price: 48.51,
    categoriesId: "66a262eeb662e1f8df4258d2",
    weight: 5,
    sold: 103,
    quantity: 38,
  },
];

const { connectDB } = require("../configs/database");
connectDB();

const importProductsData = async () => {
  try {
    await Product.deleteMany({});
    await Product.insertMany(products);
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  importProductsData,
};
