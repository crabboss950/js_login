const express = require('express')
const app = express()
const port = 3000
const bodyParser = require('body-parser')
// bodyParser란 ? 클라이언트 POST, request data의 body로부터 파라미터를 편리하게 추출
//  npm i body-parser
const cookieParser = require('cookie-parser')
// npm i cookie-parser
const jwt = require('jsonwebtoken')
// npm i jsonwebtoken
const database = require("./database");

app.use(cookieParser());
app.use(bodyParser.json());

const jwtKey = "abc123456";


// 회원가입을 위한 ...................................................
// app.post("/api/members", async(req, res) =>{
//     const signId = req.body.signId;
//     const signName = req.body.signName;
//     const signPw = req.body.signPw;

//     await database.run(`INSERT INTO members (loginId) VALUES (?)`, [req.body.signId]);
//     await database.run(`INSERT INTO members (name) VALUES (?)`, [req.body.signName]);
//     await database.run(`INSERT INTO members (loginPw) VALUES (?)`, [req.body.signPw]);
//     const result = await database.run("SELECT * FROM members");
//     res.send(result)
// }); 

// app.get('/api/members', async(req, res) => {
//     const result = await database.run("SELECT * FROM members");
//     res.send(result)
//   });
// -------------------------------------------------------------------

app.post('/api/account', async(req, res) => {

    const loginId = req.body.loginId;
    const loginPw = req.body.loginPw;
    const loginName = req.body.loginName;

    console.log(loginId, loginPw, loginName);

    // await database.run('INSERT INTO members (loginId, loginPw, name) VALUES (loginId, loginPw, loginName)');

    // await database.run(`INSERT INTO members VALUES (id, "${loginName}", "${loginId}", "${loginPw}")`);
    await database.run(`INSERT INTO members (name, loginId, loginPw) VALUES ("${loginName}", "${loginId}", "${loginPw}")`);

    // await database.run(`INSERT INTO members (loginId, loginPw, name) VALUES (?)`, [loginId, loginPw, loginName]);

    // await database.run(`INSERT INTO members (loginId) VALUES (?)`, [loginId]);
    // await database.run(`INSERT INTO members (loginPw) VALUES (?)`, [loginPw]);
    // await database.run(`INSERT INTO members (name) VALUES (?)`, [loginName]);

    const result = await database.run("SELECT * FROM members");
    res.send(result)
});

app.delete('/api/account', (req, res) => {
    if(req.cookies && req.cookies.token){
        res.clearCookie("token");
    }
    res.sendStatus(200);
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})