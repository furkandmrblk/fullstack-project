export const NewsWelcome = () => {
  return (
    <div className="flex flex-col items-center justify-start text-white antialiased p-8 bg-indigo-800/25 rounded-lg w-[53.5vw] 2xl:w-[46.5vw] h-auto">
      <h1 className="text-2xl font-semibold italic">
        Welcome to the{' '}
        <span className="p-2 ml-2 mr-2 bg-white text-black rounded-md">
          ani<span className="text-indigo-700">Spot</span>
        </span>{' '}
        news!
      </h1>
    </div>
  );
};
