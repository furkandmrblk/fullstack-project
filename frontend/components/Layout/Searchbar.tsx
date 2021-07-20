import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { setSearchResult } from '../../pages/api';

export const Searchbar = ({ props }): JSX.Element => {
  const [data, setData] = useState();

  const onChange = (e: any) => {
    e.preventDefault();
    setData(e.target.value);
  };

  const submitSearch = () => {
    setSearchResult(data);
  };

  return (
    <>
      {/* Searchbar */}
      <div className="flex items-center w-72 rounded-lg bg-indigo-900 pt-2 pb-2 pr-4 pl-4 mb-5 2xl:w-[270px]">
        <input
          onChange={onChange}
          className="text-base antialiased font-base text-white italic bg-indigo-900 outline-none w-64 placeholder-gray-100"
          placeholder="Search"
        />
        <svg
          onClick={submitSearch}
          className="cursor-pointer"
          width="20"
          height="20"
          viewBox="0 0 22 22"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g clipPath="url(#clip0)">
            <path
              d="M0.691229 20.374L6.90601 14.1592C5.72725 12.7039 5.0177 10.8539 5.0177 8.83956C5.0177 4.17007 8.81668 0.371094 13.4862 0.371094C18.1557 0.371094 21.9546 4.17007 21.9546 8.83956C21.9546 13.509 18.1556 17.308 13.4861 17.308C11.4718 17.308 9.62175 16.5984 8.1665 15.4197L1.95172 21.6345C1.7776 21.8085 1.49547 21.8085 1.32135 21.6345L0.691187 21.0043C0.517151 20.8302 0.517151 20.548 0.691229 20.374ZM13.4861 15.5252C17.1728 15.5252 20.1717 12.5262 20.1717 8.83956C20.1717 5.1529 17.1728 2.15394 13.4861 2.15394C9.79947 2.15394 6.80051 5.1529 6.80051 8.83956C6.80051 12.5262 9.79947 15.5252 13.4861 15.5252Z"
              fill="white"
            />
          </g>
          <defs>
            <clipPath id="clip0">
              <rect
                width="21.3939"
                height="21.3939"
                fill="white"
                transform="matrix(-1 0 0 1 21.9546 0.371094)"
              />
            </clipPath>
          </defs>
        </svg>
      </div>
    </>
  );
};
