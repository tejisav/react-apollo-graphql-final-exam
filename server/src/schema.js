import { gql } from 'apollo-server'
import { find, remove } from 'lodash'

const owners = [
  {
    id: '1',
    firstName: 'Steve',
    lastName: 'Jobs'
  },
  {
    id: '2',
    firstName: 'Elon',
    lastName: 'Musk'
  },
  {
    id: '3',
    firstName: 'Jeff',
    lastName: 'Bezos'
  }
]

const cars = [
  {
    id: '1',
    year: '2019',
    make: 'Toyota',
    model: 'Supra',
    price: '60000',
    ownerId: '1'
  },
  {
    id: '2',
    year: '2003',
    make: 'Honda',
    model: 'Civic',
    price: '30000',
    ownerId: '1'
  },
  {
    id: '3',
    year: '1996',
    make: 'Toyota',
    model: '4Runner',
    price: '40000',
    ownerId: '1'
  },
  {
    id: '4',
    year: '2015',
    make: 'Tesla',
    model: 'Model 3',
    price: '50000',
    ownerId: '2'
  },
  {
    id: '5',
    year: '2013',
    make: 'Tesla',
    model: 'Model S',
    price: '900000',
    ownerId: '2'
  },
  {
    id: '6',
    year: '2014',
    make: 'Tesla',
    model: 'Model X',
    price: '100000',
    ownerId: '2'
  },
  {
    id: '7',
    year: '2014',
    make: 'McLaren ',
    model: 'F1',
    price: '33000000',
    ownerId: '3'
  },
  {
    id: '8',
    year: '2005',
    make: 'Lexus',
    model: 'LFA',
    price: '495000',
    ownerId: '3'
  },
  {
    id: '9',
    year: '2012',
    make: 'Mercedes',
    model: 'GLK',
    price: '800000',
    ownerId: '3'
  }
]

const typeDefs = gql`
  type Owner {
    id: String!
    firstName: String
    lastName: String
  }

  type Car {
    id: String!
    year: String
    make: String
    model: String
    price: String
    ownerId: String
  }

  type Query {
    owners: [Owner]
    cars: [Car]
  }

  type Mutation {
    addOwner(id: String!, firstName: String!, lastName: String!): Owner
    updateOwner(id: String!, firstName: String!, lastName: String!): Owner
    removeOwner(id: String!): Owner
    addCar(id: String!, year: String!, make: String!, model: String!, price: String!, ownerId: String!): Car
    updateCar(id: String!, year: String!, make: String!, model: String!, price: String!, ownerId: String!): Car
    removeCar(id: String!): Car
  }
`

const resolvers = {
  Query: {
    owners: () => owners,
    cars: () => cars
  },
  Mutation: {
    addOwner: (root, args) => {
      const newOwner = {
        id: args.id,
        firstName: args.firstName,
        lastName: args.lastName
      }
      owners.push(newOwner)
      return newOwner
    },
    updateOwner: (root, args) => {
      const owner = find(owners, { id: args.id })
      if (!owner) {
        throw new Error(`Couldn't find owner with id ${args.id}`)
      }

      owner.firstName = args.firstName
      owner.lastName = args.lastName
      return owner
    },
    removeOwner: (root, args) => {
      const removedOwner = find(owners, { id: args.id })
      if (!removedOwner) {
        throw new Error(`Couldn't find owner with id ${args.id}`)
      }
      remove(owners, c => { return c.id === removedOwner.id })
      return removedOwner
    },
    addCar: (root, args) => {
      const newCar = {
        id: args.id,
        year: args.year,
        make: args.make,
        model: args.model,
        price: args.price,
        ownerId: args.ownerId
      }
      cars.push(newCar)
      return newCar
    },
    updateCar: (root, args) => {
      const car = find(cars, { id: args.id })
      if (!car) {
        throw new Error(`Couldn't find car with id ${args.id}`)
      }

      car.year = args.year
      car.make = args.make
      car.model = args.model
      car.price = args.price
      car.ownerId = args.ownerId
      return car
    },
    removeCar: (root, args) => {
      const removedCar = find(cars, { id: args.id })
      if (!removedCar) {
        throw new Error(`Couldn't find car with id ${args.id}`)
      }
      remove(cars, c => { return c.id === removedCar.id })
      return removedCar
    }
  }
}

export { typeDefs, resolvers }