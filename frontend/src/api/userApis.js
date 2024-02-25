import axios from "axios";

export default class UserClinent {
  async getAllCustomers() {
    try {
      const reponse = await axios.get("/api/users");
      return reponse;
    } catch (error) {
      return error;
    }
  }

  async registerUser(body, config) {
    try {
      const { data } = await axios.post("/api/users", body, config);
      return data;
    } catch (err) {
      return err;
    }
  }
}
