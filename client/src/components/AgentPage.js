import axios from "axios";
import { useEffect, useState } from "react";
import {
  NotificationContainer,
  NotificationManager,
} from "react-notifications";
import "react-notifications/lib/notifications.css";
import { Link } from "react-router-dom";

export default function AgentPage() {
  useEffect(() => {
    getPosts();
  }, []);
  const [user, setUser] = useState();
  const [duration, setDuration] = useState();
  const [amount, setAmount] = useState();
  const [posts, setPosts] = useState([]);

  async function submitLoan(e) {
    NotificationManager.success(
      "You loan request has been created and waiting for admin approval",
      "Loan Request Created",
      3000
    );
    e.preventDefault();
    const registerData = {
      user,
      amount,
      duration,
    };
    try {
      await axios.post("http://localhost:8080/agent/getloan", registerData);
    } catch (err) {
      console.log(err);
    }
  }

  function loanForm() {
    if (user)
      return (
        <form className="bg-near-white shadow-2 br3" onSubmit={submitLoan}>
          <legend className="f4 fw6 ph0 mh0 gray mb2 center tc">
            Loan Request for{" "}
            <strong className="sans-serif mid-gray underline">{user}</strong>
          </legend>
          <div className="w-100"></div>
          <div className="flex items-end w-100">
            <div className="w-50">
              <label for="day" className="sans-serif gray b">
                Duration
              </label>
              <select
                id="day"
                name="day"
                className="mb5"
                onChange={(e) => setDuration(e.target.value)}
              >
                <option value="3">3 Month</option>
                <option value="4">4 Months</option>
                <option value="9">9 Months</option>
              </select>
            </div>
            <div className="w-40 mb5 mr6">
              <label for="amount">
                <strong className="underline gray">Amount</strong> (in numbers):
              </label>
              <input
                onChange={(e) => {
                  setAmount(e.target.value);
                }}
                className="br3 shadow-2 pa1 ba bw2 black grow"
                type="number"
                id="quantity"
                name="quantity"
              />
            </div>
          </div>
          <input
            type="submit"
            value="Submit"
            className="center f6 link dim ph3 pv2 mb2 dib white bg-dark-gray br3 shadow-3 pointer grow"
          ></input>
        </form>
      );
  }

  const getPosts = async () => {
    try {
      const userPosts = await axios.get("http://localhost:8080/agent/data");
      setPosts(userPosts.data); // set State
    } catch (err) {
      console.log(err.message);
    }
  };

  function displayUser() {
    return posts.map((post, id) => (
      <div>
        <ul>
          <li
            onClick={() => {
              setUser(post.user);
            }}
            key={post.id}
            className="pointer link dim link dim"
          >
            {post.user}
          </li>
        </ul>
      </div>
    ));
  }

  return (
    <div className="mt6">
      <div className="tc">
        <img
          src="https://i.postimg.cc/P5tsCqcG/520379-PJ0663-525.jpg"
          className="grow br-100 ba h4 w4 dib shadow-2"
          alt="avatar"
        />
      </div>
      <div className="dim tc sans-serif mid-gray underline mb5">
        <strong>Creating Loan Request On Behalf:</strong>
        <div className="mt2">
          <Link className="f6 link dim ph4 pv2 dib white bg-mid-gray ba2 center br2 grow shadow-3" to='/agent/loandetails'>
            Check Coustomers Loan Request's
          </Link>
        </div>
      </div>
      {/* button */}
      <div className="flex flex-row w-80">
        <div className="mid-gray w-20 center tc">{displayUser()}</div>
        <div className="w-100">{loanForm()}</div>
      </div>
      <NotificationContainer />
    </div>
  );
}
