const jwt = require('jsonwebtoken');

const maxAge = 7 * 24 * 60 * 60; //7 days
const tokenSecret = "mysecret";

module.exports.middleware = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (token == null) return res.sendStatus(401);

  jwt.verify(token, tokenSecret, (err, user) => {
    if (err) {
      console.log(err.message ? err.message : err)
      return res.sendStatus(403);
    }

    req.user = user;

    next();
  })
}

module.exports.signup = (req, res) => {

  const {email, password} = req.body;
  if(email == null || password == null || password.length == 0){
    return res.status(401).json({message: 'Require both email and password'})
  }

  if(!isEmail(email)){
    return res.status(401).json({message: 'Invalid email address'})
  }

  const token = generateAccessToken({email});
  return res.status(201).json(token);
}

function isEmail(email) {
  const regex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return regex.test(email.toLowerCase())
}

function generateAccessToken(user) {
  return jwt.sign(user, tokenSecret, { expiresIn: maxAge });
}

