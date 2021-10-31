const nodemailer = require("nodemailer");
const config = require('./config/index')
    // async..await is not allowed in global scope, must use a wrapper
async function sendMail() {
    // Generate test SMTP service account from ethereal.email


    const transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        secure: true,
        port: 465,
        auth: {
            user: config.email.email,
            pass: config.email.pass
        }
    });

    // send mail with defined transport object
    let info = await transporter.sendMail({
        from: '26richardr@gmail.com', // sender address
        to: "26richardr@gmail.com", // list of receivers
        subject: "Hello ✔", // Subject line
        text: "Hello world?", // plain text body
        html: "<b>Hello world?</b>", // html body
    });

    console.log("Message sent: %s", info.messageId);
    // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

    // Preview only available when sending through an Ethereal account
    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
    // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
}
sendMail();