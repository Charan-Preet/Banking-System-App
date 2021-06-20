import axios from "axios";
import React, { createContext, useEffect, useState } from "react";

const AgentAuthContext = createContext();

function AgentAuthContextProvider(props) {
  const [AgentloggedIn, setAgentLoggedIn] = useState(undefined);

  async function AgentgetLoggedIn() {
    try {
      const loggedInRes = await axios.get(
        "http://localhost:8080/agent/loggedIn"
      );
      setAgentLoggedIn(loggedInRes.data);
    } catch (err) { console.error(err) }
  }

  useEffect(() => {
    AgentgetLoggedIn();
  }, []);

  return (
    <AgentAuthContext.Provider value={{ AgentloggedIn, AgentgetLoggedIn }}>
      {props.children}
    </AgentAuthContext.Provider>
  );
}

export default AgentAuthContext;
export { AgentAuthContextProvider };
