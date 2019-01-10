import React, { Component } from 'react';
import gql from "graphql-tag"
import { graphql, compose } from 'react-apollo';
import { Button, ButtonGroup, DropdownButton, ButtonToolbar, Image, Jumbotron, Navbar, Nav, NavItem, NavDropdown, MenuItem, Row, Col } from 'react-bootstrap';
//import { Layout, Header, Navigation, Drawer, Content } from 'react-mdl';
import Paper from '@material-ui/core/Paper';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Checkbox from '@material-ui/core/Checkbox';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Scrollchor from 'react-scrollchor';
import {CircleArrow as ScrollUpButton} from "react-scroll-up-button";


import Form from './Form';

const styles = {
  backgroundgrad: {
    background: 'linear-gradient(to right bottom, #ccffd9, #ca99ff)'
  },
  socialButton: {
    width: '5%',
    margin: '10px'
  },
  profpic: { 
    width: '25%', 
    margin: '0 auto 20px'
  },
  homeContainer: {
    maxWidth: 700,
    margin: '0px auto 30px'
  },
  containerElevate: {
    border: '1px outset',
  },
  containerTitle: {
    fontSize:30
  },
  mlr40: {
    margin: '0px 40px 0px'

  },
  projectContent: {

  },
  projTitle: {
    fontSize: 22
  },
  proj1: {
    width :'40%',
    margin: '0 auto 30px'
  },
  proj2: {
    width :'25%',
    margin: '0 auto 30px'
  },  
  workpic: {
    width :'5%',
    margin: '0px 15px 3px 0px'
  },
  photo: {
    width : '100%',
    margin: '0px 0px 25px'
  },
  jobTitle: {
    fontSize: 18
  },
  workbullet: {
    fontSize: 16,
    margin: '0px 0px 0px'
  },
  containerP: {
    padding: '25px 0px 50px 0px'
  },
  name: {
    fontSize: 28,
    margin: '0px 0px 0px'
  },
  details: {
    fontSize:18,
    color: 'grey',
    margin: '0px 0px 20px'
  }
};




const TodosQuery =  gql`
  {
    todos {
      id
      text
      complete
    }
  }
`;
const RemoveMutation = gql`
  mutation($id: ID!) {
    removeTodo(id: $id)
  }
`;
const UpdateMutation = gql`
  mutation($id: ID!, $complete: Boolean!) {
    updateTodo(id: $id, complete: $complete)
  }
`;
const CreateTodoMutation = gql`
  mutation($text: String!) {
    createTodo(text: $text) {
      id
      text
      complete
    }
  }

`;

class App extends Component {

  updateTodo = async todo => {
    //update todo
    await this.props.updateTodo({
      variables: {
        id:todo.id,
        complete: !todo.complete
      },
      update: store => {
        // Read the data from our cache for this query.
        const data = store.readQuery({ query: TodosQuery });
        // Add our comment from the mutation to the end.
        data.todos = data.todos.map(x => x.id === todo.id ? ({
          ...todo,
          complete: !todo.complete,
        }) : x);
        // Write our data back to the cache.
        store.writeQuery({ query: TodosQuery, data });
      }


    });
  };

  removeTodo = async todo => {
    //remove todo
    await this.props.removeTodo({
      variables: {
        id:todo.id,
      },
      update: store => {
        // Read the data from our cache for this query.
        const data = store.readQuery({ query: TodosQuery });
        // Add our comment from the mutation to the end.
        data.todos = data.todos.filter(x => x.id !== todo.id)
        // Write our data back to the cache.
        store.writeQuery({ query: TodosQuery, data });
      }


    });
  };

  createTodo = async text => {
    //create todo
    await this.props.createTodo({
      variables: {
        text,
      },
      update: (store, {data: { createTodo } }) => {
        // Read the data from our cache for this query.
        const data = store.readQuery({ query: TodosQuery });
        // Add our comment from the mutation to the end.
        data.todos.unshift(createTodo);
        // Write our data back to the cache.
        store.writeQuery({ query: TodosQuery, data });
      }

    });
  };

  render() {
    const {data: {loading, todos}} = this.props;
    if(loading) {
      return null;
    }
    return (

      <div style={styles.backgroundgrad}>
        <div>
          <ScrollUpButton
            ShowAtPosition={250}
            AnimationDuration={1000}
          />
        </div>
        <Navbar inverse collapseOnSelect>
          <Navbar.Header>
            <Navbar.Brand>
              <a href="/home">About Me</a>
            </Navbar.Brand>
            <Navbar.Toggle />
          </Navbar.Header>
          <Navbar.Collapse>
            <Nav>
              <NavItem eventKey={1} href="/">
                <Scrollchor to="#projSec">
                  Projects
                </Scrollchor>
              </NavItem>
              <NavItem eventKey={1} href="/">
                <Scrollchor to="#workSec">
                  Work Experience
                </Scrollchor>
              </NavItem>
              <NavItem eventKey={1} href="/">
                <Scrollchor to="#photoSec">
                  Photography
                </Scrollchor>
              </NavItem>
              <NavItem eventKey={1} href="/">
                <Scrollchor to="#todoSec">
                  TO DO
                </Scrollchor>
              </NavItem>
              <NavItem eventKey={1} href="#">
                Video Sharing
              </NavItem>
            </Nav>
            <Nav pullRight>
              <NavItem eventKey={1} href="#">
                Contact Me
              </NavItem>
            </Nav>
          </Navbar.Collapse>
        </Navbar>




        <div className="text-center" style={styles.homeContainer}>
        
          <Paper elevation={2}>
            <div style={styles.containerP}>
              <Row className="show-grid text-center" style={styles.mlr40}>
                  <Image src="/assets/m_pic.jpg" circle style= {styles.profpic}/>
                  <h1 style={styles.name}>Michael Ning</h1>
                  <p style={styles.details}>Front-End Developer | Student</p>
                  <p>
                    I am a computer science student at Virginia Tech currently trying to learn more about web development.
                  </p>
                  <p>You can look at my
                  <a href="/assets/Michael Ning's Resume.pdf"> resume here </a>
                  or contact me for more information.</p> 
              </Row>

              <a href="https://github.com/mning1598">
                <Image src="/assets/gitpic.png" circle style= {styles.socialButton}/>
              </a>
              <a href="https://www.linkedin.com/in/michael-ning-616a26126/">
                <Image src="/assets/linkedinpic.png" circle style= {styles.socialButton}/>
              </a>
              <a href="https://www.facebook.com/mning1598">
                <Image src="/assets/fbpic.png" circle style= {styles.socialButton}/>
              </a>

            </div>
          </Paper>
        </div>


        {/* Personal Projects */}

        <div id="projSec" style={styles.homeContainer}>
          <Paper elevation={2}>
            <div style={styles.containerP}>
              <Row className="show-grid" style={styles.mlr40}>
                <h1 style={styles.containerTitle}>My Projects</h1>
                <div className="text-center" style={styles.projectContent}>
                  <h3 style={styles.projTitle}>MediaWalls (Under Development*)</h3>
                  <Image src="/assets/wallproj.png" style={styles.proj1}/>
                  <p>Media sharing website for two people to communicate/save pictures, videos, and links.</p>
                </div>
              </Row>
              <Row className="show-grid" style={styles.mlr40}>
                <div className="text-center" style={styles.projectContent}>
                  <h3 style={styles.projTitle}>Rate My VT Professors</h3>
                  <Image src="/assets/rateprofproj.png" style={styles.proj2}/>
                  <p>This chrome extension helps students sign up for classes through Virginia Tech's class drop/add portal. This chrome extension displays reviews and ratings for classes, as well as teachers, with just a single click.</p>
                </div>
              </Row>
            </div>
          </Paper>

        </div>

        {/* Work Experience */}

        <div id="workSec" style={styles.homeContainer}>
          <Paper elevation={2}>
            <div  style={styles.containerP}>
              <Row className="show-grid" style={styles.mlr40}>
                <h1 style={styles.containerTitle}>Work Experience</h1>
                <div style={styles.projectContent}>
                  <h4 style={styles.projTitle}><Image src="/assets/LMsmall.jpeg" style={styles.workpic}/>Lockheed Martin </h4>
                  <h5 style={styles.jobTitle}> Software Engineer Intern</h5>
                  <p style={styles.workbullet}>• Created Python scripts and used NLP tools to organize and analyze proprietary reports/data</p>
                  <p style={styles.workbullet}>• Developed input modules for internal applications in Java to scrape internet search engines</p>
                  <p style={styles.workbullet}>• Created a Python script to process unstructured heatmap data and graph competitor relationships</p>
                </div>
                <div style={styles.projectContent}>
                  <h4 style={styles.projTitle}><Image src="/assets/ESOsmall.png" style={styles.workpic}/>Employee Stock Option Fund (ESO Fund)</h4>
                  <h5 style={styles.jobTitle}>Summer Analyst</h5>
                  <p style={styles.workbullet}>• Used Javascript and Python to build efficient automation algorithms for data gathering</p>
                  <p style={styles.workbullet}>• Developed a Chrome extension as a tool to interact with ESO Fund’s AWS server and database</p>
                  <p style={styles.workbullet}>• Used Google Sheet’s script editor to automate data cleaning tools to standardize data entries</p>
                </div>
              </Row>
            </div>
          </Paper>

        </div>

        {/* iPhone Photography */}

        <div id="photoSec" style={styles.homeContainer}>
          <Paper elevation={2}>
            <div style={styles.containerP}>

              <Row className="show-grid" style={styles.mlr40}>
                <h1 style={styles.containerTitle}>iPhone Photography</h1>

                <Col xs={6} md={6}>
                  <Image src="/assets/IMG_a6345.jpg" style={styles.photo} />
                </Col>
                <Col xs={6} md={6}>
                  <Image src="/assets/IMG_a5289.jpg" style={styles.photo} />
                </Col>
                <Col xs={6} md={6}>
                  <Image src="/assets/IMG_a5359.jpg" style={styles.photo} />
                </Col>
                <Col xs={6} md={6}>
                  <Image src="/assets/IMG_a0023.jpg" style={styles.photo} />
                </Col>
                <Col xs={6} md={6}>
                  <Image src="/assets/IMG_a0089.jpg" style={styles.photo} />
                </Col>
                <Col xs={6} md={6}>
                  <Image src="/assets/IMG_a0087.jpg" style={styles.photo} />
                </Col>
                <Col xs={6} md={6}>
                  <Image src="/assets/IMG_a0094.jpg" style={styles.photo} />
                </Col>
              </Row>
              <Row className="show-grid" style={styles.mlr40}>


              </Row>
            </div>
          </Paper>
        </div>

        {/* Todo List */}

        <div id="todoSec" style={styles.homeContainer}>
          <div style={styles.containerP}>
            <Paper elevation={2}>
              <Form submit={this.createTodo} />
              <List>
                {todos.map(todo => (
                  <ListItem 
                    key={todo.id} 
                    role={undefined} 
                    dense 
                    button 
                    onClick={() => this.updateTodo(todo)}>
                    <Checkbox
                      checked={todo.complete}
                      tabIndex={-1}
                      disableRipple
                    />
                    <ListItemText primary={todo.text} />
                    <ListItemSecondaryAction>
                      <IconButton onClick={() => this.removeTodo(todo)}>
                        <CloseIcon />
                      </IconButton>
                    </ListItemSecondaryAction>
                  </ListItem>
                ))}
              </List>
            </Paper>
          </div>
        </div>
       </div>
    );
  }
}


export default compose(
  graphql(CreateTodoMutation, {name: 'createTodo'}),
  graphql(RemoveMutation, {name: 'removeTodo'}),
  graphql(UpdateMutation, {name: 'updateTodo'}), 
  graphql(TodosQuery)
)(App);
