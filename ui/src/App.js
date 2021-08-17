import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import LoginComponent from "./components/Login/LoginComponent";
import BoardsComponent from "./components/Boards/BoardsComponent";
import { Types } from "./store/actions/items";

const App = () => {
  const dispatch = useDispatch();

  const user = useSelector((state) => state.loggedInUser);
  const init = useSelector((state) => state.init);

  // The empty array ensures it is called only once, on the first render.
  useEffect(() => {
    dispatch({
      type: Types.CHECK_LOGIN,
      payload: null,
    });
  }, []);

  return (
    <div className="AppContainer">
      <h1>Tello Light</h1>
      <div>
        <Choose>
          <When condition={init}>Loading...</When>
          <When condition={user && user.email}>
            <BoardsComponent />
          </When>
          <Otherwise>
            <LoginComponent />
          </Otherwise>
        </Choose>
      </div>
    </div>
  );
};

export default App;
