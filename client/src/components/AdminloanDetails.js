import axios from "axios";
import { useState } from "react";
import "react-notifications/lib/notifications.css";
import {
  NotificationContainer,
  NotificationManager,
} from "react-notifications";

export default function AgentLoanDetails() {
  const [loanData, setLoanData] = useState([]);

  function Display() {
    const data = [];
    axios
      .get("http://localhost:8080/agent/data")
      .then(function (response) {
        data.push(response.data);
        console.log(data[0]);
      })
      .catch(function (error) {
        console.log(error);
      })
      .then(function () {
        for (let i = 0; i < data[0].length; i++) {
          data.push(data[0][i].loan);
        }
        if (!loanData.length || loanData.length === 0)
          setLoanData(data.slice(1));
        else return;
      });
    return loanData.map((data, idx) => (
      <div
        className="sans-serif mt4 ba bw1 w-50 center bg-near-white pa3 br3 shadow-4 mid-gray"
        key={idx}
      >
        <div className="sans-serif mid-gray">
          <strong>Request Created On:</strong>
          {new Date(data.Date).toString()}
        </div>
        <div className="mt1">
          <strong>Amount:</strong>
          {data.amount}₹
        </div>
        <div className="mt1">
          <strong>First Emi:</strong>
          {data.amount / data.duration}₹
        </div>
        <div className="mt1">
          <strong>Duration:</strong>
          {data.duration} Months
        </div>
        <button
          className="bg-near-white bw0 courier mt1 pointer underline grow dim link"
        >
          <strong>Status:</strong>
          {data.status}
        </button>
      </div>
    ));
  }
  return (
    <div className="mt6 tc">
      <div className="tc sans-serif mid-gray">
        Since you are an <strong className="courier underline">Admin</strong> so
        you can view every Coustomer Loan Details:
      </div>
      {Display()}
      <NotificationContainer />
    </div>
  );
}
