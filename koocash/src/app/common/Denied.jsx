import React from "react";
import { Link } from "react-router-dom";

const Denied = () => {
  return (
    <div className="bg-gray-100 h-screen">
      <div className="bg-white p-6 md:mx-auto">
        <div className="text-center">
          <h3 className="md:text-2xl text-base text-red-900 font-semibold text-center">
            Sorry Transaction Could Not be Completed
          </h3>
          <div className="py-10 text-center">
            <Link
              to="/user"
              className="px-12 bg-blue-600 hover:bg-indigo-500 text-white font-semibold py-3 rounded"
            >
              GO BACK
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Denied;
