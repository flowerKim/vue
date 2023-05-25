// const express = require('express');
// const app = express();

// // 3000번포트, 앱이 정상적으로 띄워지면 콜백함수호출
// const server = app.listen(3000, ()=>{
//   console.log('server start : localhost:3000');
// });

// // __dirname : 현재 디렉토리
// app.set('views', __dirname + '/views');
// app.set('view engine', 'ejs'); 
// app.engine('html', require('ejs').renderFile);


// //라우팅, req:request/ res:response
// app.get('/', (req, res) => {
//     res.render('index.html');
// });
// app.get('/about', (req, res) => {
//     res.render('about.html');
//     // res.send('about, Hello World!')
// });

// var mysql      = require('mysql');
// var connection = mysql.createConnection({
//     host     : '192.168.50.77',
//     user     : 'mariadb',
//     password : 'mariadb',
//     database : 'dev'
// });
// // console.log(connection);
// app.get('/db', (req, res) => {
//     pool.getConnection(function(err, connection) {
//         if (err) throw err; // not connected!
       
//         // Use the connection
//         connection.query('SELECT * FROM t_product', function (error, results, fields) {
//             res.send(JSON.stringify(result));
//             console.log('result', result);
//           // When done with the connection, release it.
//           connection.release();
       
//           // Handle error after the release.
//           if (error) throw error;
       
//           // Don't use the connection here, it has been returned to the pool.
//         });
//       });
// });