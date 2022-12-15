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

app.use(express.static('build'))
app.use(express.json())
app.use(requestLogger)
app.use(morgan("tiny"));
app.use(cors())


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
        if (persons) {
            response.json(persons)
        } else {
            response.status(404).end()
        }
      })
      .catch(error => next(error))
})

app.get('/api/info', (req, res) => {
    Person.count({}, function( err, count){
        res.send(`Phonebook has info for ${count} people \n ${Date.now()}`)
    })
    
})

app.get('/api/persons/:id', (request, response) => {
    Person.findById(request.params.id).then(person => {
        if (person) {
            response.json(person)
        } else {
            response.status(404).end()
        }
      })
      .catch(error => next(error))
})

app.delete('/api/persons/:id', (request, response) => {
    const person_id = Number(request.params.id)
    Person.deleteOne({id: person_id}).then(persons => {
        if (persons) {
            response.status(204).end()
        } else {
            response.status(404).end()
        }
      })
      .catch(error => next(error))
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

app.put('/api/persons/:id', (request, response, next) => {
    const body = request.body
  
    const person = {
      number: body.number,
    }
  
    Person.findByIdAndUpdate(request.params.id, person, { new: true })
      .then(updatedPerson => {
        response.json(updatedPerson)
      })
      .catch(error => next(error))
  })

const unknownEndpoint = (request, response) => {
    response.status(404).send({ error: 'unknown endpoint' })
}
  
app.use(unknownEndpoint)


const errorHandler = (error, request, response, next) => {
    console.error(error.message)
  
    if (error.name === 'CastError') {
      return response.status(400).send({ error: 'malformatted id' })
    }
  
    next(error)
  }
  
  // tämä tulee kaikkien muiden middlewarejen rekisteröinnin jälkeen!
  app.use(errorHandler)

const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})