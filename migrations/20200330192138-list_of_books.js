const excelToJson = require('convert-excel-to-json');

const result = excelToJson({
    sourceFile: 'books.xlsx',
    columnToKey: {
        A: 'code3',
        B: 'title',
        C: 'description',
    },
});
result.Лист1.splice(0, 1);
result.Лист1.forEach((item) => {
    item.updatedAt = Date();
    item.createdAt = Date();
});


module.exports = {
    async up(db) {
        await db.collection('booksmodel').insertMany(result.Лист1);
    },

    async down(db) {
        await db.dropCollection('changelog');
    },
};
