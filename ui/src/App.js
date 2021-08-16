import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Types } from "./store/actions/items";

const App = () => {
  const user = useSelector((state) => state.loggedInUser);
  console.log("U", user);

  const dispatch = useDispatch();

  return (
    <div className="AppContainer">
      <h1>Hello, world!!</h1>

      <input type="text" id="user"></input>
      <input type="text" id="pass"></input>
      <button
        onClick={() => {
          let user = document.getElementById("user").value;
          let pass = document.getElementById("pass").value;
          console.log("App dispatching", user, pass);
          dispatch({
            type: Types.LOG_IN_USER,
            payload: { email: user, password: pass },
          });
        }}
      >
        Login
      </button>
    </div>
  );
};

export default App;
