import { gql } from '@apollo/client';
import { useRouter } from 'next/dist/client/router';
import React, { useContext, useState } from 'react';
import { DeleteUser } from './DeleteUser/DeleteUser';
import { Context } from '../../reducer';
import { ChangeUsername } from './ChangeUsername/ChangeUsername';
import { ChangePassword } from './ChangePassword/ChangePassword';

export const Settings = ({
  opensettings,
  settings,
  openmenu,
  open,
  openprofilemenu,
  open2,
}) => {
  const authContext = useContext(Context);
  const [deleteUser, setDeleteUser] = useState(false);
  const [changeUsername, setChangeUsername] = useState(false);
  const [resetPw, setResetPw] = useState(false);

  const router = useRouter();

  const openDelete = (e: any) => {
    e.preventDefault();

    setDeleteUser(!deleteUser);
  };

  const openChangeName = (e: any) => {
    e.preventDefault();

    setChangeUsername(!changeUsername);
  };

  const openResetPw = (e: any) => {
    e.preventDefault();

    setResetPw(!resetPw);
  };

  return (
    <>
      {settings ? (
        <>
          <div className="fixed right-0 left-0 bottom-0 z-50 flex flex-col items-center h-auto  w-80 mx-auto mb-[40vh] rounded-lg bg-indigo-900 p-5 ">
            <h1 className="text-lg antialiased font-bold text-white mb-7">
              Settings
            </h1>
            <div
              className="absolute right-0 top-0 mr-3 mt-3 h-4 w-4 cursor-pointer"
              style={{
                backgroundImage: `url('/closeIcon.svg')`,
                backgroundPosition: 'center',
                backgroundSize: 'cover',
                backgroundRepeat: 'no-repeat',
              }}
              onClick={opensettings}
            />
            {deleteUser || changeUsername || resetPw ? (
              <>
                {deleteUser ? (
                  <DeleteUser
                    opendelete={openDelete}
                    openmenu={openmenu}
                    openprofilemenu={openprofilemenu}
                    opensettings={opensettings}
                    open={open}
                    open2={open2}
                  />
                ) : null}
                {changeUsername ? (
                  <ChangeUsername
                    openchangename={openChangeName}
                    opensettings={opensettings}
                  />
                ) : null}
                {resetPw ? (
                  <ChangePassword
                    openresetpw={openResetPw}
                    opensettings={opensettings}
                  />
                ) : null}
              </>
            ) : (
              <>
                {' '}
                <div
                  onClick={openChangeName}
                  className="flex items-center justify-center text-white  bg-indigo-500/40 rounded-lg outline-none w-64 h-[2.25rem]  px-4  mb-3 cursor-pointer hover:bg-indigo-500/90 transition duration-500 ease-in-out"
                >
                  <h1>Change Username</h1>
                </div>
                <div
                  onClick={openResetPw}
                  className="flex items-center justify-center text-white bg-indigo-500/40 rounded-lg outline-none w-64 h-[2.25rem]  px-4  mb-3 cursor-pointer hover:bg-indigo-500/90 transition duration-500 ease-in-out"
                >
                  <h1>Reset Password</h1>
                </div>
                <div
                  onClick={openDelete}
                  className="flex items-center justify-center text-white  bg-red-500 rounded-lg outline-none w-64 h-[2.25rem]  px-4  mb-3 cursor-pointer hover:bg-red-700 transition duration-500 ease-in-out"
                >
                  <h1>Delete Account</h1>
                </div>{' '}
              </>
            )}
          </div>{' '}
        </>
      ) : null}
    </>
  );
};
