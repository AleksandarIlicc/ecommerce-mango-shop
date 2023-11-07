import axios from "axios";

export default class AuthClient {
  async registerUser(body, config) {
    try {
      const { data } = await axios.post("/api/users", body, config);
      return data;
    } catch (err) {
      return err;
    }
  }
}
