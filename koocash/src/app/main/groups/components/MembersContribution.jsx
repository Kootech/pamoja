import React, { useEffect, useState } from "react";

import { axiosInstance } from "../../../../services/api";

const MembersContribution = ({ member, amount, contribution_day }) => {
  const [username, setUsername] = useState("");

  useEffect(() => {
    const fetchUser = async () => {
      const res = await axiosInstance.get(`/api/user/${member}/`);
      setUsername(res.data.username);
    };

    fetchUser();
  }, []);
  return (
    <>
      <li>
        {" "}
        <span>{username}</span> contributed amount <span>{amount}</span>{" "}
        <span> on {contribution_day.substring(0, 10)} </span>
      </li>
    </>
  );
};

export default MembersContribution;
