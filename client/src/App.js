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


import Form from './Form';

const backgroundgrad = {
  background: 'linear-gradient(to right bottom, #ca99ff, #ccffd9)'
};

const socialButton = {
  width: '5%',
  margin: '10px'
};

const profpic = { 
  width: '25%', 
  margin: '0 auto 20px'
};

const homeContainer = {
  maxWidth: 700,
  margin: 'auto'
};

const containerTitle = {
  fontSize:30
}
const mlr40 = {
  margin: '0px 40px 0px'

}

const projTitle = {
  fontSize: 22
};

const projectContent = {

};

const proj1 = {
  width :'25%',
  margin: '0 auto 30px'

};

const photo = {
  width : '100%',
  margin: '0px 0px 25px'
}



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
      <div style={backgroundgrad}>
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
                Video Sharing
              </NavItem>
              <NavItem eventKey={2} href="/">
                Photography
              </NavItem>
              <NavItem eventKey={2} href="/">
                TO DO
              </NavItem>
              <NavDropdown eventKey={3} title="Dropdown" id="basic-nav-dropdown">
                <MenuItem eventKey={3.1}>Action</MenuItem>
                <MenuItem eventKey={3.2}>Another action</MenuItem>
                <MenuItem eventKey={3.3}>Something else here</MenuItem>
                <MenuItem divider />
                <MenuItem eventKey={3.3}>Separated link</MenuItem>
              </NavDropdown>
            </Nav>
            <Nav pullRight>
              <NavItem eventKey={1} href="#">
                Contact Me
              </NavItem>
            </Nav>
          </Navbar.Collapse>
        </Navbar>




        <div className="text-center" style={homeContainer}>
          <Jumbotron>
            <div>
              <Row className="show-grid text-center" style={mlr40}>
                  <Image src="/assets/m_pic.jpg" circle style= {profpic}/>
                  <h1>Michael Ning</h1>
                  <p>
                    I am a computer science student at Virginia Tech currently trying to learn more about web development.
                  </p>
                  <p>You can look at my
                  <a href="/assets/Michael Ning's Resume.pdf"> resume here </a>
                  or contact me for more information.</p> 
              </Row>

              <a href="https://github.com/mning1598">
                <Image src="/assets/gitpic.png" circle style= {socialButton}/>
              </a>
              <a href="https://www.linkedin.com/in/michael-ning-616a26126/">
                <Image src="/assets/linkedinpic.png" circle style= {socialButton}/>
              </a>
              <a href="https://www.facebook.com/mning1598">
                <Image src="/assets/fbpic.png" circle style= {socialButton}/>
              </a>

            </div>
          </Jumbotron>
        </div>


        <div style={homeContainer}>
          <Jumbotron>
            <div>
              <Row className="show-grid" style={mlr40}>
                <h1 style={containerTitle}>My Projects</h1>
                <div className="text-center" style={projectContent}>
                  <h3 style={projTitle}>Rate My VT Professors</h3>
                  <Image src="/assets/rateprofproj.png" style={proj1}/>
                  <p>This chrome extension helps students sign up for classes through Virginia Tech's class drop/add portal. This chrome extension displays reviews and ratings for classes, as well as teachers, with just a single click.</p>
                </div>
              </Row>
            </div>
          </Jumbotron>

        </div>

        <div style={homeContainer}>
          <Jumbotron>
            <div>

              <Row className="show-grid" style={mlr40}>
                <h1 style={containerTitle}>iPhone Photography</h1>

                <Col xs={6} md={6}>
                  <Image src="/assets/IMG_a6345.jpg" style={photo} />
                </Col>
                <Col xs={6} md={6}>
                  <Image src="/assets/IMG_a5289.jpg" style={photo} />
                </Col>
                <Col xs={6} md={6}>
                  <Image src="/assets/IMG_a5359.jpg" style={photo} />
                </Col>
                <Col xs={6} md={6}>
                  <Image src="/assets/IMG_a0023.jpg" style={photo} />
                </Col>
                <Col xs={6} md={6}>
                  <Image src="/assets/IMG_a0089.jpg" style={photo} />
                </Col>
                <Col xs={6} md={6}>
                  <Image src="/assets/IMG_a0087.jpg" style={photo} />
                </Col>
                <Col xs={6} md={6}>
                  <Image src="/assets/IMG_a0094.jpg" style={photo} />
                </Col>
              </Row>
              <Row className="show-grid" style={mlr40}>


              </Row>
            </div>
          </Jumbotron>
        </div>

        <div style={{display: 'flex'}}>
          <div style={{ margin: "75px auto", width: 400}}>
            <Paper elevation={1}>
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
