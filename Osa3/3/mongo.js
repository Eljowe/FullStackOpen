const mongoose = require('mongoose')

if (process.argv.length<3) {
    console.log('give password as argument')
    process.exit(1)
}


const password = process.argv[2]
const nameIn = process.argv[3]
const numberIn = process.argv[4]


const url =
  `mongodb+srv://joelstack:${password}@fs.rgv2blj.mongodb.net/Puhelinluettelo?retryWrites=true&w=majority`

mongoose.connect(url)


const personSchema = new mongoose.Schema({
    name: String,
    number: String,
})

const Person = mongoose.model('Person', personSchema)

const person = new Person({
    name: nameIn,
    number: numberIn
})

if (process.argv.length>4) {
    person.save().then(result => {
        console.log(`added ${nameIn} number ${numberIn} to phonebook`)
        mongoose.connection.close()
    })
} else {
    console.log('phonebook:')
    Person.find({}).then(result => {
        result.forEach(person => {
            console.log(`${person.name} ${person.password}`)
        })
        mongoose.connection.close()
    })
}