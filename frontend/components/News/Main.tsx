import { News } from './parts/News';
import { NewsWelcome } from './parts/NewsWelcome';

export const Main = () => {
  return (
    <div
      className="bg-customIndigo rounded-lg p-5 w-auto min-h-[87vh] mt-[1.5rem] mb-3 2xl:mt-[1.65rem] 2xl:mb-3"
      style={{
        background:
          'linear-gradient(144deg, rgba(79,70,229,1) 28%, rgba(236,72,153,1) 100%)',
      }}
    >
      <NewsWelcome />
      <News />
    </div>
  );
};
