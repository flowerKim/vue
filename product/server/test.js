const nodemailer = require('nodemailer');
const email = {
    host: "sandbox.smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: "19b3237d59f5e5",
      pass: "29c844618dbc6e"
    }
  };


const send = async (option) => {
    nodemailer.createTransport(email).sendMail(option,(error, info)=>{
        if(error){
            console.log(error);
        }else{
            console.log(info);
            return info.response;
        }
    })
}

let email_data = {
    from : 'ggg3374@gmail.com',
    to : 'ggg3374@gmail.com',
    subject : 'test입니다.',
    text : 'nodejs 한시간만에 끝내보자.'
}

send(email_data);