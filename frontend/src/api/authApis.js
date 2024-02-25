import axios from "axios";

export default class AuthClient {
  async userLogin(body, config) {
    try {
      const response = await axios.post("/api/auth", body, config);
      return response;
    } catch (error) {
      return error;
    }
  }
}
