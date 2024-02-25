import axios from "axios";

export default class ProductClient {
  async getAllProducts() {
    try {
      const { data } = await axios.get("/api/products");
      return data;
    } catch (error) {
      return error;
    }
  }

  async getSingleProduct(productId) {
    try {
      const { data } = await axios.get(`/api/products/${productId}`);
      return data;
    } catch (error) {
      return error;
    }
  }

  async fetchAllSearchProducts(query, category, brand, price, color, order) {
    try {
      const { data } = await axios.get(
        `/api/products/search?query=${query}&category=${category}&brand=${brand}&price=${price}&color=${color}&order=${order}`
      );
      return data;
    } catch (err) {
      return err;
    }
  }

  async fetchAllCategories() {
    try {
      const { data } = await axios.get(`/api/products`);
      return data;
    } catch (err) {
      return err;
    }
  }
}
