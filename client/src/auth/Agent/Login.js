import axios from "axios";
import "../coustomer/registerStyle.css";
import { Link, useHistory } from "react-router-dom";
import React, { useContext, useEffect, useState } from "react";
import AgentAuthContext from "../../context/Agent-auth";

export default function AgentLogin() {
  const [email, setEmail] = useState("");
  const [checklogin, setChecklogin] = useState(false)
  const [password, setPassword] = useState("");
  const [errorMessage, seterrorMessage] = useState("");

  const { AgentgetLoggedIn } = useContext(AgentAuthContext);
  const { AgentloggedIn } = useContext(AgentAuthContext)
  const history = useHistory();

  useEffect(async () => {
    await AgentgetLoggedIn()
    setChecklogin(AgentloggedIn)
  })

  function redirect() {
    setTimeout(() => {
      history.push('/agent/agentpage')
    }, 3000)
  }

  function displayError() {
    if (errorMessage)
      return (
        <div className="Error br4 center ma3 pa2">
          <div className="tc">{errorMessage}</div>
        </div>
      );
  }

  async function login(e) {
    e.preventDefault();

    try {
      const loginData = {
        email,
        password,
      };

      await axios.post("http://localhost:8080/agent/login", loginData);
      await AgentgetLoggedIn();
      history.push('/agent/agentpage')
    } catch (err) {
      if (err) seterrorMessage(err.response.data.errorMessage);
    }
  }

  return (
    AgentloggedIn ?
      <div className='mt6 mid-gray tc center'>You are Already loggedIn as agent redirecting you to AgentPage...
        {redirect()}
      </div> :
      <main className="pa4 black-80 mt6">
        <form className="br3 measure center" onSubmit={login}>
          <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
            <legend className="f4 fw6 ph0 mh0 center sans-serif underline">Agent Sign In</legend>
            {displayError()}
            <div className="mt3">
              <label className="db fw6 lh-copy f6" for="email-address">
                Email
              </label>
              <input
                className="br3 pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                type="email"
                name="email-address"
                id="email-address"
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="mv3">
              <label className="db fw6 lh-copy f6" for="password">
                Password
              </label>
              <input
                className="br3 b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                type="password"
                name="password"
                id="password"
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <label className="pa0 ma0 lh-copy f6 pointer">
              <input type="checkbox" /> Remember me
            </label>
          </fieldset>
          <div className="">
            <input
              className="br3 b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib"
              type="submit"
              value="Sign in"
            />
          </div>
        </form>
      </main>
  );
}
