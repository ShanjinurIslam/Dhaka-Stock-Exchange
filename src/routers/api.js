const router = require('express').Router()
const { getLatestStockPrice, company_price_data, company_details, getCompanyList } = require('../controllers/htmlParser')


router.get('/company_list', (req, res) => {
    getCompanyList((value) => {

        res.status(200).send(value)
    })
})

router.get('/share_price', (req, res) => {
    company_name = req.query.name
    getLatestStockPrice((out) => {
        var stocks = out.stocks
        stocks = stocks.filter((e) => e.TRADING_CODE == company_name)

        res.status(200).send(stocks[0])
    })
})

router.get('/latest_price', (req, res) => {
    getLatestStockPrice((out) => {
        if (out.error) {
            return res.status(500).send(out.error)
        }
        else {
            return res.status(200).send(out)
        }
    })
})


router.get('/company_details', (req, res) => {
    const name = req.query.name

    company_details(name, (value) => {
        res.status(200).send(value)
    })
})

router.get('/company_data', (req, res) => {
    const name = req.query.name
    const type = req.query.type
    const duration = parseInt(req.query.duration)
    console.log(name, type, duration)
    company_price_data(name, type, duration, (out) => {
        if (out.error) {
            return res.status(500).send(out.error)
        }
        else {
            return res.status(200).send(out)
        }
    })
})

module.exports = router