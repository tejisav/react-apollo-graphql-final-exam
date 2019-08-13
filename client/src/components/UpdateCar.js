import React from 'react'
import { Mutation } from 'react-apollo'

import { UPDATE_CAR } from '../queries'

import { Button, TextField } from '@material-ui/core'


const UpdateCar = (props) => {
  const { id, year, make, model, price, ownerId, onInputChange, onButtonClick } = props
  console.log(id, year, make, model, price, ownerId)
  return (
    <Mutation
      mutation={UPDATE_CAR}
      key={id}
    >
      {(updateCar, { loading, error }) => (
        <form onSubmit={e => {
          e.preventDefault()
          updateCar({ variables: { id, year, make, model, price, ownerId }})
        }}>
          <TextField
            label='Year'
            defaultValue={year}
            placeholder='i.e. 2019'
            onChange={e => onInputChange('year', e.target.value)}
            margin='normal'
            varian='outlined'
            style={{ margin: '5px' }}
            fullWidth
          />
          <TextField
            label='Make'
            defaultValue={make}
            placeholder='i.e. Toyota'
            onChange={e => onInputChange('make', e.target.value)}
            margin='normal'
            varian='outlined'
            style={{ margin: '5px' }}
            fullWidth
          />
          <TextField
            label='Model'
            defaultValue={model}
            placeholder='i.e. Supra'
            onChange={e => onInputChange('model', e.target.value)}
            margin='normal'
            varian='outlined'
            style={{ margin: '5px' }}
            fullWidth
          />
          <TextField
            label='Price'
            defaultValue={price}
            placeholder='i.e. 100000'
            onChange={e => onInputChange('price', e.target.value)}
            margin='normal'
            varian='outlined'
            style={{ margin: '5px' }}
            fullWidth
          />
          <TextField
            label='Owner'
            defaultValue={ownerId}
            placeholder='i.e. Steve Jobs'
            onChange={e => onInputChange('ownerId', e.target.value)}
            margin='normal'
            varian='outlined'
            style={{ margin: '5px' }}
            fullWidth
          />
          <Button
            type='submit'
            onClick={onButtonClick}
            variant='contained'
            color='primary'
            style={{ margin: '5px' }}
          >
            Update Car
          </Button>
          <Button
            onClick={onButtonClick}
            variant='contained'
            color='secondary'
            style={{ margin: '5px' }}
          >
            Cancel
          </Button>
        </form>
      )}
    </Mutation>
  )
}

export default UpdateCar