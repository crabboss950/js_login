// 해당 DB에 대한 정보를 입력한다.
const mariadb = require('mariadb');
const pool = mariadb.createPool({
     host: '127.0.0.1', 
     user:'root', 
     password: '1234',
     connectionLimit: 5,
     database: 'members'
});

module.exports = {
    async run(query, params){
        return new Promise((resolve)=>{
            console.log("db.js 1번 입니다.");
            pool.getConnection()
            .then(conn => {
                console.log("db.js 2번 입니다.");
                conn.query(query, params)
                    .then((rows) => {
                        console.log("db.js 3번 입니다.");
                        resolve(rows);
                    })
                    .catch(err => {
                        console.log("db.js 4번 입니다.");
                        conn.end();
                    })               
            }).catch(err => {
                console.log("db.js 5번 입니다.");
            });
        });    
    }
}