// Program will average prices for items of size: size provided by command line

var size = process.argv[2]
//console.log ("Size is "+size)




var mongo = require('mongodb').MongoClient
mongo.connect('mongodb://localhost:27017/learnyoumongo', function(err, db) {
  
  if (err) throw err
  // db gives access to the database
  //console.log("No error")
  db.collection('prices').aggregate([
      { $match: { size: size }},
      { $group: {
        _id: 'average', // This can be an arbitrary string in this case
        average: {
          // $avg is the operator used here
          $avg: '$price'
        }
      }}
    ]).toArray(function(err, results) {
      // handle error
       if (err) throw err
       //console.log(results)
       console.log(Number(results[0].average).toFixed(2))
       // => [
       // =>   { _id: 'total', total: 11 }
       // => ]
      db.close()
    })
  
 //db.close() // closing here is a bug because there is a callback above that uses db

})

//Here's the official solution in case you want to compare notes:
//
//────────────────────────────────────────────────────────────────────────────────
/*

    var mongo = require('mongodb').MongoClient
    var size = process.argv[2]
    
    var url = 'mongodb://localhost:27017/learnyoumongo'
    
    mongo.connect(url, function(err, db) {
      if (err) throw err
      var prices = db.collection('prices')
      prices.aggregate([
        { $match: {
          size: size
        }}
      , { $group: {
          _id: 'total'
        , total: {
            $avg: '$price'
          }
        }}
      ]).toArray(function(err, results) {
        if (err) throw err
        if (!results.length) {
          throw new Error('No results found')
        }
        var o = results[0]
        console.log(Number(o.total).toFixed(2))
        db.close()
      })
    }) 

*/