interface Response {
  message?: string;
  data?: any;
  status: number;
  error?: any;
}

export const sendReponse = ({ message, data, status, error }: Response) => {
  return {
    message,
    data,
    status,
    error,
  };
};
