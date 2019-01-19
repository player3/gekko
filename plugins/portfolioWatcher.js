var _ = require('lodash');
var log = require('../core/log.js');
var util = require('../core/util.js');
var config = util.getConfig();
var redis = require('redis');
var redisClient = redis.createClient();
var moment = require('moment');
const sqlite3 = require('sqlite3');
let db = new sqlite3.Database('my.db');
db.configure('busyTimeout', 10000);


function initialDB() {
console.log('initial db');
  db.run('CREATE TABLE IF NOT EXISTS portfolio (date string, balance real)', (err, result) => {
      console.log(err);
      console.log(result);
  })
}

function addPortfolioRecord(date, balance) {
  db.run('insert into portfolio values (?, ?)',[date, balance], (err, result) => {
  })
}

var PortfolioWather = function () {
  _.bindAll(this);
  this.setup();
}

PortfolioWather.prototype.setup = function () {
  console.log('portfolio setup');
  initialDB();
}

PortfolioWather.prototype.processCandle = function (candle, done) {
  done();
}

PortfolioWather.prototype.processAdvice = function (advice) {

}

PortfolioWather.prototype.processPortfolioUpdate = function (portfolio) {
  console.log('portfolio wathcer, current portfolio:');
  console.log(portfolio);
}

PortfolioWather.prototype.processTradeCompleted = function (data) {

}

// PortfolioWather.prototype.processPortfolioChange = function(portfolio) {
//   console.log('portfolio value changed:')
//   console.log(portfolio);
// }

PortfolioWather.prototype.processPortfolioValueChange = function (portfolio) {
  if (portfolio.candle) {
    let date = (moment(portfolio.candle.start).format('YYYY-MM-DD HH:mm:ss'))
    addPortfolioRecord(date, portfolio.balance);
  }
}

PortfolioWather.prototype.processPerformanceReport = function (report) {

}

module.exports = PortfolioWather;
