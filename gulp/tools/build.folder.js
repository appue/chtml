var fs = require('fs');

module.exports = function() {
    var file = './.folder',
        dir = '../appcord/www/',
        exists = fs.existsSync(file);

    if (exists) {
        dir = fs.readFileSync(file);
    }

    return dir;
};