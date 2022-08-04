import { message } from 'antd';

const useMessage = () => {
  const successMessage = (msg: string) => {
    message.success({
      content: msg,
    });
  };

  const errorMessage = (msg: string) => {
    message.error({
      content: msg,
    });
  };

  return { successMessage, errorMessage };
};

export default useMessage;
