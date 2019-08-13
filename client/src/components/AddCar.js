import React, { Component } from 'react'
import { Mutation, Query } from 'react-apollo'

import uuidv4 from 'uuid/v4'

import { ADD_CAR, GET_CARS, GET_OWNERS } from '../queries'

import { Button, TextField, MenuItem, Select } from '@material-ui/core'

class AddCar extends Component {
  state = {
    year: '',
    make: '',
    model: '',
    price: '',
    ownerId: ''
  }

  render() {
    const { year, make, model, price, ownerId } = this.state
    const id = uuidv4()
    return (
      <Mutation
        mutation={ADD_CAR}
        update={(store, { data: { addCar } }) => {
          const { cars } = store.readQuery({ query: GET_CARS, variables: { ownerId: ownerId } })
          store.writeQuery({
            query: GET_CARS,
            variables: { ownerId: ownerId },
            data: { cars: cars.concat([addCar])}
          })
        }}
      >
        {(addCar, { data, loading, error }) => (
          <form onSubmit={e => {
            e.preventDefault()
            addCar({
              variables: {
                id,
                year,
                make,
                model,
                price,
                ownerId
              },
              optimisticResponse: {
                __typename: 'Mutation',
                addCar: {
                  __typename: 'Car',
                  id,
                  year,
                  make,
                  model,
                  price,
                  ownerId
                }
              }
            })
          }}>
            <TextField
              label='Year'
              value={year}
              placeholder='i.e. 2019'
              onChange={e => this.setState({ year: e.target.value })}
              margin='normal'
              variant='outlined'
              style={{ margin: '5px' }}
            />
            <TextField
              label='Make'
              value={make}
              placeholder='i.e. Toyota'
              onChange={e => this.setState({ make: e.target.value })}
              margin='normal'
              variant='outlined'
              style={{ margin: '5px' }}
            />
            <TextField
              label='Model'
              value={model}
              placeholder='i.e. Supra'
              onChange={e => this.setState({ model: e.target.value })}
              margin='normal'
              variant='outlined'
              style={{ margin: '5px' }}
            />
            <TextField
              label='Price'
              value={price}
              placeholder='i.e. $60,000.00'
              onChange={e => this.setState({ price: e.target.value })}
              margin='normal'
              variant='outlined'
              style={{ margin: '5px' }}
            />
            <Query query={GET_OWNERS}>
              {({ loading, error, data }) => {
                console.log('data', data)
                if (loading) return <p>Loading...</p>
                if (error) return <p>Error: {error.message}</p>
                return (
                  <Select
                    value={this.state.ownerId}
                    onChange={e => this.setState({ ownerId: e.target.value })}
                    inputProps={{
                      name: 'owner',
                      id: 'owner-id',
                    }}
                    variant='outlined'
                  >
                    {data.owners.map(({ id, firstName, lastName }) => (
                      <MenuItem key={id} value={id}>{firstName + ' ' + lastName}</MenuItem>
                    ))}
                  </Select>
                )
              }}
            </Query>
            <Button
              type='submit'
              variant='contained'
              color='primary'
              style={{ margin: '15px 5px 15px 5px' }}
            >
              Add Car
            </Button>
          </form>
        )}
      </Mutation>
    )
  }
}

export default AddCar