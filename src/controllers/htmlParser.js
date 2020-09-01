const htmlParser = require('node-html-parser')
const request = require('request')

const getStockDetails = (stock) => {
    var row_parent = stock.parentNode.parentNode
    var object = Object();
    object['TRADING_CODE'] = stock.childNodes[0].rawText.trim()
    var attributes = ['LTP', 'HIGH', 'LOW', 'CLOSEP', 'YCP', 'CHANGE', 'TRADE', 'VALUE', 'VOLUME']

    var j = 0;
    for (var i = 5; i < row_parent.childNodes.length; i++) {
        if (row_parent.childNodes[i].childNodes.length > 0) {
            object[attributes[j++]] = parseFloat(row_parent.childNodes[i].childNodes[0].rawText)
        }
    }

    return object
}

const getLatestStockPrice = (callback) => {
    request.get('https://www.dsebd.org/latest_share_price_scroll_l.php', (error, res, body) => {
        if (error) {
            callback({ error: error })
        }
        else {
            var parsedStocks = {
                date: Date.now(),
                stocks: []
            }
            const root = htmlParser.parse(body);
            var stocks = root.querySelectorAll('.ab1')


            for (var i = 0; i < 360; i++) {
                parsedStocks.stocks.push(getStockDetails(stocks[i]))
            }
            callback(parsedStocks)
        }
    })
}

module.exports = getLatestStockPrice