import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import { axiosInstance } from "../../../services/api";
import useAuth from "../../../hooks/useAuth";

import Nav from "./components/GroupNav";
import Group from "./components/Group";

const Index = () => {
  const [groups, setGroups] = useState([]);

  const { userId } = useAuth();

  useEffect(() => {
    const loadGroups = async () => {
      const res = await axiosInstance.get(`/groups/clusters/${userId}/`);
      // console.log(res.data);
      setGroups(res.data);
      // console.log(groups);
    };
    loadGroups();
  }, []);
  return (
    <>
      <Nav />
      <h1 className="text-center font-bold text-xl m-2 p-2">
        Business Invested
      </h1>
      <Link to="/user/create-group" className=" ml-6 p-2 bg-[#00f800] rounded">
        Create a business group
      </Link>
      <div className="m-2 p-2 grid gap-2 justify-center grid-cols-1 md:grid-cols-2">
        {groups && groups.map((group) => <Group key={group.id} {...group} />)}
      </div>
    </>
  );
};

export default Index;
