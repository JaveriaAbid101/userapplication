import React, { Component } from 'react'

export class EditUser extends Component {
  
    constructor(props) {
        super(props)
      
        this.state = {
          allUsersInStorage: [], 
           formData: {
                      id: 0,
                      firstname: '',
                      lastname: '',
                      phone: '',
                      email: '',
                      address: '',}
                      , 
            formErrors: {
                      firstname: '',
                      lastname: '',
                      phone: '',
                      email: '',
                      address: '',
            }
        }
      }
    
      componentDidMount(){
        let storedData = localStorage.getItem('My_details'); 
          console.log('did mount');
          
        if(storedData !== null && storedData !== ""){
            storedData = JSON.parse(storedData);
            let SelectedUser = storedData.filter(item => item.id === parseFloat(this.props.match.params.user_id))[0];
            
            this.setState({allUsersInStorage: storedData, formData: SelectedUser})
        }
        else   
        alert("data is empty")
    
      }
    
    
      validate = (inputName, inputValue) => {
        let testResult = false;
        let errors = this.state.formErrors;
    
        console.log(inputName, inputValue);
        switch(inputName){
            case 'firstname':
            case 'lastname':
              testResult = /^[a-z A-Z]{5,10}$/.test(inputValue); 
              errors[inputName] = testResult ? "" : `${inputName} input value must be < 10 and > 5; and must not include speciall chars`
            break;
    
            case 'phone':
              testResult = /^(\+92|92|03|0092)\d{10}$/.test(inputValue); 
              errors[inputName] = testResult ? "" : `${inputName} input value isn't Valid`;
            break;
    
            case 'email':
              testResult = /^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/.test(inputValue); 
              errors[inputName] = testResult ? "" : `${inputName} input value isn't Valid`; 
            break;
    
            case 'address':
              testResult = inputValue.length > 0 && inputValue.length < 100;
              errors[inputName] = testResult ? "" : `${inputName} input value must be <100 and >0`; 
            break;
    
    
            // case 'password':
            //   testResult = /^(\w){2,10}$/.test(inputValue); 
            //   errors[inputName] = testResult ? "" : `${inputName} input value isn't Valid, make sure length is in range[1,10]`; 
            // break;
    
            default:
              console.log('name is not correct to validate value');
    
        }
    
        this.setState({formErrors: errors});
        return testResult;
      }
      
      validateAllFields = () => {
        let allGood = true;
    
        allGood = this.validate('firstname', this.state.formData.firstname)
                  && this.validate('lastname',this.state.formData.lastname)
                  && this.validate('email',this.state.formData.email)
                  && this.validate('phone',this.state.formData.phone)
                  && this.validate('address',this.state.formData.address);
                  
        return allGood;
      }
    
    
      handleInputChage = (e) => { 
          let data = this.state.formData;
     
          this.validate(e.target.name, e.target.value);
          data[e.target.name] = e.target.value
          
          this.setState({formData: data});
      }
    
    
      handleFormSubmision = (e) => {
        e.preventDefault();
        console.log('changing');
        
        if(this.validateAllFields()){
          let allUsers = this.state.allUsersInStorage;
          let newUsers = {...this.state.formData};
          newUsers.id = (new Date()).getTime(); 
          allUsers.map(item => ( item.id === this.state.formData.id ? this.state.formData : item )); 

          localStorage.setItem('My_details', JSON.stringify(allUsers));
          
          this.setState({allUsersInStorage: allUsers});
          alert('success ');
        }else
          alert('Kindly, double check all field before submission...')
      }
    
      render() {
        if(this.state.formData === undefined)
            return "404 Error.. [User Undefind]"
        

        return ( 
        <form class="contact-form" onSubmit={this.handleFormSubmision}>
          <h1>Editing User: {this.state.formData.id}</h1>
          <div class="txtb">
            <label>First Name :</label>
            <input type="text" 
                    name='firstname' 
                    value={this.state.formData.firstname}
                    onChange={this.handleInputChage}  
                    placeholder="Enter Your First Name"/> 
          </div>
    
          <div class="txtb">
            <label>Last Name :</label>
            <input type="text" 
                    name='lastname' 
                    value={this.state.formData.lastname}
                    onChange={this.handleInputChage} 
                    placeholder="Enter Your Last Name"/>
          </div>
    
          <div class="txtb">
            <label>Phone Number :</label>
            <input type="text" 
                    name='phone' 
                    onChange={this.handleInputChage} 
                    value={this.state.formData.phone} 
                    placeholder="Enter Your Phone Number"/>
          </div>
    
          <div class="txtb">
            <label>Email :</label>
            <input type="email" 
                    name='email'
                    value={this.state.formData.email} 
                    onChange={this.handleInputChage}  
                    placeholder="Enter Your Email"/>
          </div>
    
          <div class="txtb">
            <label>Address :</label>
            <input type="text" 
                    name='address' 
                    onChange={this.handleInputChage}  
                    value={this.state.formData.address}
                    placeholder="Enter Your Address"/>
          </div>
          
    
          <div class="btnparent">
      
          <button class="btn">Add</button>
      
          </div>
    
          <br/><br/><br/>
          <div style={{color:'red'}}>
              {this.state.formErrors.firstname}<br/>
              {this.state.formErrors.lastname}<br/>
              {this.state.formErrors.phone}<br/>
              {this.state.formErrors.email}<br/>
              {this.state.formErrors.address}<br/>
          </div>
        
        </form>
      
        );
      }
    }

export default EditUser
