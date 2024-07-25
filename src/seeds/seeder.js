const products = require("./products.seeder");
const categories = require("./categories.seeder");

async function runSeeders() {
  try {
    await categories.importCategoriesData();
    await products.importProductsData();
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
}

runSeeders();
