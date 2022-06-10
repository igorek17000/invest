// CSS
import "./LoginPage.css";

// functions
import { qsiv } from "../../functions/functions";

// handle click functions
import { signup } from "./functions/signup";
import { loginUser } from "./functions/loginUser";

export function LoginPage() {
  return (
    <div className="LoginPage pageAnimation flex">
      <form className="LoginForm form">
        <fieldset className="flex">
          <legend>Login</legend>
          <label htmlFor="username">Username</label>
          <input type="text" name="username" className="username input" />
          <label htmlFor="password">Password</label>
          <input type="password" name="password" className="password input" />
          <button
            className="button"
            onClick={(e) => {
              e.preventDefault();
              loginUser({
                username: qsiv(".LoginForm .username"),
                password: qsiv(".LoginForm .password"),
              });
            }}
          >
            Login
          </button>
        </fieldset>
      </form>
      <form className="signupForm form">
        <fieldset className="flex">
          <legend>Sign Up</legend>
          <label htmlFor="username">Username</label>
          <input type="text" name="username" className="username input" />
          <label htmlFor="password">Password</label>
          <input type="password" name="password" className="password input" />
          <label htmlFor="repeat_password">Repeat_Password</label>
          <input
            type="password"
            name="repeat_password"
            className="repeat_password input"
          />

          <button
            className="button"
            onClick={(e) => {
              e.preventDefault();
              signup({
                username: qsiv(".signupForm .username"),
                password: qsiv(".signupForm .password"),
                repeat_password: qsiv(".signupForm .repeat_password"),
              });
            }}
          >
            Sign up
          </button>
        </fieldset>
      </form>
    </div>
  );
}
