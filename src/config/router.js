const express = require('express');
const http = require('http');
const path = require('path');
const ejs = require('ejs');
const BooksRouter = require('../components/Books/router');

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
         * Forwards any requests to the /v1/books URI to BooksRouter.
         * @name /v1/books
         * @function
         * @inner
         * @param {string} path - Express path
         * @param {callback} middleware - Express middleware.
         */
        app.use('/v1/books', BooksRouter);

        /**
         * @description No results returned mean the object is not found
         * @function
         * @inner
         * @param {callback} middleware - Express middleware.
         */
        app.use((req, res) => {
            res.status(404).send(http.STATUS_CODES[404]);
        });

        // render file to html
        app.engine('html', ejs.renderFile);

        // use a template engine
        app.set('view engine', 'html');

        // change path to views folder
        app.set('views', path.join(__dirname, '../../public'));

        /**
         * @function
         * @inner
         * @param {express.Router}
         */
        app.use(router);
    },
};
