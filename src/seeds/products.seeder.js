const faker = require("@faker-js/faker");
const seeder = require("mongoose-seed");

let products = [];
for (i = 0; i < 15; i++) {
  products.push({
    productName: faker.commerce.lorem.word(),
    origin: faker.address.country(),
    description: faker.commerce.productDescription(),
    price: faker.commerce.price(),
    slug: faker.lorem.slug(),
    categoriesId: mongoose.Types.ObjectId(),
    weight: faker.random.number({ min: 1, max: 5 }),
    sold: faker.random.number({ min: 0, max: 100 }),
  });
}

let data = [
  {
    model: "Product",
    documents: products,
  },
];

// connect mongodb
seeder.connect(
  "mongodb://localhost:27017/DANA-ORGANIC" ||
    process.env.MONGODB_CONNECT_STRING_LOCAL,
  function () {
    seeder.loadModels([
      "./models/products.model.js", // load mongoose model
    ]);
    seeder.clearModels(["Product"], function () {
      seeder.populateModels(data, function () {
        seeder.disconnect();
      });
    });
  }
);
