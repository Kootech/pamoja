import React, { lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";

import Auth from "./Auth";

import LandingLayout from "./LandingLayout";
import Login from "../landing/Login";
import Register from "../landing/register";
import About from "../landing/About";
import Services from "../landing/Services";

import Home from "../main/main/Home";
import SendForm from "../main/user/SendForm";
import ConfirmSend from "../main/user/ConfirmSend";
import Pay from "../main/user/Pay";
import Settings from "../main/user/Settings";

import GroupDetail from "../main/groups/GroupDetail";
import CreateGroup from "../main/groups/CreateGroup";

const Groups = lazy(() => import("../main/groups/index"));
const User = lazy(() => import("../main/user/Index"));
const Landing = lazy(() => import("../landing/Home"));

const Layout = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<LandingLayout />}>
          <Route index element={<Landing />} />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route path="about" element={<About />} />
          <Route path="services" element={<Services />} />
        </Route>

        <Route path="/user" element={<Auth />}>
          <Route index element={<Home />} />
          <Route path="send-form" element={<SendForm />} />
          <Route path="confirm-send/:amount/:to" element={<ConfirmSend />} />
          <Route path="pay" element={<Pay />} />
          <Route path="settings" element={<Settings />} />
          <Route path="create-group" element={<CreateGroup />} />
          <Route path="groups/group/:id" element={<GroupDetail />} />
          <Route
            path="account"
            element={
              <Suspense>
                {" "}
                <User />
              </Suspense>
            }
          />
          <Route
            path="groups"
            element={
              <Suspense>
                {" "}
                <Groups />
              </Suspense>
            }
          />
        </Route>
      </Routes>
    </div>
  );
};

export default Layout;
