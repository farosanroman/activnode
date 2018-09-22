const express=require('express');
const app=express();
const ASCII = require('./shared/ascii');
const SQL = require('./shared/sqlmodule');
//const SQL = require('./shared/sqlmodule');
//queries=require('./shared/queries');
//node app.js   <<<<<<<<<

app.use(express.json())
app.get('/',(req,res)=>{
  res.send("ActiBiz v0.0.0")
  //var ppa=queries.f();
 
});
app.get('/ascii',(req,res)=>{
    
    var qry=ASCII.asciiprocesar();
    console.log(qry)
    var criteria={qry:qry}
    SQL.sqlrequest(criteria, function (err, results) { 
      console.log(results)
      res.send(results);
    })
    

    //var ppa=queries.f();
    
  });


const port=process.env.PORT || 4730
app.listen(port,()=>console.log(`Listening on Port ${port}...`));

