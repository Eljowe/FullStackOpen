require('dotenv').config()
const cors = require('cors')
const http = require('http')
const express = require('express')
const app = express()
var morgan = require("morgan");
const Person = require('./models/person')

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
app.use(express.static('build'))

morgan.token("Body", req => JSON.stringify(req.body));
const { response } = require('express');
const person = require('./models/person')


//'http://localhost:3001/persons'

app.get('/', (req, res) => {
    res.send('Hello')
})
//api/persons
app.get('/api/persons', (request, response) => {
    Person.find({}).then(persons => {
        response.json(persons)
    })
})

app.get('/api/info', (req, res) => {
    res.send(`Phonebook has info for ${persons.length} people \n ${Date.now()}`)
})

app.get('/api/persons/:id', (request, response) => {
    Person.findById(request.params.id).then(person => {
        response.json(person)
      })
})

app.delete('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    persons = persons.filter(person => person.id !== id)
    response.status(204).end()
})

app.post('/api/persons/', (request, response) => {
    const body = request.body;
    if (body.name === undefined) {
        return response.status(400).json({ error: 'content missing' })
      }

    const person = new Person({
        name: body.name,
        number: body.number,
      })
      person.save().then(savedPerson => {
        response.json(savedPerson)
      })
})

const unknownEndpoint = (request, response) => {
    response.status(404).send({ error: 'unknown endpoint' })
}
  
app.use(unknownEndpoint)


const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})