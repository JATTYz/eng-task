const express = require('express');
const cors = require("cors");
const bodyParser = require('body-parser');
const helmet = require('helmet');
const app = express();
const port = 8000;
var vCardsJs = require('vcards-js');
const fs = require('fs');
const fileupload = require("express-fileupload");

app.use(cors());
app.use(bodyParser.json());
app.use(helmet());
app.use(fileupload());
app.use(bodyParser.urlencoded({ extended: true }));

app.post('/api', function(req,res) {
  console.log(req.body.newData);
  // console.log(data);
  var vCard = vCardsJs();
  vCard.uid = req.body.newData.id;
  vCard.firstName = req.body.newData.contact.name; 
  vCard.email = req.body.newData.contact.email;
  vCard.saveToFile(`./contacts/${req.body.newData.contact.email}.vcf'`);

  // console.log(vCard);

  // save data to db.json file
  var data = fs.readFileSync('db.json');
  var json = JSON.parse(data);
  json.push(vCard)
  fs.writeFileSync('db.json', JSON.stringify(json));
})

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(port, () => {
  console.log(`App is listening at http://localhost:${port}`);
});

//contacts API
app.get('/api/contacts', (req,res) => {
  var data = fs.readFileSync('db.json');
  var json = JSON.parse(data);
  res.json(json);
})

app.post('/upload', (req,res) => {
  const file = req.files.file;
  const filename = file.name;

  file.mv(`./contacts/${filename}`, (err) => {
    res.status(500).send({message: "File upload failed"})
  })

  // TODO:
  // parse .vcf file to .json and store in db.json
  

})



//** Testing write .vcf to .json file */

// app.get('/test', (req,res) => {
  //  res.send(card.readFile("./contacts/jatty.vcf", function (err,json))
  //  const test = card.readFile("./jatty.vcf", function(err, json){}); 
  // vCard.
  //  res.send(JSON.stringify(data));
  // res.send("")
  // var vCardsJS = require('vcards-js');
  // var vCard = vCardsJS();
  // vCard.firstName = 'Eric';
  // vCard.middleName = 'J';
  // vCard.lastName = 'Nesser';
  // var vCard2 = require('vcard');
  // console.log(vCard.getFormattedString());
  // console.log(j);

  // var a = VCard1.parse(vCard.getFormattedString());
  // fs.writeFileSync("./db.json", k, (err) => {
  //   if(err){
  //     console.log(err);
  //     return
  //   }
  //   console.log("add");
  // })
  // console.log(a);
  // a.forEach(vCard=>{
  //   var c = vCard.toJSON();
  //    console.log(c);
  // })
  // var card = new vCard2();
  // const b =card.readData(vCard.getFormattedString(), function(err, json) {
	// console.log("%%",util.inspect(json));
  // console.log(err);
  // })
// })

// Testing Read file
// const test = card.readFile("./jatty.vcf", function(err, json) {
// });
// card.readFile("./jatty.vcf")
// var vCard = vCardsJs();
// vCard.fisrtName = "Jatty";
// vCard.middleName = 'J';
// vCard.lastName = 'Tepjuk';
// vCard.title = 'Software Developer';
// vCard.url = 'https://github.com/Jattyz';
// vCard.note = 'For Jatty';
// vCard.saveToFile('./jatty.vcf');
// console.log(vCard.getFormattedString());

