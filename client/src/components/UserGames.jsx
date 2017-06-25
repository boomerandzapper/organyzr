import React, {Component} from 'react';
import { Card, Icon, Label, Menu, Table, Button, Segment, Image, Grid, Form } from 'semantic-ui-react'
import { Router, Route, Link, IndexRoute, hashHistory, browserHistory, withRouter } from 'react-router';
import Moment from 'react-moment';

import axios from 'axios';
import Calendar from './teams/Calendar.jsx';
import NewGame from './NewGame.jsx';
import LinkButton from './LinkButton.jsx';


class UserGames extends Component {
  constructor (props) {
    super(props);
    console.log('super props', this.props.location.pathname.split('/')[1])
    this.state = {
      team: this.props.location.pathname.split('/')[2],
      games: []
    }
    this.getRoster = this.getRoster.bind(this);
  }


  componentDidMount() {
    let teams;
    var self = this;
    axios.get(`/games/data/`+self.state.team)
    .then(res => {
      self.setState({games: self.state.games.concat(res.data)})
      console.log('self.state.games', self.state.games);
    })


  }

  getRoster () {
    var self = this;
    console.log('getroster');
    axios.get(`/player/data/` + self.state.team)
    .then(res => {
      console.log('resssss',res); 
    })
  }



  render () {


let self = this

    console.log('first in render', this.state.games);
let team = self.state.team
    let gameCards = this.state.games;
  let htmlGames = [];
  console.log('games', gameCards)
    if (gameCards.length !=  null) {
      for (let i = 0; i < gameCards.length; i++) {
        let gameID = gameCards[i].id
        htmlGames.push(<Grid.Column>
              <Card fluid color='violet'>
                <Card.Content>
                  <Card.Header>
                  <Moment date={gameCards[i].date}/>
                  </Card.Header>
                  <Card.Meta>
                    <span className="time">
                      {gameCards[i].time}
                    </span>
                    <span className="rink">
                      {gameCards[i].location}
                    </span>
                  </Card.Meta>
                  <Card.Description>
                      {gameCards[i].description}
                  </Card.Description>
                </Card.Content>
                <Card.Content extra>
                  <div className='ui buttons'>
                    <Button basic color='green' active>Edit</Button>
                    <Button basic color='red'>Delete</Button>
                    <Button basic color='red'>Send Notification</Button>  
                    <Button basic color='purple'
                    onClick={this.getRoster}>See Roster</Button>
                  </div>
                  <div>
                   </div> 
                </Card.Content>
              </Card>
              <br/>
        </Grid.Column>)
      }
    }

    const styles = {
      grid: {
        paddingLeft: 50,
        paddingRight: 50
      }
    }




    return (
      <div>
        <h3> Hello Manager </h3>



      <Grid columns={3} style={styles.grid}>
      <Grid.Row>
      {htmlGames}
      </Grid.Row>
      </Grid>

        <div>
          <NewGame className='new-team' uuid={team}/>
        </div>
        <div>
          <Calendar className='team-calendar'/>
        </div>
      </div>
    );
  }

}

export default UserGames;