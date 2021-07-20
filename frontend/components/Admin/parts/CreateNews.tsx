import { useMutation } from '@apollo/client';
import { useState } from 'react';
import { createNewsM } from '../../../graphql/Mutations';

export const CreateNews = () => {
  const [data, setData] = useState({
    title: undefined,
    text: undefined,
  });

  const { title, text } = data;

  const onChange = (e: any) => {
    e.preventDefault();
    setData({ ...data, [e.target.name]: e.target.value });
  };

  // error if undefined data dont push post to database

  const [createPost] = useMutation(createNewsM, {
    variables: {
      title: title,
      text: text,
    },
  });

  const onSubmit = async (e: any) => {
    try {
      if (title === undefined || text === undefined)
        throw Error('Can not save undefined data');

      await createPost({
        variables: {
          title: title,
          text: text,
        },
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex justify-center items-center p-2">
      <form
        onSubmit={onSubmit}
        className="relative flex flex-col items-start justify-start h-[20rem] w-[47.5rem] bg-gray-800 rounded-lg p-4"
      >
        <div className="flex items-center w-full justify-between text-white antialiased pt-2 pr-1 pl-1 pb-4">
          <h1 className="font-bold pt-2">Create Post</h1>
        </div>
        <input
          onChange={onChange}
          type="text"
          name="title"
          placeholder="Title"
          className="bg-gray-600/30 rounded-lg w-full text-xs text-white antialiased italic outline-none p-4 mb-2"
          autoComplete="off"
        />
        <textarea
          onChange={onChange}
          name="text"
          placeholder="Write a new post..."
          className="h-full w-full rounded-lg bg-gray-600/30 text-white antialiased text-xs italic outline-none resize-none p-4"
        ></textarea>
        <button
          type="submit"
          className="absolute bottom-0 right-0 mb-6 mr-6 btn bg-gray-900 text-white text-xs antialiased hover:bg-black"
        >
          Post
        </button>
      </form>
    </div>
  );
};
