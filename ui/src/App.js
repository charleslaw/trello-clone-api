import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Types } from "./store/actions/items";

const App = () => {
  const user = useSelector((state) => state.loggedInUser);
  console.log("U", user);

  const dispatch = useDispatch();

  return (
    <div className="AppContainer">
      <h1>Tello Light</h1>
      <p>
        <Choose>
          <When condition={user && user.email}>Welcome {user.email}</When>
          <Otherwise>
            Log in:
            <p>
              Email:
              <input type="text" id="user"></input>
            </p>
            <p>
              Password:
              <input type="password" id="pass"></input>
            </p>
            <p>
              <button
                onClick={() => {
                  let user = document.getElementById("user").value;
                  let pass = document.getElementById("pass").value;
                  console.log("onClick, to dispatch", user, pass);
                  dispatch({
                    type: Types.LOG_IN_USER,
                    payload: { email: user, password: pass },
                  });
                }}
              >
                Login
              </button>
            </p>
          </Otherwise>
        </Choose>
      </p>
    </div>
  );
};

export default App;
