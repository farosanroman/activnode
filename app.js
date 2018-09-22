const express=require('express');
const app=express();

const ASCIIFS = require('./shared/asciifs');
const ASCIIQRY = require('./shared/asciiqry');

const SQL = require('./shared/sqlmodule');
//node app.js   <<<<<<<<<

app.use(express.json())
app.get('/',(req,res)=>{
  res.send("ActivNode v0.0.0")
  //var ppa=queries.f();
 
});
app.get('/asciitodo',(req,res)=>{
    //version original como lo estaba haciendo alfred
    var TXT=ASCIIFS.asciiread("dir")
    console.log(TXT)
    var qry=ASCIIQRY.asciiprocesar(TXT);
    console.log(qry)
    var criteria={qry:qry}
    SQL.sqlrequest(criteria, function (err, results) { 
      console.log(results)
      res.send(results);
    })
  });
  app.get('/asciiget',(req,res)=>{
    //version original como lo estaba haciendo alfred
    var TXT=ASCIIFS.asciiread("dir")
    res.send({twt:TXT});
  });
  app.post('/asciipost',(req,res)=>{
    var qry=req.body;
    var criteria={qry:qry}
    SQL.sqlrequest(criteria, function (err, results) { 
      console.log(results)
      res.send(results);
    })
  });
const port=process.env.PORT || 4730
app.listen(port,()=>console.log(`Listening on Port ${port}...`));