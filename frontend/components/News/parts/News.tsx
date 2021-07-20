import { useQuery } from '@apollo/client';
import { getNewsQ } from '../../../graphql/Queries';

export const News = () => {
  const newsData = useQuery(getNewsQ);

  if (newsData.loading) return <p>Loading...</p>;

  const news = newsData.data.getNews;

  return (
    <div className="flex flex-col items-center justify-start rounded-lg text-white antialiased p-8 w-[53.5vw] h-auto 2xl:w-[46.5vw]">
      {news
        .slice(0)
        .reverse()
        .map(
          (
            news: { title: string; text: string; date: number },
            index: number
          ) => (
            <div
              key={index}
              className="flex flex-col items-start justify-start bg-indigo-800/25 rounded-lg p-4 w-[53.5vw] h-auto 2xl:w-[46.5vw] mb-4"
            >
              <h1 className="font-bold">{news.title}</h1>
              <h1 className="font-light mt-2">{news.text}</h1>
              <p className="text-sm italic mt-4">
                {new Date(1 * news.date).toLocaleString()}
              </p>
            </div>
          )
        )}
    </div>
  );
};
