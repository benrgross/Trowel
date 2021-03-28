import React, { useEffect } from "react";
import API from "../../utils/API";
import { useStoreContext } from "../../utils/GlobalState";
import { LOAD_ACCOUNTS } from "../../utils/actions";
import CreateAccForm from "../../components/CreateAccForm";
import AccountCards from "../../components/AccountCards";
import "./home.css";

const Home = () => {
  const [state, dispatch] = useStoreContext();

  // get request of accounts from db
  useEffect(() => {
    getSavedAccounts();
  }, []);

  const getSavedAccounts = async () => {
    const { email } = JSON.parse(localStorage.getItem("userInfo"));
    const { data } = await API.getAccounts(email);
    console.log("getAccounts", data);

    // set data to state
    dispatch({
      type: LOAD_ACCOUNTS,
      accounts: data.accounts,
    });
    console.log("Account Data: ", data);
  };

  return (
    <div>
      <h1>Dashboard</h1>
      <CreateAccForm />
      <h2>Your accounts: </h2>
      <AccountCards />
    </div>
  );
};

export default Home;
