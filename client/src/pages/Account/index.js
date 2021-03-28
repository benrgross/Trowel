import React, { useEffect } from "react";
import AccountPlantCard from "../../components/AccountPlantsCard";
import CurrentAccountCard from "../../components/CurrentAccoutCard";
import { useStoreContext } from "../../utils/GlobalState";
import API from "../../utils/API";
import { SET_SAVED_ACCOUNT } from "../../utils/actions";

const Account = () => {
  const [state, dispatch] = useStoreContext();
  useEffect(() => {
    getAccount();
  }, []);

  const getAccount = async () => {
    // if (localStorage.getItem(JSON.parse("currentAccount"))) {
    const { accountName } = JSON.parse(localStorage.getItem("currentAccount"));
    console.log(accountName);
    const { data } = await API.getPlantsByAccount({
      accountName: accountName,
    });

    const accountObj = {
      accountID: data._id,
      accountName: data.accountName,
      client: data.clientContact.clientName,
      clientPhone: data.clientContact.phone,
      clientEmail: data.clientContact.email,
      address: data.location.address,
      distZone: data.location.distZone,
      notes: data.notes,
      plants: data.plants,
    };

    dispatch({
      type: SET_SAVED_ACCOUNT,
      account: accountObj,
    });
  };

  return (
    <div>
      <CurrentAccountCard />
      <AccountPlantCard />
    </div>
  );
};
export default Account;
