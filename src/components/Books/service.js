const BooksModel = require('./model');

/**
 * @method getChartData
 * @param {any}
 * @returns {any}
 */
function getChartData() {
    return BooksModel.aggregate([
        {
            $group: {
                _id: '$code3',
                code3: { $first: '$code3' },
                value: { $sum: 1 },
            },
        },
    ]).exec();
}

module.exports = {
    getChartData,
};
