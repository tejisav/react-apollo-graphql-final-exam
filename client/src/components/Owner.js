import React, { Component } from 'react'
import UpdateOwner from './UpdateOwner'
import Car from './Car'

import { Query } from 'react-apollo'
import { GET_CARS } from '../queries'

import { Button, ListItem, ListItemText, Card, CardContent, List, Container } from '@material-ui/core'
import RemoveOwner from './RemoveOwner'


class Owner extends Component {
  state = {
    editMode: false,
    id: this.props.id || '',
    firstName: this.props.firstName || '',
    lastName: this.props.lastName || ''
  }

  handleEditButtonClick = () => {
    this.setState({
      editMode: !this.state.editMode
    })
  }

  handleInputChange = (key, value) => {
    this.setState({
      [key]: value
    })
  }

  handleButtonClick = () => {
    this.setState({
      editMode: !this.state.editMode
    })
  }

  render() {
    const { editMode, id, firstName, lastName } = this.state
    const fullName = `${firstName} ${lastName}`

    return (
      <Card>
        <CardContent>
          {
            editMode ?
              <UpdateOwner
                editMode={editMode}
                id={id}
                firstName={firstName}
                lastName={lastName}
                onButtonClick={this.handleButtonClick}
                onInputChange={this.handleInputChange}
              />
              :
              <ListItem>
                <ListItemText
                  primary={fullName}
                />
                  {/* {firstName} {lastName} */}
                  <Button
                    onClick={e => this.handleButtonClick()}
                    variant='contained'
                    style={{ margin: '5px' }}
                  >
                    Edit
                  </Button>
                <RemoveOwner
                  id={id}
                  firstName={firstName}
                  lastName={lastName}
                />
              </ListItem>
          }
          <Query query={GET_CARS} variables={ { ownerId: id } }>
            {({ loading, error, data }) => {
              console.log('data', data)
              if (loading) return <p>Loading...</p>
              if (error) return <p>Error: {error.message}</p>
              return (
                <ul>
                  {data.cars.map(({ id, year, make, model, price, ownerId }) => (
                    <Container key={id}>
                      <List key={id}>
                        <Car
                          key={id}
                          id={id}
                          year={year}
                          make={make}
                          model={model}
                          price={price}
                          ownerId={ownerId}
                        />
                      </List>
                    </Container>
                  ))}
                </ul>
              )
            }}
          </Query>
        </CardContent>
      </Card>
    )
  }
}

export default Owner