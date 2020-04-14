import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route, Link
          } from "react-router-dom";  
import './App.css';
import AddNew from "./AddNew"; 
import UsersList from './UsersList';
import EditUser from './EditUser';
import { createStore } from 'redux';
import userReducer from './UserReducer';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';


const store = createStore(userReducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());



class App extends Component {
  render() {
    return ( 
      <Provider store={store}>
      <Router>
        <Switch>
          
          <Route exact path="/" component={UsersList} />
          <Route exact path="/edit-user/:user_id" component={EditUser} />
          <Route exact path="/add-new" component={AddNew} />
        </Switch>
      </Router>
      </Provider>
    );
  }
}



export default App;



