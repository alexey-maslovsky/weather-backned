const Async = (middleware) => {
  return async (req, res, next) => {
    try {
      await middleware(req, res, next);
    }
    catch(e) {
      console.error(e);
      res.status(500).send('Ooops');
    }
  };
};

module.exports = Async;