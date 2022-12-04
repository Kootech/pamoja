import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { axiosInstance } from "../../../../services/api";
import useAuth from "../../../../hooks/useAuth";
import MembersContribution from "./MembersContribution";
import GroupMembers from "./GroupMembers";

const GroupHomePage = ({ name, id }) => {
  const [balance, setBalance] = useState(0);
  const [userBalance, setUserBalance] = useState("");
  const [members, setMembers] = useState([]);
  const [budget, setBudget] = useState("");
  const [groupMembers, setGroupMembers] = useState([]);

  const { userId } = useAuth();

  useEffect(() => {
    const fetchMembers = async () => {
      const res = await axiosInstance.get(`/groups/view-members/${id}/`);
      setGroupMembers(res.data);
    };
    fetchMembers();
  }, []);

  useEffect(() => {
    const fetchBudget = async () => {
      const response = await axiosInstance.get(`/groups/lastbudget/${id}/`);
      // console.log(response.data);
      setBudget(response.data);
    };

    fetchBudget();
  }, []);

  useEffect(() => {
    const fetchUserTotal = async () => {
      const response = await axiosInstance.get(
        `/groups/contributed/${id}/${userId}/`
      );
      setUserBalance(response.data.amount__sum);
    };

    const fetchGroupDetail = async () => {
      const response = await axiosInstance.get(
        `/groups/account-balance/${id}/`
      );
      setBalance(response.data.balance);
    };

    const fetchContribMembers = async () => {
      const response = await axiosInstance.get(`/groups/individual/${id}/`);
      setMembers(response.data);
    };

    fetchContribMembers();
    fetchGroupDetail();
    fetchUserTotal();
  }, []);

  return (
    <>
      <h3 className="text-center m-2 font-bold text-2xl"> {name} </h3>
      <Link
        to={`/user/group/${id}/contribute`}
        className="mx-4 bg-[#00ff00] rounded p-2"
      >
        contribute +
      </Link>
      <section className="m-2 p-2 grid gap-1 grid-cols-6 md:grid-cols-12">
        <div className=" col-span-6 md:col-span-3  bg-slate-200 rounded p-2 m-2 shadow-xl">
          <div className="flex flex-col justify-center items-center">
            <div className="flex">
              <h2 className="text-2xl font-bold"> {balance} </h2>
              <span className="italic">ksh</span>
            </div>
            <p>group balance</p>
            <Link to="" className="bg-blue-400 p-2 my-2 rounded-xl">
              More Details
            </Link>
          </div>
        </div>
        <div className="col-span-6 md:col-span-3  bg-slate-200 rounded p-2 m-2 shadow-xl">
          <div className="flex flex-col justify-center items-center">
            <div className="flex">
              <h2 className="text-2xl font-bold">recent spending</h2>
            </div>
            <p>buy cables</p>
            <p>amount: 5000</p>
            <p>status: pending</p>
            <p>more details...</p>
          </div>
        </div>

        <div className="col-span-6 md:col-span-6  p-2 m-2 bg-blue-200 rounded-xl shadow-xl">
          <h2 className="font-bold text-xl text-center">
            Active Group Activity
          </h2>

          <div className="flex  justify-around items-center ">
            <div className="m-2 p-2  text-center rounded-xl">
              <h2 className="text-xl wrap">{budget.name}</h2>
              <h2 className="text-xl wrap my-2">
                Target Amount: {budget.target}
              </h2>
              <Link
                className="bg-blue-400 p-2 my-4 rounded-xl"
                to={`/user/group/${id}/budget-page/${budget.id}`}
              >
                More Details...
              </Link>
            </div>
          </div>
        </div>
      </section>
      <section className="m-2 p-2 grid gap-2 grid-cols-1 md:grid-cols-12">
        <div className="col-span-6 bg-slate-200 rounded p-2 m-2">
          <h1 className="my-4 text-xl font-bold">Recent Members Activity</h1>
          <ul>
            {members &&
              members.map((member) => (
                <MembersContribution key={member.id} {...member} />
              ))}
          </ul>
        </div>
        <div className="col-span-6 bg-slate-200 rounded p-2 m-2 text-center font-bold">
          <GroupMembers groupMembers={groupMembers} id={id} />
        </div>
      </section>
    </>
  );
};

export default GroupHomePage;
