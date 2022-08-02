import { requestHello } from '../service/hello';

export const useHello = () => {
  const getHello = async () => {
    try {
      const res = await requestHello();
      return res.data;
    } catch (error) {
      console.log(error);
    }
  };

  return { getHello };
};

