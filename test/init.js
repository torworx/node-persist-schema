var persist = require('persist');

persist.setDefaultConnectOptions({
    driver: 'sqlite3',
    filename: ':memory:',
    trace: true
});