console.log(process.argv[2])
              
// solution is preferred since it queries only on the username which is all that is necessary since it
// is unique.              
document = {
      "name": "Tina",
      "age": 30,
      "username": "tinatime"
    }


var mongo = require('mongodb').MongoClient
mongo.connect('mongodb://localhost:27017/'+process.argv[2], function(err, db) {
  
  if (err) throw err
  // db gives access to the database
  //console.log("No error")
  db.collection('users').update( document, {
    $set: {
      "age": 40  
      }
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
      var collection = db.collection('users')
      collection.update({
        username: 'tinatime'
      }, {
        $set: {
          age: 40
        }
      }, function(err) {
        if (err) throw err
        db.close()
      })
    })
   
 
*/