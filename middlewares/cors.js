const allowedCors = [
  'https://http://movies-explorer.nomoredomains.work',
  'http://http://movies-explorer.nomoredomains.work',
  'localhost:3000',
];

function CORS(req, res, next) {
  const { origin } = req.headers;
  if (allowedCors.includes(origin)) {
    res.header('Access-Control-Allow-Origin', origin);
  }
  const { method } = req;
  const DEFAULT_ALLOWED_METHODS = 'GET,HEAD,PUT,PATCH,POST,DELETE';
  if (method === 'OPTIONS') {
    res.header('Access-Control-Allow-Methods', DEFAULT_ALLOWED_METHODS);
    return res.end();
  }
  next();
}

module.exports = { CORS };
