import News from '../../models/News';

export const getNews = async (parent, args, context, info) => {
  const news = await News.find();

  return news;
};
