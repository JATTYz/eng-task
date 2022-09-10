
// *** THIS FILE IS CREATED TO TEST PARSEING .csv to .json file *** //

import axios from 'axios';
import React, { CSSProperties, useEffect } from 'react';
import { useState } from 'react';
import { useCSVReader } from 'react-papaparse';

const styles = {
  csvReader: {
    display: 'flex',
    flexDirection: 'row',
    marginBottom: 10,
  } as CSSProperties,
  browseFile: {
    width: '20%',
  } as CSSProperties,
  acceptedFile: {
    border: '1px solid #ccc',
    height: 45,
    lineHeight: 2.5,
    paddingLeft: 10,
    width: '80%',
  } as CSSProperties,
  remove: {
    borderRadius: 0,
    padding: '0 20px',
  } as CSSProperties,
  progressBarBackgroundColor: {
    backgroundColor: 'red',
  } as CSSProperties,
};
const CSVReader = () => {

const { CSVReader } = useCSVReader();

const [columnData,  setColumnData] = useState([]);
const [test, setTest]= useState(null);

async function postData(){
  axios.post('http://localhost:5000/contacts', {contact: columnData});
}

async function getData(){
  const res = await fetch('http://localhost:5000/contacts');
  const data = await res.json();
  return data;
}


  return (

  <CSVReader

      config={{ header: true }}
      onUploadAccepted={async (results: any) => {
        
        const s = await results;
        console.log('---------------------------');
        console.log(s.data);
        console.log('---------------------------');

        setColumnData(s.data)
      }}
    >
      {({
        getRootProps,
        acceptedFile,
        ProgressBar,
        getRemoveFileProps,
      }: any) => (
        <>
          <div style={styles.csvReader}>
            <button type='button' {...getRootProps()} style={styles.browseFile}>
              Browse file
            </button>
            <div style={styles.acceptedFile}>
              {acceptedFile && acceptedFile.name}
            </div>
            <button {...getRemoveFileProps()} style={styles.remove}>
              Remove
            </button>
          </div>
          <ProgressBar style={styles.progressBarBackgroundColor} />

          <button onClick={postData}> Save Data </button>
        </>
      )}
    </CSVReader> 

  )
}

export default CSVReader