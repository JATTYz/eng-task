import React from 'react'
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

class UpdateContact extends React.Component {
        state = {
        id:"",
        name: "",
        email: "",
        phone: ""
    }
  

    update = (e) => {
        e.preventDefault();
        if(this.state.id === ""
            || this.state.name === "" 
                || this.state.email === ""
                    || this.state.phone === ""){
                    alert("Please fill")
                }
        this.props.updateContactHandler(this.state);

        this.setState({id:"", name:"", email: "", phone: ""});

    }


    render(){
        return (
            <>
            <h1>Update Contact</h1>
            <Form onSubmit={this.update}>
            <Form.Group className="mb-3">
                <Form.Label>ID</Form.Label>
                <Form.Control 
                name='name'
                value={this.state.id}
                onChange={ (e) => this.setState({id: e.target.value})}
                placeholder="eg. 213sd8-2fdf34" />
            </Form.Group>
            <Form.Group className="mb-3">
                <Form.Label>Full Name</Form.Label>
                <Form.Control 
                name='name'
                value={this.state.name}
                onChange={ (e) => this.setState({name: e.target.value})}
                placeholder="eg. Tim Brownie" />
            </Form.Group>
            <Form.Group className="mb-3">
                <Form.Label>Email</Form.Label>
                <Form.Control 
                name='email'
                value={this.state.email}
                onChange={ (e) => this.setState({email: e.target.value})}
                placeholder="eg. abc@gmail.com" />
            </Form.Group>
            <Form.Group className="mb-3">
                <Form.Label>Phone</Form.Label>
                <Form.Control 
                name='phone'
                value={this.state.phone}
                onChange={ (e) => this.setState({phone: e.target.value})}
                placeholder="eg. 0343233232" />
            </Form.Group>
                <Button type="submit">Update</Button>
                </Form>
            </>
        )
    }
}

export default UpdateContact