import React from 'react'
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
class AddContactVCF extends React.Component {
    state = {
        name: "",
        email: "",
        phone: ""
    }


    add = (e) => {
        e.preventDefault();
        if(this.state.name === "" 
            || this.state.email === ""
                || this.state.phone === ""){
                    alert("Please fill")
                }
        this.props.addToVcard(this.state)
        this.setState({name:"", email: "", phone: ""})
        console.log(this.state);
    }


    render(){
        return (
                <>
                <h1>***************************</h1>
                <h1>Add Contact to VCARD 
                  <span className='fs-6'>** this will pass data to the node.js server and save it with .vcf file **</span>
                </h1>
                <Form onSubmit={this.add}>
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
                  <Button className="mb-5" type="submit">Add</Button>
                  </Form>
                </>
        )
    }
}

export default AddContactVCF