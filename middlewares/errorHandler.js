function errorHandler(err,res) {
    if (err.name === 'ValidationError') {
      res.status(400).send({ message: err.message });
    } else {
      // If it's not a validation error, it might be a server error
      res.status(500).send({ message: err.message });
    }
  }
  
  module.exports = errorHandler;
  