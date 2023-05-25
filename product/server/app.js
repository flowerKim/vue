const express = require("express");
const app = express();
const session = require("express-session");
const fs = require("fs"); //file system, 디렉토리에 접근할 수 있는 모듈

const cors = require("cors");

let corsOption = {
  // origin: "http://192.168.45.19:8080", // 허락하는 요청 주소
  // origin: "http://localhost:8080", // 허락하는 요청 주소
  // origin: "http://192.168.50.77:8080", // 허락하는 요청 주소-회사
  origin: [
    "http://192.168.50.77:8080",
    "http://localhost:8080",
    "http://192.168.45.19:8080",
  ], // 허락하는 요청 주소-회사

  credentials: true, // true로 하면 설정한 내용을 response 헤더에 추가 해줍니다.
};

app.use(cors(corsOption)); // CORS 미들웨어 추가

app.use(
  session({
    secret: "cecret code",
    resave: false,
    saveUninitialized: false, //세션에 저장할 내용할 내용이 없더라도 다시 저장할것인지
    cookie: {
      secure: false, //session 에 넣어놓고 쓸수있게
      maxAge: 1000 * 60 * 60, //쿠키 유효 시간, 1시간
    },
  })
);

//request 요청할때 바디로 파라미터를 제이슨 형태로 던질 수 있는데. 그거를 웹서버에서 받으려면 express.json 선언을 해줘야하고
//최대 50mb까지 받겠다고 선언해준것임
app.use(
  express.json({
    limit: "50mb",
  })
);

//webserver. 3000포트가 제대로 열려서 구동이되면, ()=>{} 이거를 실행하겠다.
const server = app.listen(3000, () => {
  console.log("server started. port3000");
});

let sql = require("./sql.js");

//파일감시. 변경사항이 있는것을 감지 할 수 있음
fs.watchFile(__dirname + "/sql.js", (curr, prev) => {
  console.log("sql 변경시 재시작 없이 반영되도록 함.");
  delete require.cache[require.resolve("./sql.js")];
  sql = require("./sql.js");
});

//db연결 위한 pool만들기
const db = {
  database: "dh_board",
  connectionLimit: 10,
  host: "27.96.131.184", //test server
  port: "3306",
  user: "root",
  password: "1qaz2wsx3edc",
};

const dbPool = require("mysql2").createPool(db);

app.post("/api/login", async (request, res) => {
  // request.session['email'] = 'ggg3374@gmail.com';
  // res.send('ok');
  console.log("request.session==>", request.session);
  try {
    await req.db("signUp", request.body.param);
    if (request.body.param.length > 0) {
      for (let key in request.body.param[0]) {
        request.session[key] = request.body.param[0][key];
        console.log("request.session[", key, "]", request.session[key]);
      }
      res.send(request.body.param[0]);
    } else {
      res.send({
        error: "Please try agin or contact system manager.",
      });
    }
  } catch (err) {
    res.send({
      error: "db access error",
    });
  }
});

app.post("/api/logout", async (request, res) => {
  request.session.destroy();
  res.send("ok");
});

app.post("/upload/:productId/:type/:fileName", async (request, res) => {
  let { productId, type, fileName } = request.params;

  const dir = `${__dirname}/uploads/${productId}`;
  const file = `${dir}/${fileName}`;
  if (!request.body.data)
    return fs.unlink(file, async (err) =>
      res.send({
        err,
      })
    );
  const data = request.body.data.slice(
    request.body.data.indexOf(";base64,") + 8
  );
  if (!fs.existsSync(dir)) fs.mkdirSync(dir);
  fs.writeFile(file, data, "base64", async (error) => {
    await req.db("productImageInsert", [
      {
        product_id: productId,
        type: type,
        path: fileName,
      },
    ]);

    if (error) {
      res.send({
        error,
      });
    } else {
      res.send("ok");
    }
  });
});

app.get("/download/:productId/:fileName", (request, res) => {
  const { productId, type, fileName } = request.params;

  const filepath = `${__dirname}/uploads/${productId}/${fileName}`;
  res.header(
    "Content-Type",
    `image/${fileName.substring(fileName.lastIndexOf("."))}`
  );
  if (!fs.existsSync(filepath))
    res.send(404, {
      error: "Can not found file.",
    });
  else fs.createReadStream(filepath).pipe(res);
});

const { error } = require("console");

//:alias  라우터 정의해놓은거 없을 경우 이걸로.
//로그인 없이 가능
app.post("/api/:alias", async (request, res) => {
  // if(!request.session.email){
  //     return res.status(401).send({
  //         error: 'You need to login.'
  //     });
  // }
  try {
    res.send(await req.db(request.params.alias, request.body.param));
  } catch (err) {
    res.status(500).send({
      error: err,
    });
  }
});
//로그인한 사용자만 호출 할 수 있는
app.post("/apirole/:alias", async (request, res) => {
  if (!request.session.email) {
    return res.status(401).send({
      error: "You need to login.",
    });
  }
  try {
    res.send(await req.db(request.params.alias));
  } catch (err) {
    res.status(500).send({
      error: err,
    });
  }
});

const req = {
  async db(alias, param = [], where = "") {
    return new Promise((resolve, reject) =>
      dbPool.query(sql[alias].query + where, param, (error, rows) => {
        if (error) {
          if (error.code != "ER_DUP_ENTRY") console.log(error);
          resolve({
            error,
          });
        } else resolve(rows);
      })
    );
  },
};
