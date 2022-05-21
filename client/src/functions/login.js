// export const login = (data) => {
//   dispatch(loading());
//   if (data.username === "" || data.password === "") {
//     dispatch(stopLoading());
//     dispatch(error("username, passwords can't be empty"));
//     return console.log("username and passwords can't be empty");
//   }
//   axiosConfig
//     .post("/api/user/login", data)
//     .then((res) => {
//       try {
//         dispatch(loggedin(data.username));
//         setCookie(
//           ["username", res.data.username],
//           ["token", res.headers.authorization.split(" ")[1]]
//         );

//         // if it work which i hope, i try to dispatch it from the login reducer
//         // fuck, it didn't work
//         dispatch(stopLoading());
//         dispatch(success("Logged in"));
//       } catch (err) {
//         dispatch(stopLoading());
//         dispatch(
//           error(err.response.data.errors[0] || "error, please try again")
//         );
//       }
//     })
//     .catch((err) => {
//       dispatch(stopLoading());
//       dispatch(error(err.response.data.errors[0] || "error, please try again"));
//     });
//   return;
// };
