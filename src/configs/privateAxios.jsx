import axios from "axios";
import {backEndDomain} from "../assets/constance/Constance"

const instance = axios.create({
  baseURL: backEndDomain,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});
export default instance;
