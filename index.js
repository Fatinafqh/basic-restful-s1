const express = require('express')
const jwt = require('jsonwebtoken')
const app = express()
const port = 3000 

let dbUsers = [
  {
      username: "fatin",
      password: "password",
      name: "Fatin",
      email: "Fatin@utem.edu.my"
  },
  {
      username: "abu",
      password: "123456",
      name: "abu",
      email: "abu@utem.edu.my"
  },
  {
      username: "ali",
      password: "012345",
      name: "Ali",
      email: "ali@utem.edu.my"
  }
      
]

app.use(express.json());

app.post('/login', (req, res) => {
  let data = req.body
 // res.send(
 //   login(data.username, data.password)
  //)
//})

const user = login(data.username,data.password)
  res.send(generateToken(user))
});

app.post('/register', (req, res) => {
  let data = req.body
  res.send(
    register(
      data.username,
      data.password,
      data.name,
      data.email
    )
  )
})

app.get('/hello', verifyToken, (req, res) => {
  console.log(req.user)

  res.send('Hello World!')
})
// get is one of the method to request to the server

// app.post('/', (req, res) => {
//   let data = req.body
//   res.send('Post request' + data.name)
// })

app.post('/', (req, res) => {
  let data = req.body
  res.send( 'Post request' + JSON.stringify(data))
})

// create a POST route for user to login
// app.post('/login'), (req, res) => {
//   // get the username and password from the resquest body
//   const {username, passwoord} = req.body;
// FFFF
//   //find the user in the database
//   const user = dbUsers.find(user => user.username === username && user.password ===password);

//   // if user is found, return the user object
//   if (user) {
//     res.send(user);
//   } else {
//     // if user is not found, return an error message
//     res.send({ error: "user not found"});
//   }
// }

app.post('/bye', (req, res) => {
    res.send('Bye Bye World!')
  })
// post is one of the method to request to the server

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

//mornally in search bar use get method, inside the website like fill the form use post

// login
function login(username, password) {
  console.log("someone try to login with", username, password)

  let matched = dbUsers.find(element => element.username == username)

  if (matched) {
      if(matched.password == password) {
          return matched
      } else {
          return "Password not matched"
      }
  } else {
      return "Username not found"
  }
}

function register(newusername, newpassword, newname, newemail) {
  let matched = dbUsers.find(element => element.username == newusername) 

  if (matched) {
     return "username already exist"
  } else {
      dbUsers.push({
          username: newusername,
          password: newpassword,
          name: newname,
          email: newemail
      })
      return "new account has been created"
  }
  
}
function generateToken(userProfile){
return jwt.sign({
  userProfile
}, 'secret', { expiresIn: 60 * 60 });
}
// to verify JWT token
function verifyToken(req,res, next){
  let header=req.headers.authorization
  console.log(header)

  let token=header.split(' ')[1]

jwt.verify(token, 'secret', function(err, decoded) {
  if(err){
    res.send("Invalid Token")
  }

  req.user = decoded
  next()
});
}