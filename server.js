// Require Files
const express = require('express');
const routes = require('./controllers');
const sequelize = require('./config/connection');
const path = require('path');

// Express HandleBars
const helpers = require('./utils/helpers');
const exphbs = require('express-handlebars');
const hbs = exphbs.create({ helpers });

// Instance of express session
const session = require('express-session');

// Assign the instance of express to the app
const app = express();
const PORT = process.env.PORT || 3001;

// Require Session
const SequelizeStore = require('connect-session-sequelize')(session.Store);

const sess = {
  secret: 'bigbluedog',
  cookie: {
        expires: 10 * 60 * 1000
  },
  resave: true,
  rolling: true,
  saveUninitialized: true,
  store: new SequelizeStore({
    db: sequelize
  }),
};

// Using statements
app.use(session(sess));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');
app.use(routes);

// Start Server
sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log('Now listening'));
});