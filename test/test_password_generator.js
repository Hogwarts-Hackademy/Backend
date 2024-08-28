const bcrypt = require("bcrypt");

bcrypt.genSalt(10, (err, salt) => {
  bcrypt.hash("test", salt, (err, hash) => {
    console.log("Hashed Password:", hash);
  });
});
