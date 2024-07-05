// Hàm phân trang
const paginate = async ( page = 1, limit = 10) => {
    try {
      const startIndex = (page - 1) * limit;
      const endIndex = page * limit;
  
      const total = await model.countDocuments();
      const totalPages = Math.ceil(total / limit);
  
      const results = await model
        .find()
        .skip(startIndex)
        .limit(limit)
        .sort(sort)
        .exec();
  
      return {
        results,
        currentPage: page,
        totalPages,
        totalResults: total,
      };
    } catch (error) {
      throw error;
    }
  };
  