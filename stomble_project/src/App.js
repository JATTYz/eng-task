import axios from 'axios';
import React ,{ useEffect, useState } from 'react';
import './App.css';
import Nav from './component/Nav';
// import CSVReader from './CSVReader.tsx'; **For testing .CSV reader**
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import AddContact from './component/AddContact';
import uuid from 'react-uuid';
import UpdateContact from './component/UpdateContact';
import Contact from './Contacts';
import Form from 'react-bootstrap/Form';
import { Button } from 'react-bootstrap';
import AddContactVCF from './component/AddContactVCF';

function App() {

const [rowData, setData] = useState([]);
const [query, setQuery] = useState("");

//load data when this page is loaded.
useEffect(() => {getData()}, []);

const getData = async () => {
  axios.get(`http://localhost:5000/contacts`).then((res) => {
    const allData = res.data;
    setData(allData);
  })
}

const addContactHandler = async (contact) => {

  //  console.log(contact);
  const newData = {
    id: uuid(),
    contact
  }

  await axios.post(`http://localhost:5000/contacts`, newData); 
  setData([...rowData, newData])
}

const removeContactHandler = async (id) => {
  console.log(id);
  await axios.delete(`http://localhost:5000/contacts/${id}`);
  const newContacts = rowData.filter((c) => {
    return c.id !== id;
  });

  setData(newContacts);
}


const updateContactHandler = async (contact) => {
  await axios.put(`http://localhost:5000/contacts/${contact.id}`, {contact: contact});

//** Try to implement, but got contact.contact is undefined */
//  setData(rowData.map((c) => {
//   return c.id === id ? {...res.data} : contact;
//  }));
//  console.log(res);

}

//seach by name feature
const search = (data) => {
  return data.filter((c) => c.contact.name.toLowerCase().includes(query));
}

const addToVcard = async(contact) => {
    const newData = {
      id: uuid(),
      contact
      }

  const result = await axios.post('http://localhost:8000/api', { newData });
  console.log(result);
}

const [file, setFile] = useState();

const saveFile = (e) => {
  setFile(e.target.files[0]);
  // console.log(file);
}

const uploadFile = async (e) => {
  const formData = new FormData();
  formData.append("file", file);
  console.log(formData);
  await axios.post("http://localhost:8000/upload", formData);
}
 
  return (
    <div >
      <Nav/>
      <Container className="mt-5">
          <div>
            <Form.Group controlId="formFile" className="mb-3">
            <Form.Label>Insert File Here</Form.Label>
            <Form.Control onChange={saveFile} type="file" />
            <Button className="my-3" onClick={uploadFile}>Save Data</Button>
            </Form.Group>
          </div>
          <Row>
            <Col>
          <AddContact addContactHandler={addContactHandler} /> 
            </Col>
            <Col>
          <UpdateContact updateContactHandler={updateContactHandler}/>
            </Col>
          </Row>
          <div className='d-flex align-items-center justify-content-center m-4' >
          <label className='fs-4 px-3'>Search: </label><input
            type="text"
            placeholder="Search By Name"
            onChange={(e) => setQuery(e.target.value.toLowerCase())}
          />
          </div>
          <Row>
          <Contact data={rowData} 
                remove={removeContactHandler} 
                update={updateContactHandler}
                search={search(rowData)}
                />
          </Row>
          <AddContactVCF addToVcard={addToVcard}/>

          {/* <p>** I try to implement this feature. I can only store in .json file but I can't fetch it **</p>
          <h1>Please select a .csv file</h1>
          <CSVReader/> */}
      </Container>
    </div>
  );
}

export default App;
