import React, {Component} from 'react'
import {
  HashRouter as Router,
  Route,
  Link
} from 'react-router-dom'
import axios from 'axios';

// Components for pages
import Faq from './components/Faq.jsx';
import About from './components/About.jsx';
import Signup from './components/Signup.jsx';
import Nav from './components/Nav.jsx';
import Landing from './components/Landing.jsx'
import Games from './components/Games.jsx'
import Login from './components/Login.jsx'

import { Menu } from 'semantic-ui-react'



class App extends Component {
  constructor (props) {
    super(props);

  }

  componentDidMount() {

  }

  render () {
    const routes = [
      { path: '/',
        exact: true,
        sidebar: () => <Landing/>,
        main: () => <Landing/>
      },
      { path: '/about',
        sidebar: () => <About/>,
        main: () => <About/>
      },
      { path: '/faq',
        sidebar: () => <Faq/>,
        main: () => <Faq/>
      },
      { path: '/signup',
        sidebar: () => <Signup/>,
        main: () => <Signup/>
      },
      { path: '/games',
        sidebar: () => <Games/>,
        main: () => <Games/>
      }
    ]


  return (
  <Router>
    <div style={{ display: 'flex' }}>
      <div style={{
        padding: '10px',
        width: '20%',
        background: '#f0f0f0',
        height: '100vh'
      }}>
        <ul style={{ listStyleType: 'none', padding: 0, position: 'fixed' }}>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/about">About</Link></li>
          <li><Link to="/faq">FAQ</Link></li>
          <li><Link to="/signup">Signup</Link></li>
          <li><Link to="/login">Login</Link></li>
          <br/>
          <li><Link to="/games">Games</Link></li>
        </ul>


      </div>

      <div style={{ flex: 1, padding: '20px' }}>
        {routes.map((route, index) => (
          // Render more <Route>s with the same paths as
          // above, but different components this time.
          <Route
            key={index}
            path={route.path}
            exact={route.exact}
            component={route.main}
          />
        ))}
      </div>
    </div>
  </Router>
  )}
}



export default App