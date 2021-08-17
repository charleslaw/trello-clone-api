import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Types } from "../../store/actions/items";

const DummyNameHereComponent = () => {
  const user = useSelector((state) => state.loggedInUser);

  const dispatch = useDispatch();

  return (
    <>
      <h2>Welcome {user.email}!</h2>
      <h3>Boards:</h3>
      <p>
        <button
          onClick={() => {
            // Usually this would also make a server call to log the user out
            dispatch({
              type: Types.LOG_OUT,
              payload: {},
            });
          }}
        >
          Logout
        </button>
      </p>
    </>
  );
};

// If it's export *default*, the name of the component in this file does not matter
export default DummyNameHereComponent;
