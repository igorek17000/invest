// Libraries and Packages
import axios from "axios";

const local = true;

export const url = local
  ? "http://localhost:4200"
  : "https://mern-template-0.herokuapp.com";

export const axiosConfig = axios.create({
  baseURL: url,
  withCredentials: true,
  headers: {
    Authorization: "Bearer " + localStorage.getItem("token"),
  },
});

// axios.interceptors.response.use(
//   function (response) {
//     // Any status code that lie within the range of 2xx cause this function to trigger
//     // Do something with response data
//     return response;
//   },
//   function (error) {
//     // Any status codes that falls outside the range of 2xx cause this function to trigger
//     // Do something with response error
//     return Promise.reject(error);
//   }
// );

axiosConfig.defaults.headers.post["Content-Type"] =
  "application/x-www-form-urlencoded";
axiosConfig.defaults.headers.put["Content-Type"] =
  "application/x-www-form-urlencoded";

///*  */
// what is the best way to read the state object from outside react components
