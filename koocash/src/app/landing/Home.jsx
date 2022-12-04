import React from "react";
import Hero from "./components/Hero";

const Home = () => {
  return (
    <>
      <section className="mx-4 px-2">
        <Hero />
        <section className="mt-6">
          <h1 className="text-center text-5xl font-bold">KooCash is for you</h1>
          <div className="flex flex-wrap justify-around mt-4">
            <div>Individual</div>
            <div>groups</div>
            <div>business</div>
          </div>
        </section>
      </section>
    </>
  );
};

export default Home;
