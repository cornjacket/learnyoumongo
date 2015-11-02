db_name = process.argv[2]
collection_name = process.argv[3]
_id = process.argv[4]

console.log(db_name)
console.log(collection_name)
console.log(_id)


document = {
      "name": "Tina",
      "age": 30,
      "username": "tinatime"
    }


var mongo = require('mongodb').MongoClient
mongo.connect('mongodb://localhost:27017/'+db_name, function(err, db) {
  
  if (err) throw err
  // db gives access to the database
  //console.log("No error")
  db.collection(collection_name).remove( 
    {
      _id: _id  // note that the id actually is a string and not a number, therefore no need to convert to int
    },
    function(err, data) {
    if (err) throw err
    //console.log(JSON.stringify(document))
    db.close()
  })
  
 //db.close() // closing here is a bug because there is a callback above that uses db

})



//Here's the official solution in case you want to compare notes:
//
//────────────────────────────────────────────────────────────────────────────────
/*
  
    var mongo = require('mongodb').MongoClient
    
    var url = 'mongodb://localhost:27017/' + process.argv[2]
    
    mongo.connect(url, function(err, db) {
      if (err) throw err
      var collection = db.collection(process.argv[3])
      collection.remove({
        _id: process.argv[4]
      }, function(err) {
        if (err) throw err
        db.close()
      })
    })  

*/