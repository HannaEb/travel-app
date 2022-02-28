// Require app
const app = require('./server')

// Set up server
const port = 3001
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})
