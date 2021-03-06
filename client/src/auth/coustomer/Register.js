import axios from "axios";
import { Link, useHistory } from "react-router-dom";
import React, { useContext, useEffect, useState } from "react";
import AuthContext from '../../context/Coustomer-auth'
import "./registerStyle.css";

export default function CoustomerRegister() {
  const [user, setUser] = useState("");
  const [checklogin, setChecklogin] = useState()
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordVerify, setPasswordVerify] = useState("");
  const [errorMessage, seterrorMessage] = useState("");

  const { getLoggedIn } = useContext(AuthContext);
  const { loggedIn } = useContext(AuthContext);
  const history = useHistory();

  useEffect(async () => {
    await getLoggedIn()
    setChecklogin(loggedIn)
  })

  function displayError() {
    if (errorMessage)
      return (
        <div className="Error br4 center ma3 pa2">
          <div className="tc">{errorMessage}</div>
        </div>
      );
  }

  async function register(e) {
    e.preventDefault();

    try {
      const registerData = {
        user,
        email,
        password,
        passwordVerify,
      };

      await axios.post("http://localhost:8080/register", registerData);
      await getLoggedIn();
      history.push("/");
    } catch (err) {
      if (err) seterrorMessage(err.response.data.msg);
    }
  }

  function redirect() {
    setTimeout(() => {
      history.push('/')
    }, 3000)
  }
  return (
    loggedIn ?
      <div className='mt6 mid-gray tc center'>You are Already loggedIn as Coustomer Redirecting you to Homepage...
        {redirect()}
      </div> :
      <main className="pa4 black-80 pb5 mt5">
        <form className="measure center" onSubmit={register}>
          <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
            <legend className="f4 fw6 ph0 mh0 mt6 center underline">
              Register
            </legend>
            {displayError()}
            <div className="mt3">
              <label className="db fw6 lh-copy f6" for="user-name">
                Username
              </label>
              <input
                className="br2 pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                type="name"
                name="user-name"
                id="user-name"
                onChange={(e) => setUser(e.target.value)}
              />
            </div>
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
              <label
                className="db fw6 lh-copy f6"
                for="password"
                onChange={(e) => setPassword(e.target.value)}
              >
                Password
              </label>
              <input
                className="br2 b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                type="password"
                name="password"
                id="password"
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="mv3">
              <label className="db fw6 lh-copy f6" for="password">
                Re-Enter the password
              </label>
              <input
                className="br2 b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                type="password"
                name="password"
                id="password"
                onChange={(e) => setPasswordVerify(e.target.value)}
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
              value="Register"
            />
          </div>
          <div className="lh-copy mt3">
            <Link to="/login" className="f6 link dim black db">
              <strong>Sign In</strong>
            </Link>
          </div>
        </form>
      </main>
  );
}
