const Products = require("../../models/products.model");
const mongoosePaginate = require("mongoose-paginate-v2");

class ProductDAO {
  async getProducts(limit, qpage, sort, category) {
    try {
      limit = limit ? limit : 12;
      sort = sort ? sort : "asc";
      qpage = qpage ? qpage : 1;
      category = category ? category : "";

      const options = {
        sort: { price: sort },
        limit: limit,
        page: qpage,
        lean: true,
      };
      const query = category ? { status: true, category } : { status: true };

      const {
        docs,
        totalPages,
        page,
        hasPrevPage,
        hasNextPage,
        prevPage,
        nextPage,
      } = await Products.paginate(query, options);
      let parameters = { limit: limit, sort: sort };
      let products = docs;
      let productObj = {
        totalPages,
        page,
        hasPrevPage,
        hasNextPage,
        prevPage,
        nextPage,
        ...parameters,
      };
      products.push(productObj);

      console.log(products);
      return products;
    } catch (error) {
      console.log("Error al obtener los productos desde MongoDB");
      console.log(error);

      throw error;
    }
  }

  async getProductById(id) {
    const product = await Products.findOne({ _id: id });
    return product;
  }

  async renderProductView(product) {
    //función de renderizado de vista
    return templateRendered;
  }

  async addProduct(productInfo) {
    return await Products.create(productInfo);
  }

  async updateProduct(id, productInfo) {
    return await Products.updateOne({ _id: id }, productInfo);
  }

  async deleteProduct(id) {
    return await Products.updateOne({ _id: id }, { $set: { status: false } });
  }
}
module.exports = ProductDAO;
