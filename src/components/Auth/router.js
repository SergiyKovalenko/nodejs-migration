const { Router } = require('express');
const AuthComponent = require('../Auth/index');
const verifyToken = require('../../policies/verifyToken');

/**
 * Express router to mount user related functions on.
 * @type {Express.Router}
 * @const
 */
const router = Router();

/**
 * Route serving list of users.
 * @name /v2/users
 * @function
 * @inner
 * @param {string} path - Express path
 * @param {callback} middleware - Express middleware.
 */
router.get('/', verifyToken, AuthComponent.getUser);

/**
 * Route serving a new user
 * @name /v2/users
 * @function
 * @inner
 * @param {string} path - Express path
 * @param {callback} middleware - Express middleware
 */
router.post('/login', AuthComponent.loginJwt);

/**
 * Route serving a new user
 * @name /v2/users
 * @function
 * @inner
 * @param {string} path - Express path
 * @param {callback} middleware - Express middleware
 */
router.post('/token', AuthComponent.getToken);

/**
 * Route serving a new user
 * @name /v2/users
 * @function
 * @inner
 * @param {string} path - Express path
 * @param {callback} middleware - Express middleware
 */
router.delete('/logout', AuthComponent.logout);

module.exports = router;
