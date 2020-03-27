const bodyParser = require('body-parser');
const compression = require('compression');
const cookieParser = require('cookie-parser');
const methodOverride = require('method-override');
const session = require('express-session');
const flash = require('connect-flash');
const messages = require('express-messages');
const cors = require('cors');
const helmet = require('helmet');
const passport = require('passport');

module.exports = {
/**
     * @function
     * @description express middleware
     * @param {express.Application} app
     * @returns void
     */
  init(app) {
    app.use(
      bodyParser.urlencoded({
        extended: true,
      }),
    );
    app.use(bodyParser.json());

    // parse Cookie header and populate req.cookies with an object keyed by the cookie names.
    app.use(cookieParser());
    // returns the compression middleware
    app.use(compression());
    // helps you secure your Express apps by setting various HTTP headers
    app.use(helmet());
    // providing a Connect/Express middleware that
    // can be used to enable CORS with various options
    app.use(cors());
    // Use PUT DELETE Methods
    app.use(methodOverride('_method'));
    // Session Middleware
    app.use(session({
      secret: 'keyboard cat',
      resave: true,
      saveUninitialized: true,
    }));
    // Messages middleware
    app.use(flash());
    app.use((req, res, next) => {
      res.locals.messages = messages(req, res);
      next();
    });
    // Passport
    app.use(passport.initialize());
    app.use(passport.session());
    // cors
    app.use((req, res, next) => {
      res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS ');
      res.header('Access-Control-Allow-Credentials', '*');
      res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With,'
                + ' Content-Type, Accept,'
                + ' Authorization,'
                + ' Access-Control-Allow-Credentials');
      next();
    });
  },
};
