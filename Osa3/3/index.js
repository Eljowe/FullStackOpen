const http = require('http')
const express = require('express')
const app = express()

let persons = [
    {
        "name": "Ada Lovelace",
        "number": "39-44-5323523",
        "id": 2
      },
      {
        "name": "Dan Abramov",
        "number": "12-43-234345",
        "id": 3
      },
      {
        "name": "Mary Poppendieck",
        "number": "39-23-6423122",
        "id": 4
      },
      {
        "name": "b",
        "number": "2",
        "id": 6
      }
  ]


//'http://localhost:3001/persons'
app.use(express.json())

app.get('/', (req, res) => {
    res.send('Hello')
})

app.get('/persons', (req, res) => {
    res.json(persons)
})

const PORT = process.env.PORT || 3002;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});