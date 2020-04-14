import React from 'react'

function MyUser(props) {
    return (
        <tr>
            <td><input className="myCheckBox" 
                        type="checkbox" 
                        defaultChecked={props.selectedUsersForDel.find(item => item === props.item.id)}
                        onChange={() => props.handleSelect(props.item.id)}/></td>
            
            <td> 
                <img src={`data:image/jpeg;base64,${props.item.image}`}  
                    width="70px" height="70px" alt="no image to display"/>
            </td>
            <td>{props.item.firstname}</td>
            <td>{props.item.lastname}</td>
            <td>{props.item.phone}</td> 
            <td>{props.item.address}</td>  
            <td>{props.item.email}</td> 
            <td>
                <span onClick={() => props.handleSingleUserDelete(props.item.id)} className="material-icons del_btn">&#xE872;</span> 
                {/* <span className="material-icons edit_btn">&#xE254;</span> */}
            
            </td> 
        </tr>
    )
}

export default MyUser
