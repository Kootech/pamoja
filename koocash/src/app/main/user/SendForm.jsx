import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import UserNav from "./components/UserNav";

// import AmountContext from "../../context/AmountContext";

// { value, setValue, user, setUser, setLoading }

const SendForm = () => {
  const [user, setUser] = useState("");
  const [amount, setAmount] = useState(10);

  // const { amount, setAmount } = useContext(AmountContext);

  const changeHandler = (e) => {
    setUser(e.target.value);
  };

  const handleAmount = (e) => {
    setAmount(e.target.value);
  };

  const handleSubmit = (e) => {};
  return (
    <>
      <UserNav />
      <div className="mx-6 grid md:justify-center items-center mt-10">
        <h1 className="mb-6">send money</h1>
        <form onSubmit={handleSubmit}>
          <div className="relative z-0 mb-6 w-full group">
            <input
              type="text"
              name="username"
              id="username"
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder="username"
              required
              value={user}
              onChange={changeHandler}
            />
            <label
              htmlFor="username"
              className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              To
            </label>
          </div>
          <div className="relative z-0 mb-6 w-full group">
            <input
              type="number"
              name="floating_email"
              id="floating_email"
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=""
              required
              onChange={handleAmount}
              value={amount}
            />
            <label
              htmlFor="floating_email"
              className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              amount
            </label>
          </div>
          <Link to={`/user/confirm-send/${amount}/${user}`}>Confirm</Link>
        </form>
      </div>
    </>
  );
};

export default SendForm;
