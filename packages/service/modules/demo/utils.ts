export const formatSuccessResBody = <T>(data: T) => {
  return {
    code: 0,
    message: "success",
    data,
  };
};

export const formatErrorResBody = <T>(code: number, data: T, message = 'error') => {
  const errInfo: Record<string, string> = {
    10001: 'field error'
  }
  message = errInfo[code.toString()] || message
  return {
    code,
    message,
    data,
  };
};


