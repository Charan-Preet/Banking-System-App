import "./App.css";
import Navbar from "./components/Navbar";
import CoustomerRegister from "./auth/coustomer/Register";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import CoustomerLogin from "./auth/coustomer/Login";
import Layout from "./Layout";
import LoanReq from "./components/LoanReq";
import { AuthContextProvider } from "./context/Coustomer-auth";
import AdminLogin from "./auth/Admin/Login";
import AgentLogin from "./auth/Agent/Login";

function App() {
  return (
    <div className="App">
      <AuthContextProvider>
        <BrowserRouter>
          <div className="flex flex-column">
            <div className="outline">
              <Navbar />
            </div>
          </div>
          <Switch>
            <Route exact path={"/"} component={Layout} />
            <Route exact path={"/register"} component={CoustomerRegister} />
            <Route exact path={"/login"} component={CoustomerLogin} />
            <Route exact path={"/loanreq"} component={LoanReq} />
            <Route exact path={"/admin/login"} component={AdminLogin} />
            <Route exact path={"/agent/login"} component={AgentLogin} />
          </Switch>
        </BrowserRouter>
      </AuthContextProvider>
    </div>
  );
}

export default App;
