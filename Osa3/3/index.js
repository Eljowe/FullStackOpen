const http = require('http')
const express = require('express')
const app = express()


app.use(express.json())

app.get('/persons', (req, res) => {
  res.send('<h1>Hello World!</h1>')
})

const PORT = process.env.PORT || 3002;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});