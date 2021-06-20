import axios from "axios";
import React, { createContext, useEffect, useState } from "react";

const AdminAuthContext = createContext();

function AdminAuthContextProvider(props) {
  const [AdminloggedIn, setAdminLoggedIn] = useState(undefined);

  async function AdmingetLoggedIn() {
    try {
      const loggedInRes = await axios.get(
        "http://localhost:8080/admin/loggedIn"
      );
      setAdminLoggedIn(loggedInRes.data);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    AdmingetLoggedIn();
  }, []);

  return (
    <AdminAuthContext.Provider value={{ AdminloggedIn, AdmingetLoggedIn }}>
      {props.children}
    </AdminAuthContext.Provider>
  );
}

export default AdminAuthContext;
export { AdminAuthContextProvider };
