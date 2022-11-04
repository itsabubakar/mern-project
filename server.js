const express = require('express')
const app = express()
const path = require('path')
const PORT = process.env.PORT || 3000

app.use(express.json())

app.use('/', express.static(path.join(__dirname, '/public')))

app.use('/', require('./routes/root'))

app.all('*', (req, res) => {
    res.status(404)
    if (req.accepts('html')) {
        res.sendFile(path.join(__dirname, 'views', '404.html'))
    } else if (req.accepts('json')) {
        res.json({ msg: "404 not found" })
    } else {
        res.type('txt').send('404 not found')
    }
})

app.listen(PORT, () => console.log(`Server running on port ${PORT}`))