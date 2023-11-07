import axios from "axios";

export default class ProductClient {
  async fetchAllProducts(query, category, brand, price, color, order) {
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
