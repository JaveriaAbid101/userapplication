import React, { Component } from 'react';
import "./App.css";
import { connect } from 'react-redux';
import { updateuser } from './UserAction';


class AddNew extends Component {

  constructor(props) {
    super(props)
  
    this.state = {
      allUsersInStorage: [],
       formData: {
                  id: 0,
                  image: '',
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
    //const storedData = localStorage.getItem('My_details'); 
      console.log('did mount');
      const storedData= this.props.users
    if (storedData !== null && storedData !== ""){
      this.setState({allUsersInStorage:storedData.users})
    } 

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
      allUsers.push(newUsers); 
      this.props.Newupdate(allUsers)
      //localStorage.setItem('My_details', JSON.stringify(allUsers));
      
      this.setState({allUsersInStorage: allUsers});
      alert('success ');
      this.props.history.push('/'); 
    }else
      alert('Kindly, double check all field before submission...')
  }

  handleFileSelect = (e) => {
    const image = e.target.files[0];  

    if (window.File && window.FileReader && window.FileList && window.Blob) {
 
      const reader = new FileReader(); 

      reader.onload = ((theFile) => {
        return (e) =>  {
          const binaryData = e.target.result; 
          const base64String = window.btoa(binaryData);

          let formData = this.state.formData;
          formData.image = base64String

          this.setState({formData: formData}); 
    

        };
      })(image);
      
      reader.readAsBinaryString(image);

    } else {
      alert('The File APIs are not fully supported in this browser.');
    }

  }
  render() {
    return (
      
      <div className="align-Center">
 
        <form class="contact-form" onSubmit={this.handleFormSubmision}>
      <h1>USER DETAILS</h1>

      <div class="txtb"> 
        <input type="file" onChange={this.handleFileSelect} accept="image/x-png,image/gif,image/jpeg"/>  
      </div>

      
      <div class="txtb">
        <label>First Name :</label>
        <input type="text" name='firstname' onChange={this.handleInputChage}  placeholder="Enter Your First Name"/> 
        <div style={{color:'red'}}>
            {this.state.formErrors.firstname}
        </div>
      </div>

      <div class="txtb">
        <label>Last Name :</label>
        <input type="text" name='lastname' onChange={this.handleInputChage} placeholder="Enter Your Last Name"/>
        <div style={{color:'red'}}> 
            {this.state.formErrors.lastname} 
        </div>
      </div>

      <div class="txtb">
        <label>Phone Number :</label>
        <input type="text" name='phone' onChange={this.handleInputChage}  placeholder="Enter Your Phone Number"/>
        <div style={{color:'red'}}> 
            {this.state.formErrors.phone}
        </div>
      </div>

      <div class="txtb">
        <label>Email :</label>
        <input type="email" name='email' onChange={this.handleInputChage}  placeholder="Enter Your Email"/>
          <div style={{color:'red'}}> 
              {this.state.formErrors.email}
          </div>
      </div>

      <div class="txtb">
        <label>Address :</label>
        <input type="text" name='address' onChange={this.handleInputChage}  placeholder="Enter Your Address"/>
        <div style={{color:'red'}}> 
            {this.state.formErrors.address}
        </div>
      </div>
      

      <div class="btnparent"> 
          <button type="submit" class="btn">Add</button> 
      </div>
  
    
    </form>
      </div>
      
    );
  }
}

const mapStateToProps = (state) => {
  const { users } = state
  alert(users)
  return { users }
  
};
const mapDispatchToProps = dispatch => {
    return{
        Newupdate:(details)=>dispatch(updateuser(details))
    }
}
  

export default connect (mapStateToProps,mapDispatchToProps)(AddNew) ;

