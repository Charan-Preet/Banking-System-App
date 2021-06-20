import axios from "axios";
import React, { createContext, useEffect, useState } from "react";

const AuthContext = createContext();

function AuthContextProvider(props) {
  const [loggedIn, setLoggedIn] = useState(undefined);

  async function getLoggedIn() {
    try {
      const loggedInRes = await axios.get(
        "http://localhost:8080/loggedIn"
      );
      setLoggedIn(loggedInRes.data);
    } catch (error) { console.error(error) }
  }

  useEffect(() => {
    getLoggedIn();
  }, []);

  return (
    <AuthContext.Provider value={{ loggedIn, getLoggedIn }}>
      {props.children}
    </AuthContext.Provider>
  );
}

export default AuthContext;
export { AuthContextProvider };
