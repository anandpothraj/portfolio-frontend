// Centralized environment configuration for CRA
// CRA exposes only variables prefixed with REACT_APP_

export const getServerUrl = () => {
  const url = process.env.REACT_APP_API_URL;
  return url.replace(/\/$/, '');
};

const env = { getServerUrl };
export default env;