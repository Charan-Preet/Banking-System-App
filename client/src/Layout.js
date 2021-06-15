import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import AuthContext from "./context/Coustomer-auth";
import LogOutBtn from "./auth/coustomer/Logout";

export default function Layout() {
  const [check, setCheck] = useState(false)
  const { loggedIn } = useContext(AuthContext);
  const { getLoggedIn } = useContext(AuthContext);

  useEffect(async () => {
    await getLoggedIn()
    setCheck(loggedIn)
  })
  console.log(check)
  return (
    <div className="w-100 pa5 mt6 tc sans-serif">
      <article className="center mw5 mw6-ns hidden ba mv4 br2 shadow-2">
        <h1 className="f4 bg-near-black white mv0 pv2 ph3">
          Applying for Loan?
        </h1>
        <div className="pa3 bt">
          {/* avatar/image of money  */}
          <div className="pa2 tc">
            <img
              src="https://i.postimg.cc/K803vzPk/OLAZ6B0.jpg"
              className="shadow-3 br-100 ba h4 w4 dib"
              alt="avatar"
            />
          </div>

          <p className="f6 f5-ns lh-copy measure mv0 tl">
            <h3 className="mid-gray tc">Easy Steps Applying For Loan:</h3>
            <ul className="b">
              <li>Register Or Login with our App.</li>
              <li className="mt2">
                Once Your Account has been created with unique username your
                agent can apply for Loan on your behalf.
              </li>
              <li className="mt2">
                Our Admins can then either Approve or reject your Loan based on
                various parameters like months,credit limit etc.
              </li>
            </ul>

            {check === true ? (
              <div className="ph3 tc">
                <Link
                  className="shadow-3 f6 grow no-underline br-pill ph4 pv2 mb2 dib white bg-hot-pink"
                  to="/loanreq"
                >
                  Check Previous Loan Request
                </Link>
                <LogOutBtn />
              </div>
            ) : (
              <div className="ph3 tc">
                <Link
                  className="shadow-3 f6 grow no-underline br-pill ph4 pv2 mb2 dib white bg-hot-pink"
                  to="/login"
                >
                  Login
                </Link>
                <Link
                  className="shadow-3 f6 grow no-underline br-pill ph4 pv2 mb2 dib white bg-light-purple ml3"
                  to="/register"
                >
                  Register
                </Link>
              </div>
            )}
          </p>
        </div>
      </article>
    </div>
  );
}
