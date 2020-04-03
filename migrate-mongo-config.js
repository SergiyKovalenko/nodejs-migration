module.exports = {
    mongodb: {
        // Url to MongoDB:
        url: 'mongodb://localhost:27017',

        // Database name:
        databaseName: 'books_db',

        options: {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        },
    },

    migrationsDir: 'migrations',

    changelogCollectionName: 'changelog',
};
