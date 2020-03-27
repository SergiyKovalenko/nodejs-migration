const express = require('express');
const http = require('http');
const path = require('path');
const UserRouter = require('../components/User/router');
const AuthRouter = require('../components/Auth/router');
const PassportRouter = require('../components/Passport/router');
const Authenticated = require('../policies/Auth');


module.exports = {
/**
     * @function
     * @param {express.Application} app
     * @summary init Application router
     * @returns void
     */
  init(app) {
    const router = express.Router();

    /**
         * Forwards any requests to the /v1/users URI to UserRouter.
         * @name /v1/users
         * @function
         * @inner
         * @param {string} path - Express path
         * @param {callback} middleware - Express middleware.
         */
    app.use('/v1/users', Authenticated.isAuth, UserRouter);

    /**
         * Forwards any requests to the /v2/users URI to AuthRouter.
         * @name /v2/users
         * @function
         * @inner
         * @param {string} path - Express path
         * @param {callback} middleware - Express middleware.
         */
    app.use('/v2/users', AuthRouter);

    /**
         * Forwards any requests to the /v1/auth URI to PassportRouter.
         * @name /v1/auth
         * @function
         * @inner
         * @param {string} path - Express path
         * @param {callback} middleware - Express middleware.
         */
    app.use('/v1/auth', Authenticated.isNotAuth, PassportRouter);

    /**
         * @description No results returned mean the object is not found
         * @function
         * @inner
         * @param {callback} middleware - Express middleware.
         */
    app.use((req, res) => {
      res.status(404).send(http.STATUS_CODES[404]);
    });

    /**
         * @function
         * @inner
         * @param {express.Router}
         */
    app.use(router);
    // use a template engine
    app.set('view engine', 'ejs');
    // change path to views folder
    app.set('views', path.join(__dirname, '../views'));
  },
};
