import axios from "axios";
import React, { useContext } from "react";
import { useHistory } from "react-router-dom";
import AuthContext from "../../context/Coustomer-auth"

function LogOutBtn() {
  const { getLoggedIn } = useContext(AuthContext);

  const history = useHistory();

  async function logOut() {
    await axios.get(
      "http://localhost:8080/logout"
    );
    await getLoggedIn();
    history.push("/#");
  }

  return <button className='bg-light-purple white bn pointer shadow-3 f6 grow no-underline br-pill ph4 pv3 mb2 dib white bg-light-purple ml3' onClick={logOut}>Log out</button>;
}

export default LogOutBtn;