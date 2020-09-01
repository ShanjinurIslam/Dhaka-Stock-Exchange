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

const company_price_data = (name, type, duration, callback) => {
    var valid_durations = [1, 3, 6, 9, 12, 24];
    var valid_types = ['price', 'vol', 'trd'];

    // validity_check required

    var duration = duration.toString()
    request.get("https://www.dsebd.org/php_graph/monthly_graph.php?inst=" + name + "&duration=" + 24 + "&type=" + type, (error, res, body) => {
        if (error) {
            callback({ error: error })
        }
        else {
            var findStr = "// CSV or path to a CSV file.";
            var endStr = "// options go here."
            var start_index = body.indexOf(findStr) + findStr.length
            var end_index = body.indexOf(endStr)

            csv_file = body.substr(start_index, end_index - start_index).trim().replace('{', "")
            price_list = csv_file.split('+')
            final_list = []
            for (var i = 1; i < price_list.length; i++) {
                var values = price_list[i].replace("\"", "").trim().split('\\')[0].split(',')
                final_list.push({ date: values[0], type: parseFloat(values[1]), })
            }
            callback(final_list)
        }
    });
}

/*
module.exports = { getLatestStockPrice, company_price_data }*/

company_details('ABBANK')
