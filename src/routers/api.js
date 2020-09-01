const router = require('express').Router()
const { getLatestStockPrice, company_price_data } = require('../controllers/htmlParser')


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