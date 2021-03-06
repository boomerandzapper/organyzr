import React, {Component} from 'react';
import { Icon, Form, Accordion, Segment, Button, Checkbox, Message, Grid, Header } from 'semantic-ui-react';

import { Route, Redirect} from 'react-router-dom'



class NewGame extends React.Component {
  constructor(props) {
    super(props);
    this.state = {location: '',
                  date: '',
                  time: '',
                  description: '',
                  message: 'no message',
                  redirect: false,
                  clearForm: false};

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    
  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }


  handleSubmit(e) {
    e.preventDefault();
    var self = this;
    // On submit of the form, send a POST request with the data to the server.
    fetch('/new_game', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify({
          location: this.state.location,
          date: this.state.date,
          time: this.state.time,
          description: this.state.description,
          team_uuid: this.props.uuid
        })
      })
      .then(function(response) {
        if (response.status === 200) {
          self.props.updateGame();
          self.state.location = '';
          self.state.date = ''; 
          self.state.time = '';
          self.state.description = '';
        }

      })
  }

  resetField () {
    // window.location.reload()
    this.refs.input.value = '';
  }

  render () {

      const styles = {
      form: {
        paddingLeft: 100
      },
      message: {
        fontSize: 16
      }
    }

    return (
      // React Components in JSX look like HTML tags
      <Accordion name="ui accordion">
        <Accordion.Title>
          <Icon name='dropdown' />
          <span style={{fontSize: '18px'}}>New Game</span>
        </Accordion.Title>
        <Accordion.Content>
          <Segment padded size='tiny'>
          <Form onSubmit={this.handleSubmit} style={styles.form}>
            <Form.Field width='12'>
              <label>Location</label>
              <input ref='input' name="location" placeholder='Location' value={this.state.location} onChange={this.handleInputChange}/>
            </Form.Field>
            <Form.Field width='12'>
              <label>Date</label>
              <input ref='input' type="date" name= "date" placeholder='Date' value={this.state.date} onChange={this.handleInputChange}/>
            </Form.Field>
                        <Form.Field width='12'>
              <label>Time</label>
              <input ref='input' type="time" name= "time" placeholder='Time' value={this.state.time} onChange={this.handleInputChange}/>
            </Form.Field>
                        <Form.Field width='12'>
              <label>Description</label>
              <input ref='input' name= "description" placeholder='Description' value={this.state.description} onChange={this.handleInputChange}/>
            </Form.Field>
            <Button onClick={this.resetField} type='submit'>Submit</Button>
          </Form>





          </Segment>
        </Accordion.Content>
      </Accordion>
    )
  }

}

export default NewGame;