const express = require('express');
const cors = require('cors');

const app = express();
const port = process.env.PORT || '3000';

const routes = require('./routes')

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(routes.authRoute);
app.use(routes.alphabetRoute);

const db = require('./models');

db.sequelize.sync({ force: true }).then((result) => {
  
  app.listen(port, () => {
    console.log('App is now running at port ', port)
  })

}).catch((err) => {
  console.log(err)
});