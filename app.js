const express = require("express");
const app = express();
const MongoClient = require('mongodb').MongoClient;
const ObjectId = require('mongodb').ObjectId; 
var url = `mongodb://localhost:27017/`;

// To insert data in MongoDB

 app.get('/create', function(req, res){
    res.send(req.query.act);     
    var Activity =req.query.act;
      
      if(Activity) {                    
        MongoClient.connect(url, function(err, db) {
          if (err) throw err;
          var dbo = db.db("TODO");
          var myobj = { myact: `${Activity}`};
          dbo.collection("todo").insertOne(myobj, function(err, res) {           
            if (err) throw err;
            console.log("1 document inserted");           
            var id = res.insertedId.toHexString();             
            console.log(id)
            db.close();
          });
        });
      }
  });


// To delete data in MongoDB

app.get('/delete',function(req,res){
  var id= req.query.id  
  MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    var dbo = db.db("TODO");   
  dbo.collection("todo").deleteOne({_id:ObjectId(id)}, function(err, obj) {
    if (err) throw err;
    console.log("1 document deleted");
    db.close();
  });
});
});

// To Update data in MongoDB

app.get('/update',function(req,res){ 
  var Activity=req.query.act;
  var id= req.query.id  
  MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    var dbo = db.db("TODO");
    var myquery = {_id:ObjectId(id)};
    var newvalues = { $set: { myact: `${Activity}`}};
  dbo.collection("todo").updateOne(myquery,newvalues, function(err, res) {
    if (err) throw err;
    console.log("1 document updated");
    db.close();
  });
});
});

  app.use(express.json());
  app.post('/', (req, res) => {
    res.json(req.query);
}); 

app.get('*',function(req, res){
        res.send('invalid page')
        });

app.listen(3000, function() {
     console.log("Server Up and running")
});