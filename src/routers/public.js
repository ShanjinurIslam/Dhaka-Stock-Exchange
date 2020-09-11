const router = require('express').Router()
const { company_price_data } = require('../controllers/htmlParser')

router.get('/', (req, res) => {
    return res.render('index', { title: 'DSExchange' })
})

router.get('/plot', (req, res) => {
    const name = req.query.name
    const type = req.query.type
    const duration = parseInt(req.query.duration)
    console.log(name, type, duration)
    company_price_data(name, type, duration, (out) => {
        if (out.error) {
            return res.status(500).send(out.error)
        }
        else {
            labels = []
            data = []
            for (var i = 0; i < out.length; i++) {
                labels.push(out[i].date)
                data.push(parseFloat(out[i].data))
            }

            return res.status(200).render('plot', { title: name + ' ' + type + ' plot ' + ' of ' + duration + ' month(s)', labels: labels, data: data })
        }
    })
})

module.exports = router