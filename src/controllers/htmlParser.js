const htmlParser = require('node-html-parser')
const request = require('request')
const jsdom = require("jsdom");
const { JSDOM } = jsdom;

const getStockDetails = (stock) => {
    var row_parent = stock.parentNode.parentNode
    var object = Object();
    object['TRADING_CODE'] = stock.childNodes[0].rawText.trim()
    var attributes = ['LTP', 'HIGH', 'LOW', 'CLOSEP', 'YCP', 'CHANGE', 'TRADE', 'VALUE', 'VOLUME']

    var j = 0;
    for (var i = 5; i < row_parent.childNodes.length; i++) {
        if (row_parent.childNodes[i].childNodes.length > 0) {
            object[attributes[j++]] = row_parent.childNodes[i].childNodes[0].rawText.toString()
        }
    }

    return object
}

const getCompanyList = (callback) => {
    request.get('https://www.dsebd.org/datafile/quotes.txt', (error, res, body) => {
        var company_list = []
        parsed = body.split('\n');
        for (var i = 4; i < parsed.length - 1; i++) {
            company_list.push({ id: i - 3, name: parsed[i].split(' \t')[0].trim() })
        }
        callback(company_list)
    })
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
    request.get("https://www.dsebd.org/php_graph/monthly_graph.php?inst=" + name + "&duration=" + duration + "&type=" + type, (error, res, body) => {
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
                final_list.push({ date: values[0], data: values[1] })
            }
            callback(final_list)
        }
    });
}

const company_details = (name, callback) => {
    request.get('https://www.dsebd.org/displayCompany.php?name=' + name, (error, res, body) => {
        if (error) {
            callback({ error: error })
        }
        else {
            const dom = new JSDOM(body);
            var tables = dom.window.document.querySelectorAll('#company')
            var market_info = new Object()
            var basic_info = new Object()

            // Working on tables[1] Market Information
            var market_info_fields = ['LTP', 'CLOSEP', 'LASTUPDATE', 'DR', 'CA', 'DR', 'CP', 'YEARLYMR', 'OP', 'DV', 'AOP', 'DT', 'YCP', 'MC']

            var infos = tables[1].querySelectorAll('td')

            market_info['LTP'] = parseFloat(infos[0].textContent);
            for (var i = 0; i < infos.length; i++) {
                market_info[market_info_fields[i]] = infos[i].textContent.trim()
            }

            var basic_info_fields = ['AC', 'DTD', 'PC', 'TI', 'FACEPV', 'ML', 'TOS', 'Sector']

            var basic = tables[2].querySelectorAll('td')
            for (var i = 0; i < basic_info_fields.length; i++) {
                basic_info[basic_info_fields[i]] = basic[i].textContent.trim()
            }

            callback({ market_info, basic_info })
        }
    })
}

module.exports = { getLatestStockPrice, company_price_data, company_details, getCompanyList } 
