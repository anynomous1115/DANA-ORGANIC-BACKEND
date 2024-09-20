const Customer = require("../../models/customers.model");
const {
  getLocationByCustomerService,
  createLocationByCustomerService,
} = require("./location.service");

const getProfileByCustomerService = async (customerId) => {
  const customer = await Customer.findById(customerId).select(
    "fullname phone email Dob _id password"
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
    fullname: data.fullname,
    phone: data.phone,
    email: data.email,
    password: data.password,
    location: newLocation ? newLocation._id : data.location, 
    Dob: data.Dob,
  };
  const updatedCustomer = await Customer.findByIdAndUpdate(customerId, {
    $set: newProfile,
  }, { new: true });
  return {
    customer: {
      fullname: updatedCustomer.fullname,
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
