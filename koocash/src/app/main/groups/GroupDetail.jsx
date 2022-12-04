import React, { useState, useEffect } from "react";
import GroupHomePage from "./components/GroupHomePage";
import Nav from "./components/Nav";
import GroupNav from "./components/GroupNav";
import { useParams } from "react-router-dom";
import { axiosInstance } from "../../../services/api";

const GroupDetail = () => {
  const [group, setGroup] = useState(null);
  const { id } = useParams();
  console.log(id);

  useEffect(() => {
    const fetchGroupDetail = async () => {
      const response = await axiosInstance.get(`/groups/cluster/${id}/`);
      // console.log(response.data);
      setGroup(response.data);
    };
    fetchGroupDetail();
  }, []);

  return (
    <div className="m-4 p-2 ">
      {/* {group && <Nav id={group.id} />} */}
      <GroupNav />
      <Nav id={id} />

      <GroupHomePage id={id} {...group} />
    </div>
  );
};

export default GroupDetail;
