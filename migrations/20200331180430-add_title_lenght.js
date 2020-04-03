
module.exports = {
    async up(db) {
        const cursor = await db.collection('booksmodel').find({}).toArray();

        cursor.forEach(async (element) => {
            await db.collection('booksmodel').updateOne({ _id: element._id }, { $set: { titleLength: element.title.length } });
        });
    },

    async down(db) {
        await db.dropCollection('booksmodel');
    },
};
