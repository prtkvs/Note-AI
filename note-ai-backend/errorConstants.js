exports.constants = {
  VALIDATION_ERROR: 400, // when the client sends bad data.(missing fields, invalid formats of emails etc)
  UNAUTHORIZED: 401,    // when authentication token is required and has failed or expired or has not yet been provided.
  FORBIDDEN: 403,   // when the user is authenticated but doesn't have permission to access the resource (mostly related to role based access control)
  NOT_FOUND: 404,   // resource could not be found e.g GET /users/123 but user doesn’t exist
  CONFLICT: 409,        // duplicate data ; like duplicate email during registration
  TOO_MANY_REQUESTS: 429, // when user has sent too many requests in a given amount of time (rate limiting)
  SERVER_ERROR: 500, // generic server error when an unexpected condition was encountered
};
