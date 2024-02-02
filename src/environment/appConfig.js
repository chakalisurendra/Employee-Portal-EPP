/**
 * Configuration Object that contains environment specific variables.
 *
 */
export const AppConfig = {
  employeeDetailsTable: process.env.EMPLOYEE_TABLE,
  logLevel: 'info',
  DBConfig: {
    region: process.env.REGION
  }
};

export const httpStatusCodes = {
  BAD_REQUEST: '400',
  NOT_FOUND: '404',
  INTERNAL_SERVER_ERROR: '500',
  SUCCESS: '200',
  CREATED: '201',
  'UNAUTHORIZED': '12008'
};

export const responseCodes = {
    'BAD_REQUEST': 400,
    'INTERNAL_SERVER_ERROR': 500,
    'NOT_FOUND': 404,
    'SUCCESS': 200,
};

export const warningMsg = {
  'hardStopCodeMsg': 'We are unable to display some account information at this time. Please reach out to Victory Service Representative at 1-800-235-8396 to assist you in updating important account information.',
  'softStopCodeMsg': 'Please contact a Member Service Representative at 1-800-235-8396 for assistance with your account as we may be unable to process your transaction.',
  'accountLockMsg': 'For your security, your account has been locked. Please call a Member Service Representative (800) 235-8396. At the prompt say “Security”.'
};

export const allowedLogLevels = {
  'INFO': 'info',
  'WARN': 'warn',
  'DEBUG': 'debug',
  'ERROR': 'error',
  'AUDIT': 'audit'
};

/* Entitlement contants */
export const ENTITLEMENT_GET_CUSTOMER_PROFILE = 'GET_CUSTOMER_PROFILE';
export const ENTITLEMENT_CHANGE_PASSWORD_USER = 'CHANGE_PASSWORD_USER';
export const ENTITLEMENT_CHANGE_ONLINEID_USER = 'CHANGE_ONLINEID_USER';

