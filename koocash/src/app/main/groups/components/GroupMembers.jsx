import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { axiosInstance } from "../../../../services/api";

import GroupNav from "./GroupNav";

const GroupMembers = ({ groupMembers, id }) => {
  return (
    <div>
      {/* <GroupNav id={id} /> */}
      <h1 className="text-center font-bold">members</h1>

      <div class="overflow-x-auto relative">
        <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" class="py-3 px-6">
                Member name
              </th>
              <th scope="col" class="py-3 px-6">
                email
              </th>
              <th scope="col" class="py-3 px-6">
                joined
              </th>
              <th scope="col" class="py-3 px-6">
                Contribution
              </th>
            </tr>
          </thead>
          <tbody>
            {groupMembers &&
              groupMembers.map((member) => (
                <tr
                  key={member.id}
                  class="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                >
                  <>
                    <th
                      scope="row"
                      class="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                    >
                      {member.username}
                    </th>
                    <td class="py-4 px-6"> {member.email} </td>
                    <td class="py-4 px-6">----</td>
                    <td class="py-4 px-6">-</td>
                  </>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default GroupMembers;
