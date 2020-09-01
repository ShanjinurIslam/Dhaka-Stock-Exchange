const router = require('express').Router()
const getLatestStockPrice = require('../controllers/htmlParser')


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

module.exports = router