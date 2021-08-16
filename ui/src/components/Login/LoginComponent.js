import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Types } from "../../store/actions/items";

const DummyNameHereComponent = () => {
  const user = useSelector((state) => state.loggedInUser);
  console.log("U", user);

  const dispatch = useDispatch();

  return (
    <>
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
    </>
  );
};

// If it's export *default*, the name of the component in this file does not matter
export default DummyNameHereComponent;
