import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { axiosInstance } from "../../../services/api";
import useAuth from "../../../hooks/useAuth";
import Nav from "./components/GroupNav";

const CreateGroup = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  const { userId } = useAuth();

  const navigate = useNavigate();

  const nameHandler = (e) => {
    setName(e.target.value);
  };

  const descriptionHandler = (e) => {
    setDescription(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let formData = new FormData();
    formData.append("name", name);
    formData.append("description", description);
    formData.append("created_by", userId);

    const response = await axiosInstance.post(
      "/groups/create-group/",
      formData
    );
    console.log(response);
    if (response.status == 201) {
      navigate(`/user/group/${response?.data?.id}/create-budget`);
    }
  };
  return (
    <>
      <Nav />
      <section className="relative m-2 p-2 text-center">
        <h2>Create Group</h2>
        <form onSubmit={handleSubmit}>
          <div className="relative z-0 mb-6 w-full group">
            <input
              type="text"
              name="name"
              id="username"
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder="Name of the Group"
              required
              value={name}
              onChange={nameHandler}
            />
            <label
              htmlFor="username"
              className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Business Name
            </label>
          </div>

          <label
            htmlFor="description"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400"
          >
            Description
          </label>
          <textarea
            id="description"
            rows="4"
            className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Description..."
            required
            value={description}
            onChange={descriptionHandler}
          ></textarea>

          <input type="submit" name="submit-btn" />
        </form>
      </section>
    </>
  );
};

export default CreateGroup;
