import { connect } from "mongoose";
import dotenv from "dotenv";
dotenv.config();

// Connect to the database
const URI = process.env.MONGO_URI;
console.log(URI);

connect(URI, { useNewUrlParser: true, useUnifiedTopology: true });

// Create a Person model
const personSchema = new mongoose.Schema({
  name: { type: String, required: true },
  age: Number,
  favoriteFoods: [String],
});

const Person = mongoose.model("Person", personSchema);

// Create and Save a Record of a Model
const person = new Person({
  name: "Adeshina",
  age: 25,
  favoriteFoods: ["beans", "eba"],
});

person.save(function (err, data) {
  if (err) console.error(err);
  console.log(data);
});

// Create Many Records with model.create()
const arrayOfPeople = [
  {
    name: "Akeeb",
    age: 28,
    favoriteFoods: ["amala", "beans"],
  },
  {
    name: "Lanre",
    age: 25,
    favoriteFoods: ["tiger nuts", "guava"],
  },
  {
    name: "samuel",
    age: 25,
    favoriteFoods: ["apple", "mango"],
  },
];

Person.create(arrayOfPeople, (err, people) => {
  if (err) console.error(err);
  console.log(people);
});

// Use model.find()
Person.find({ name: 'Adeshina' }, (err, people) => {
    if (err) console.error(err);
    console.log(people);
});

// Use model.findById()
Person.findById(personId, (err, person) => {
    if (err) console.error(err);
    console.log(person);
});

// Perform Classic Updates
Person.findById(personId, (err, person) => {
    if (err) console.error(err);

    person.favoriteFoods.push('burger');
    person.markModified('favoriteFoods');

    person.save((error, updatedPerson) => {
        if (error) console.error(error);
        console.log(updatedPerson);
    });
});

// Use model.findOneAndUpdate()
Person.findOneAndUpdate({ name: Debola }, { age: 20 }, { new: true }, (err, updatedPerson) => {
    if (err) console.error(err);
    console.log(updatedPerson);
});

// Delete Many Documents
Person.remove({ name: 'Adeshina' }, (err, result) => {
    if (err) console.error(err);
    console.log(result);
});

// Chain Search Query Helpers
Person.find({ favoriteFoods: 'amala' })
    .sort({ name: 1 })
    .limit(2)
    .select({ age: 0 })
    .exec((err, results) => {
        if (err) console.error(err);
        console.log(results);
    });
