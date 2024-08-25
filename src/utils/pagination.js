const paginateUtil = async (req, totalCount) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 5;
  const startIndex = (page - 1) * limit;
  const totalPages = Math.ceil(totalCount / limit);
  const prevPage = page > 1 ? page - 1 : null;
  const nextPage = page < totalPages ? page + 1 : null;

  return {
    limit,
    startIndex,
    totalCount,
    totalPages,
    currentPage: page,
    prevPage,
    nextPage,
  };
};
module.exports = {
  paginateUtil,
};
