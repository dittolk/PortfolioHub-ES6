export const rateLimitConfig = {
    global: {
      limit: 1000,
      window: 60
    },
    login: {
      limit: 5,
      window: 10
    },
    register: {
      limit: 10,
      window: 60
    },
    authenticated: {
      limit: 1000,
      window: 60
    }
  };