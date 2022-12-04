import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { axiosInstance } from "../../../../services/api";

const Group = ({ name, description, id }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const fetchCount = async () => {
      const res = await axiosInstance.get(`/groups/members-count/${id}/`);
      setCount(res.data);
    };
    fetchCount();
  }, []);

  return (
    <div className="bg-slate-200 rounded p-2 m-2 hover:cursor-pointer">
      <Link to={`/user/groups/group/${id}`}>
        <h2 className="text-center text-xl font-bold"> {name} </h2>
        <p>{description.substring(0, 50)}...</p>
        <h2 className="text-center font-bold">Number of Members: {count} </h2>
      </Link>
    </div>
  );
};

export default Group;
