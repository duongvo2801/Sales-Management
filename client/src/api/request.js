import axios from "axios";

//IP wifi
const request = axios.create({
  baseURL: "http://192.168.1.8:9999/",
});
export default request;
