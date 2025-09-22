// Centralized environment configuration for CRA
// CRA exposes only variables prefixed with REACT_APP_

export const getServerUrl = () => {
  const environment = process.env.REACT_APP_ENVIRONMENT;
  if (environment === 'local') return process.env.REACT_APP_LOCAL;
  if (environment === 'development') return process.env.REACT_APP_DEVELOPMENT;
  if (environment === 'production') return process.env.REACT_APP_PRODUCTION;
  return '';
};

const env = { getServerUrl };
export default env;


