// The backend's error middleware responds with { code, message, stack? } JSON.
// Axios already parses that into err.response.data, so just read .message.
const getErrorMessage = (err: any, fallback: string): string => {
  return err?.response?.data?.message || fallback;
};

export default getErrorMessage;
