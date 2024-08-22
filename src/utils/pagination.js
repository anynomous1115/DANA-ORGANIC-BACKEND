const paginateUtil = async (req) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 5;
  const startIndex = (page - 1) * limit;
  return {
    limit,
    startIndex,
  };
};
module.exports = {
  paginateUtil,
};
