import React from "react";
import { useSelector } from "react-redux";
import LoginComponent from "./components/Login/LoginComponent";

const App = () => {
  const user = useSelector((state) => state.loggedInUser);

  return (
    <div className="AppContainer">
      <h1>Tello Light</h1>
      <p>
        <Choose>
          <When condition={user && user.email}>Welcome {user.email}</When>
          <Otherwise>
            <LoginComponent />
          </Otherwise>
        </Choose>
      </p>
    </div>
  );
};

export default App;
