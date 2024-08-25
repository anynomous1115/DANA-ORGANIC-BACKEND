const Location = require("../../models/locations.model");

const getLocationByCustomerService = async (customerId) => {
  const location = await Location.findOne({ customer: customerId });
  return location;
};

const createLocationByCustomerService = async (customerId, address) => {
  const location = await Location.create({
    customerId: customerId,
    address: address,
  });
  console.log(location);

  return location;
};
module.exports = {
  getLocationByCustomerService,
  createLocationByCustomerService,
};
