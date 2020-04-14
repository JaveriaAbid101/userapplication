import { combineReducers } from 'redux';


const INITIAL_STATE = {
  users:[
     
     {
     }
    
  ]
     

};
const userReducer = (state = INITIAL_STATE, action) => {
switch (action.type) {
   case 'Update_User':  
       return{...state, users:action.users}
         default:
           return state
   }
 };

 export default combineReducers({
 users: userReducer,
});