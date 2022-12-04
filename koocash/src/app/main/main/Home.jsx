import React from "react";
import { AiOutlineUser } from "react-icons/ai";
import { FaUsers } from "react-icons/fa";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <>
      <div className="text-center text-3xl font-extrabold">
        <h1>Welcome Kelvin</h1>
      </div>
      <div className="mt-44 p-2 h-full  w-full grid justify-center ">
        <div className=" grid gap-1 grid-cols-1 md:grid-cols-2 justify-between ">
          <Link
            to="/user/account"
            className="mx-6 my-10 text-center border-black border-1 rounded bg-slate-200 p-4"
          >
            <AiOutlineUser className="text-4xl text-center " />
            <h1>My Account</h1>
          </Link>
          <Link
            to="/user/groups"
            className="mx-6 my-10 text-center border-black border-1 rounded bg-slate-200 p-4"
          >
            <FaUsers className="text-4xl text-center" />
            <h1>Groups</h1>
          </Link>
        </div>
      </div>
    </>
  );
};

export default Home;
