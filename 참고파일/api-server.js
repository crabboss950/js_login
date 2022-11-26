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

// 회원가입 db 연동 -------------------------------------------------------------------------------------------------------------
app.post('/api/maccount', async(req, res) => {

    const loginId = req.body.loginId;
    const loginPw = req.body.loginPw;
    const loginName = req.body.loginName;

    console.log(loginId, loginPw, loginName);

    await database.run(`INSERT INTO members (name, loginId, loginPw) VALUES ("${loginName}", "${loginId}", "${loginPw}")`);

    const result = await database.run("SELECT * FROM members");
    res.send(result)
}); 

// ------------------------------------------------------------------------------------------------------------------------------

// 로그인을 위한 ---------------------------------------------------
app.get('/api/account', (req, res) => {
    if (req.cookies && req.cookies.token){
        jwt.verify(req.cookies.token, jwtKey, (err, decoded) => {
            if(err) {
                return res.sendStatus(401);
            }

            res.send(decoded);
        })
    }
    else {
        res.sendStatus(401);
    }
})

app.post('/api/account', async(req, res) => {

    const loginId = req.body.loginId;
    const loginPw = req.body.loginPw;

    const result = await database.run(`SELECT * FROM members where loginId='${loginId}' AND loginPw='${loginPw}'`);

    const members = [
        {
            id: result[0]['id'],
            name: result[0]['name'],
            loginId: result[0]['loginId'],
            loginPw: result[0]['loginPw'],
        }
    ];
    // v. post로 가져온 데이터에 정보가 있으면 body로 받아서
    // find를 통해 members에 동일한 값이 있는지 찾는다.
    // find 메서드는 주어진 판별 함수를 만족하는 첫 번째 요소의 값을 반환한다.
    const member = members.find(m => m.loginId === loginId && m.loginPw === loginPw);

    if(member) {
        // 옵션을 가진 쿠키로 저장하고
        const options = {
            domain: "localhost",
            path: "/",
            httpOnly: true
        };

        // 보안을 위해서 sign이라는 매서드를 통해 id와 name을 가진 객체를 만들고 
        const token = jwt.sign({
            id: member.id,
            name: member.name,
        }, jwtKey, {          // 두번째 인자값으로 암호화된 키를 넣어준다
            expiresIn: "10m",       // 언제까지 유효한지 적어둔다
            issuer: "africalib"     // 발급자
        });

        res.cookie("token", token, options);  // 로그인 된 값을 유지하기 위해서, acoount라는 key에다가 값을 저장해줌
        res.send(member);
    } else{
        res.sendStatus(404);
    }
})
// ---------------------------------------------------------------------


app.delete('/api/account', (req, res) => {
    if(req.cookies && req.cookies.token){
        res.clearCookie("token");
    }
    res.sendStatus(200);
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})