const jwt = require('jsonwebtoken');

const decodeToken = (header) => {
  const token = header.replace('Bearer ', '');
  return payload = jwt.decode(token);
};

module.exports = {
  decodeToken,
};
