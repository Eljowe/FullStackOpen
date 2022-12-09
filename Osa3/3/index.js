const cors = require('cors')
const http = require('http')
const express = require('express')
const app = express()
var morgan = require("morgan");


const requestLogger = (request, response, next) => {
    console.log('Method:', request.method)
    console.log('Path:  ', request.path)
    console.log('Body:  ', request.body)
    console.log('---')
    next()
}

app.use(requestLogger)
app.use(morgan("tiny"));
app.use(express.json())
app.use(cors())

morgan.token("Body", req => JSON.stringify(req.body));

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

const generateId = () => {
const maxId = persons.length > 0
    ? Math.max(...persons.map(n => n.id))
    : 0
return maxId + 1
}



//'http://localhost:3001/persons'

app.get('/', (req, res) => {
    res.send('Hello')
})
//api/persons
app.get('/api/persons', (req, res) => {
    res.json(persons)
})

app.get('/api/info', (req, res) => {
    res.send(`Phonebook has info for ${persons.length} people \n ${Date.now()}`)
})

app.get('/api/persons/:id', (request, res) => {
    const id = Number(request.params.id)
    const person = persons.find(person => person.id === id)
    res.json(person)
})

app.delete('/api/persons/:id', (request, res) => {
    const id = Number(request.params.id)
    persons = persons.filter(person => person.id !== id)
    response.status(204).end()
})

app.post('/api/persons/', (request, response) => {
    const body = request.body;

    if (!body.name || !body.number) {
        return response.status(400).json({ 
          error: 'name or number missing' 
        })
    }

    if (persons.filter(person => person.name===body.name).length > 0) {
    return response.status(400).json({ 
        error: 'name must be unique' 
        })
    }

    const person = {
        name: body.name,
        important: body.number,
        id: generateId(),
      }
    persons = persons.concat(person)
    response.json(person)
})

const unknownEndpoint = (request, response) => {
    response.status(404).send({ error: 'unknown endpoint' })
}
  
app.use(unknownEndpoint)


const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});