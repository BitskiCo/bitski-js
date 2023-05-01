const path = require('path');

module.exports = {
    entry: './common.js',
    devtool: 'inline-source-map',
    node: {
        fs: 'empty'
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'common.js'
    }
};
