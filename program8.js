// check al argv's
//process.argv.forEach(function(e) {
//  console.log(e) // parseInt() needs to be done
//})

var age = parseInt(process.argv[2])
//console.log ("Age is "+age)




var mongo = require('mongodb').MongoClient
mongo.connect('mongodb://localhost:27017/learnyoumongo', function(err, db) {
  
  if (err) throw err
  // db gives access to the database
  //console.log("No error")
  db.collection('parrots').count( { age: { $gt: age } }, function(err, count) {
    if (err) throw err
    console.log(count)
    db.close()
  })
  
 //db.close() // closing here is a bug because there is a callback above that uses db

})

//Here's the official solution in case you want to compare notes:
//
//────────────────────────────────────────────────────────────────────────────────
/*

    var mongo = require('mongodb').MongoClient
    var age = process.argv[2]
    
    var url = 'mongodb://localhost:27017/learnyoumongo'
    
    mongo.connect(url, function(err, db) {
      if (err) throw err
      var parrots = db.collection('parrots')
      parrots.count({
        age: {
          $gt: +age
        }
      }, function(err, count) {
        if (err) throw err
        console.log(count)
        db.close()
      })
    })

*/