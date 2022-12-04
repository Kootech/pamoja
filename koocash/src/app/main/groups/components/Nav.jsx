import React from "react";
import { Link } from "react-router-dom";
import { AiFillHome, AiFillAccountBook, AiFillWechat } from "react-icons/ai";
import { GiTakeMyMoney } from "react-icons/gi";

const GroupNav = ({ id }) => {
  return (
    <div className="flex mx-4 p-2 justify-around">
      <Link
        to={`/user/groups/group/${id}`}
        className="p-2 hover:bg-slate-200 rounded flex md:text-2xl"
      >
        <AiFillHome className="mx-2" />
        Home
      </Link>
      <Link
        to={`/user/groups/group/${id}/budget`}
        className="p-2 hover:bg-slate-200 rounded flex md:text-2xl"
      >
        <GiTakeMyMoney className="mx-2" />
        Spending
      </Link>
      <Link
        to={`/user/groups/group/${id}/budget`}
        className="p-2 hover:bg-slate-200 rounded flex md:text-2xl"
      >
        <AiFillAccountBook className="mx-2" />
        Budget
      </Link>
      <Link to="" className="p-2 hover:bg-slate-200 rounded flex md:text-2xl">
        <AiFillWechat className="mx-2" />
        Chat
      </Link>
    </div>
  );
};

export default GroupNav;
