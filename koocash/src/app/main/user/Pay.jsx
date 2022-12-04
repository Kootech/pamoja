import React from "react";
import UserNav from "./components/UserNav";

const Pay = () => {
  return (
    <>
      <UserNav />
      <section className="mx-4">
        <h1 className="text-center">Pay</h1>
        <div className="m-2 p-2">
          <h2 className="text-center uppercase font-bold">
            select payment method
          </h2>
          <div className="grid gap-1 grid-cols-1 md:grid-cols-3 text-center">
            <div>scan qr code</div>
            <div>payment code</div>
            <div>payment code</div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Pay;
