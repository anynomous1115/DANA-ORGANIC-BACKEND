const Customer = require("../../models/customers.model");
const {
  getLocationByCustomerService,
  createLocationByCustomerService,
} = require("./location.service");

const getProfileByCustomerService = async (customerId) => {
  const customer = await Customer.findById(customerId).select(
    "fullName phone email Dob _id"
  );
  if (!customer) {
    throw { message: "Profile not found!", code: 404 };
  }

  const location = await getLocationByCustomerService(customerId);

  return {
    customer,
    location,
  };
};

const updateProfileByCustomerService = async (customerId, data) => {
  const { location, customer } = data;
  let newLocation;
  if (data.location) {
    newLocation = await createLocationByCustomerService(
      customerId,
      data.location
    );
  }
  const newProfile = {
    fullname: customer.fullname,
    phone: customer.phone,
    Dob: customer.Dob,
  };
  const updatedCustomer = await Customer.findByIdAndUpdate(customerId, {
    $set: Object.assign(newProfile),
  });
  return {
    customer: {
      fullnameL: updatedCustomer.fullname,
      phone: updatedCustomer.phone,
      Dob: updatedCustomer.Dob,
      email: updatedCustomer.email,
    },
    location: location,
  };
};
module.exports = {
  getProfileByCustomerService,
  updateProfileByCustomerService,
};
