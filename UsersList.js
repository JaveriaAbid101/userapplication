import React, { Component } from 'react'
import MyUser from './MyUser';
import './UsersList.css';
import { connect } from 'react-redux';
import { updateuser } from './UserAction';


class UsersList extends Component {
    constructor(props) {
        super(props)
        
        this.state = {
             allUsers: [],
             filterdUsers: [],
             selectedUsersForDel: []
        }
 
    }

   
    componentDidMount() { 
        let users=this.props.users;
        this.setState({UsersList:users.users, filterdUsers:users.users})
        alert( users.users)
        //const storedData = localStorage.getItem('My_details');
        // console.log(storedData); 
        //if(storedData !== undefined && storedData !== ''){ 
            //this.setState( {allUsers:  JSON.parse(storedData), filterdUsers: JSON.parse(storedData)} )
        //}  
    }
    
      
    handleSingleUserDelete = (user_ID) => {
        console.log('deleting: ', user_ID);
        let UsersList =
        
        
        
        this.state.allUsers;
        UsersList = UsersList.filter(item => item.id !== user_ID);
        alert (user_ID)

        this.setState({allUsers: UsersList, filterdUsers: UsersList});
       // localStorage.setItem('My_details', JSON.stringify(UsersList));
       this.props.Newupdate(UsersList);
    }

    showAllUsers = () => {
        
        if(this.state.filterdUsers === null || this.state.filterdUsers === undefined )
            return '';


         
        return this.state.filterdUsers.length > 0 
                ? this.state.filterdUsers.map(
                            
                            item => ( <MyUser 
                                            key={item.id}
                                            selectedUsersForDel={this.state.selectedUsersForDel}
                                            handleSelect={this.handleSelect} 
                                            item={item} 
                                            handleSingleUserDelete={this.handleSingleUserDelete} />)
                        ) 
                : ''
    }

    handleSearch = (e) => {
        console.log(e.target.value);
        this.setState({filterdUsers: this.state.allUsers.filter(
                    item => (
                            item.firstname.toLowerCase().includes(e.target.value) 
                            || item.lastname.toLowerCase().includes(e.target.value)
                        )
                    )
                });
    }

    handleSelect = (id) => {
        let allSelection = this.state.selectedUsersForDel;
        if(allSelection.find((item) => item === id) === undefined) 
            allSelection.push(id);      
        else    
            allSelection = allSelection.filter(item => item !== id); 
         
        this.setState({selectedUsersForDel: allSelection});
    }

    handleDeleteAllSelected = () => {
        let Users = this.state.allUsers.filter(item => this.state.selectedUsersForDel.find(item_id => item_id === item.id) === undefined);
        
        
        this.setState({allUsers : Users, filterdUsers: Users, selectedUsersForDel: []});
        this.props.Newupdate(Users);
        
        //localStorage.setItem('My_details', JSON.stringify(Users));
    }

    render() {  
        return (
            <>
                <div style={{textAlign:"center"}}>
                    <div> 
                    <input className="searchInputField"
                         type='text'
                         onChange={this.handleSearch} 
                         placeholder="Search here..." required>

                         </input>
                        <br/> 
                        <button className="deleteBtn" onClick={this.handleDeleteAllSelected}>Delete all Selected</button>
                    </div>

                    <div style={{display:"inline-block"}}>
                        <table>
                            <tbody>
                                <tr>
                                    <th>Select</th>
                                    <th>Image</th>
                                    <th>First-Name</th>
                                    <th>Last-Name</th>
                                    <th>Phone</th>
                                    <th>Address</th>
                                    <th>Email</th>
                                    <th>Action</th>
                                </tr>
                                { this.showAllUsers() }
                            </tbody>
                        </table>
                    </div> 
                </div>
                
            </>
        )
    }
}

const mapStateToProps = (state) => {
    const { users } = state
    return { users }
  };
  const mapDispatchToProps = dispatch => {
      return{
          Newupdate:(users)=>dispatch(updateuser(users))
      }
  }
    
  
  
export default connect(mapStateToProps, mapDispatchToProps)(UsersList);



    
    
    
    