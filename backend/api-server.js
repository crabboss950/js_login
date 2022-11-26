// const express = require('express')
// const app = express()
// const port = 3000

// app.get('/', (req, res) => {
//   res.send('Hello World!')
// })

// app.listen(port, () => {
//   console.log(`Example app listening on port ${port}`)
// })

const express = require('express')
const app = express()
const port = 3000

// bodyParser란 ? 클라이언트 POST, request data의 body로부터 파라미터를 편리하게 추출하기 위해
// npm install body-parser
const bodyParser = require('body-parser') 

// npm i cookie-parser
const cookieParser = require('cookie-parser')

// npm i jsonwebtoken
const jwt = require('jsonwebtoken')

// 데이터 베이스 연결
const database = require("./database");

app.use(cookieParser());
app.use(bodyParser.json());

// jwt key 값을 설정하여 암호화된 값을 만들어 준다.
const jwtKey = "abc123456";

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})