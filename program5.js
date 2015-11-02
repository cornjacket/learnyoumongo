// this program is redirecting the stdio so i cant just console.log stuff

document = {
  'firstName': process.argv[2],
  'lastName':  process.argv[3]
}
              
//console.log(JSON.stringify(document))


var mongo = require('mongodb').MongoClient
mongo.connect('mongodb://localhost:27017/learnyoumongo', function(err, db) {
  
  if (err) throw err
  // db gives access to the database
  //console.log("No error")
  db.collection('docs').insert( document, function(err, data) {
    if (err) throw err
    console.log(JSON.stringify(document))
    db.close()
  })
  
 //db.close() // closing here is a bug because there is a callback above that uses db

})



//Here's the official solution in case you want to compare notes:
//
//────────────────────────────────────────────────────────────────────────────────
/*
   
    var mongo = require('mongodb').MongoClient
    
    var firstName = process.argv[2]
    var lastName = process.argv[3]
    var doc = {
      firstName: firstName
    , lastName: lastName
    }
    
    var url = 'mongodb://localhost:27017/learnyoumongo'
    mongo.connect(url, function(err, db) {
      if (err) throw err
      var collection = db.collection('docs')
      collection.insert(doc, function(err, data) {
        if (err) throw err
        console.log(JSON.stringify(doc))
        db.close()
      })
    })
   
*/