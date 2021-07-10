import React from 'react';
import { ClipboardListIcon } from '@heroicons/react/solid';
import { Input } from './parts/Input';
import Image from 'next/image';
import notePicture from '../../../public/noteundraw.svg';

export const NotesBlock = () => {
  const inputProps: object = {
    placeholder: 'Create a note',
    icon: 'note',
  };

  const notesArray: string[] = [
    // 'My first ever post! Lorem Ipsum Dolor Sit Amet. How are you? My day was nice thanks & you? Thanks it was great!',
    // 'Second post',
    // 'Third post',
    // '4th post',
    // '5th post',
  ];

  return (
    <>
      <div className="flex flex-col items-start justify-center w-full h-auto rounded-lg text-white bg-indigo-700/50 p-6 mb-4">
        <div className="flex items-start justify-between w-full mb-6">
          <h1>Notes</h1>
          <ClipboardListIcon className="h-5 w-5 cursor-pointer" />
        </div>
        <Input props={inputProps} />
        {notesArray.length > 0 ? (
          <>
            <div className="scrollbar-blue text-sm text-white flex flex-col items-start justify-start bg-none h-auto max-h-[7.25rem] w-[17.25rem] overflow-y-scroll mt-2">
              {notesArray.map((note, index) => (
                <h1
                  key={index}
                  className="mb-2 max-w-[15rem] rounded-lg bg-indigo-400 w-full p-2"
                >
                  {note}
                </h1>
              ))}
            </div>
          </>
        ) : (
          <>
            <div className="text-xs text-white flex flex-col items-start justify-center bg-none rounded-lg h-auto mt-2">
              <h1 className="mb-4">Create your first note for yourself ✌️</h1>
              <Image src={notePicture} width="500" height="135" />
            </div>
          </>
        )}
      </div>
    </>
  );
};
