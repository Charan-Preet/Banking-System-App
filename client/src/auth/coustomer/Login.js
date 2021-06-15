import axios from "axios";
import "./registerStyle.css";
import { Link, useHistory } from "react-router-dom";
import React, { useContext, useEffect, useState } from "react";
import AuthContext from "../../context/Coustomer-auth";

export default function CoustomerLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, seterrorMessage] = useState("");
  
  const { getLoggedIn } = useContext(AuthContext);
  const history = useHistory();

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

      await axios.post("http://localhost:8080/login", loginData);
      await getLoggedIn();
      history.push("/");
    } catch (err) {
      if (err) seterrorMessage(err.response.data.errorMessage);
    }
  }

  return (
    <main className="pa4 black-80 pb5 mt6">
      <form className="measure center" onSubmit={login}>
        <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
          <legend className="f4 fw6 ph0 mh0 mt6 center underline">Login</legend>
          {displayError()}
          <div className="mt3">
            <label className="db fw6 lh-copy f6" for="email-address">
              Email
            </label>
            <input
              className="br2 pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
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
              className="br2 pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
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
            className="br2 b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib"
            type="submit"
            value="Login"
          />
        </div>
      </form>
    </main>
  );
}
