// import { useDispatch } from "react-redux";

// export const signup = async (data) => {
//       const dispatch = useDispatch();

//   dispatch(loading(data.username));

//   if (
//     data.username === "" ||
//     data.password === "" ||
//     data.repeat_password === ""
//   ) {
//     dispatch(error("username, passwords, repeat password can't be empty"));
//     dispatch(stopLoading());
//     return console.log("username, passwords, repeat password can't be empty");
//   }

//   axiosConfig
//     .post("/api/user/signup", data)
//     .then((res) => {
//       setCookie(res.data.username, res.headers.authorization.split(" ")[1]);
//       // props.setIsLoggedIn(true);
//       // props.setUsername(res.data.username);
//       // dispatch(success("Signed up"));
//       dispatch(stopLoading());
//     })
//     .catch((err) => {
//       console.log(err);
//       dispatch(error(err.response.data.errors[0] || "error, please try again"));
//     });
//   return;
// };
