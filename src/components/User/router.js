const { Router } = require('express');
const UserComponent = require('../User');

/**
 * Express router to mount user related functions on.
 * @type {Express.Router}
 * @const
 */
const router = Router();

/**
 * Route serving list of users.
 * @name /v1/users
 * @function
 * @inner
 * @param {string} path - Express path
 * @param {callback} middleware - Express middleware.
 */
router.get('/', UserComponent.findAll);

/**
 * User creation route.
 * @name /v1/users/create
 * @function
 * @inner
 * @param {string} path - Express path
 * @param {callback} middleware - Express middleware.
 */
router.post('/create', UserComponent.createUser);

/**
 * User update route.
 * @name /v1/users/update
 * @function
 * @inner
 * @param {string} path - Express path
 * @param {callback} middleware - Express middleware.
 */
router.put('/update', UserComponent.updateUsers);

/**
 * User delete route.
 * @name /v1/users/delete
 * @function
 * @inner
 * @param {string} path - Express path
 * @param {callback} middleware - Express middleware.
 */
router.delete('/delete', UserComponent.deleteUser);

/**
 * Users search route.
 * @name /v1/users/find
 * @function
 * @inner
 * @param {string} path - Express path
 * @param {callback} middleware - Express middleware.
 */
router.get('/find', UserComponent.findUsers);

module.exports = router;
