import axios from "axios";

export default class OrderClient {
  async getAllOrders() {
    try {
      const response = await axios.get("/api/orders/list-orders");
      return response;
    } catch (error) {
      return error;
    }
  }

  async getSingleOrder(orderID, config) {
    try {
      const response = await axios.get(`/api/orders/${orderID}`, config);
      return response;
    } catch (error) {
      return error;
    }
  }

  async createOrder(order, config) {
    try {
      const response = await axios.post("/api/orders", order, config);
      return response;
    } catch (error) {
      return error;
    }
  }

  async payOrder(orderID, paymentInfo, config) {
    try {
      const response = await axios.put(
        `/api/orders/${orderID}/pay`,
        paymentInfo,
        config
      );
      return response;
    } catch (error) {
      return error;
    }
  }

  async shippingOrder(orderID, paymentInfo, config) {
    try {
      const response = await axios.put(
        `/api/orders/${orderID}/shipping`,
        paymentInfo,
        config
      );
      return response;
    } catch (error) {
      return error;
    }
  }
}
