import axios from "axios";

const instance = axios.create({
  baseURL: "https://countries-5057c.firebaseio.com"
});

export default instance;
