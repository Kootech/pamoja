import React, { useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";
import { FiSend } from "react-icons/fi";
import { GiMoneyStack, GiReceiveMoney } from "react-icons/gi";

import { axiosInstance } from "../../../../services/api";
import useAuth from "../../../../hooks/useAuth";

const UserMain = () => {
  const [amount, setAmount] = useState(0);

  const { userId } = useAuth();

  // const axiosInstance = useAxiosInstance();

  useEffect(() => {
    const fetchWallet = async () => {
      const res = await axiosInstance.get(`/api/wallet/${userId}`);
      setAmount(res.data.account_total);
    };
    fetchWallet();
  }, [amount]);
  return (
    <section className="mx-4 p-2">
      <div className="grid gap-3 grid-cols-1 md:grid-cols-12">
        <div className="m-2 p-4 md:col-span-3 bg-[#1ef2b2] md:bg-slate-100 border-1 border-black rounded h-60 relative">
          <div className="flex justify-center items-center">
            <h1 className="text-center text-4xl">{amount}</h1>
            <span>$</span>
          </div>
          <h4 className="text-center"> balance</h4>
          <div className="m-2 absolute bottom-2 ">
            <button className="mr-4 p-2 bg-white rounded">
              {" "}
              <Link to="">Details</Link>{" "}
            </button>
            <button className="ml-4 p-2 bg-white rounded">withdraw</button>
          </div>
        </div>
        <div className="m-2 p-4 h-20 md:col-span-9 bg-slate-200 border-1 border-black rounded">
          <div className="flex flex-wrap  justify-around items-center">
            <Link to="/user/send-form">
              <FiSend className="text-2xl" />
              Send
            </Link>
            <Link to="/user/pay">
              <GiMoneyStack className="text-2xl" />
              Pay
            </Link>
            <div>
              <GiReceiveMoney />
              request
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default UserMain;
