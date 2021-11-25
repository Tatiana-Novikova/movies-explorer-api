function CORS(req, res, next) {
  const allowedCors = [
    'https://movies-explorer.nomoredomains.work',
    'http://movies-explorer.nomoredomains.work',
    'localhost:3000',
  ];
  const { method } = req;
  const DEFAULT_ALLOWED_METHODS = 'GET,HEAD,PUT,PATCH,POST,DELETE';
  const { origin } = req.headers;
  const requestHeaders = req.headers['access-control-request-headers'];

  if (allowedCors.includes(origin)) {
    res.header('Access-Control-Allow-Origin', origin);
  }
  if (method === 'OPTIONS') {
    res.header('Access-Control-Allow-Headers', requestHeaders);
    res.header('Access-Control-Allow-Methods', DEFAULT_ALLOWED_METHODS);
    return res.end();
  }
  next();
}

module.exports = { CORS };
