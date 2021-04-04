// const fs = require('fs');
// const path = require('path');
const { Alphabet } = require('../models');
var data = require('../data/data.json');

module.exports.process = (req, res) => {
  // fs.readFile(path.resolve(__dirname, '..', 'data', 'data.json'), 'utf8', (err, data) => {
  //   if(err){
  //     console.log(err);
  //   }
    
  //   data = JSON.parse(data).filter(element => {
  //     return element.randAlphabet == 'a' || element.randAlphabet == 'b'
  //   })

  //   Alphabet.bulkCreate(data).then((result) => {
  //     return res.sendStatus(201);
  //   }).catch((err) => {
  //     res.status(500).json({message: err.message});
  //   });
    
  // })

  //For JSON file require better because it caches module and don't need to parse json which require with fs.
  data = data.filter(element => {
    return element.randAlphabet == 'a' || element.randAlphabet == 'b'
  })

  Alphabet.bulkCreate(data).then((result) => {
    return res.sendStatus(201);
  }).catch((err) => {
    res.status(500).json({message: err.message});
  });
}

module.exports.fetch = (req, res) => {
  Alphabet.findAll().then((data) => {
    res.json(data);
  }).catch((err) => {
    res.status(500).json({ message: err.message });
  });
}