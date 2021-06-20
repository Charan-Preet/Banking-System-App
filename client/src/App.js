import "./App.css";
import Navbar from "./components/Navbar";
import CoustomerRegister from "./auth/coustomer/Register";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import CoustomerLogin from "./auth/coustomer/Login";
import Layout from "./Layout";
import { AuthContextProvider } from "./context/Coustomer-auth";
import { AgentAuthContextProvider } from "./context/Agent-auth";
import { AdminAuthContextProvider } from "./context/Admin-auth";
import AdminLogin from "./auth/Admin/Login";
import AgentLogin from "./auth/Agent/Login";
import AgentPage from './components/AgentPage'
import LoanDetails from './components/loanDetails'
import AdminLoanDetails from './components/AdminloanDetails'
import AgentLoanDetails from './components/AgentloanDetails'

function App() {
  return (
    <div className="App">
      <AuthContextProvider>
        <AgentAuthContextProvider>
          <AdminAuthContextProvider>
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
                <Route exact path={"/admin/login"} component={AdminLogin} />
                <Route exact path={"/agent/login"} component={AgentLogin} />
                <Route exact path={"/agent/agentpage"} component={AgentPage} />
                <Route exact path={"/loanDetails"} component={LoanDetails} />
                <Route exact path={"/agent/loandetails"} component={AgentLoanDetails} />
                <Route exact path={"/admin/loandetails"} component={AdminLoanDetails} />
              </Switch>
            </BrowserRouter>
          </AdminAuthContextProvider>
        </AgentAuthContextProvider>
      </AuthContextProvider>
    </div>
  );
}

export default App;
