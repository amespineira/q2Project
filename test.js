var bcrypt=require('bcrypt')
var password="test"
bcrypt.hash(password, 10, function(err, hash) {
  console.log(hash);
})
