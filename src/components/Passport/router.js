const { Router } = require('express');
const csrf = require('csurf');
const passport = require('passport');
const PassportComponent = require('../Passport');
const PassportService = require('./service');

const csrfProtection = csrf({ cookie: true });
const initializePassport = require('./passport');

/**
 * Initialize Passport
 * @name /v1/auth
 * @function
 * @inner
 * @param {string} email
 * @summary get a user by email
 * @param {string} id
 * @summary get a user by id
 */
initializePassport(passport,
  (email) => PassportService.findByEmail(email),
  (id) => PassportService.findById(id));


/**
 * Express router to mount user related functions on.
 * @type {Express.Router}
 * @const
 */
const router = Router();

/**
 * Route serving list of users.
 * @name /v1/auth
 * @function
 * @inner
 * @param {string} path - Express path
 * @param {callback} csrf - csrfProtection
 * @param {callback} middleware - Express middleware.
 */
router.get('/', csrfProtection, PassportComponent.auth);

/**
 * Route serving a new user
 * @name /v1/auth
 * @function
 * @inner
 * @param {string} path - Express path
 * @param {callback} passport - Express middleware
 * @param {callback} middleware - Express middleware
 */
router.post('/', passport.authenticate('local', { failureRedirect: '/v1/auth/' }), PassportComponent.login);

/**
 * Route serving a user
 * @name /v1/auth/register
 * @function
 * @inner
 * @param {string} path - Express path
 * @param {callback} csrf - csrfProtection
 * @param {callback} middleware - Express middleware.
 */
router.get('/register', csrfProtection, PassportComponent.register);

/**
 * Route serving a user
 * @name /v1/auth/register
 * @function
 * @inner
 * @param {string} path - Express path
 * @param {callback} csrf - csrfProtection
 * @param {callback} middleware - Express middleware.
 */
router.post('/register', csrfProtection, PassportComponent.createAdmin);


module.exports = router;
