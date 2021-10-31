const UserService = require('./user.service');
const service = new UserService();

const boom = require('@hapi/boom')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const config = require('../config/index');
const nodemailer = require("nodemailer");

class AuthService {

    async getUser(email, password) {
        const user = await service.findByMail(email);

        if (!user) {
            //return error and it wont be authenticated
            throw boom.unauthorized();
        }
        //Using bcrypt to compare the password with the hash
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            throw boom.unauthorized()
        }
        delete user.dataValues.password;
        return user;
    }
    async signToken(user) {
        const payload = {
            sub: user.id,
            role: user.role
        }

        const token = await jwt.sign(payload, config.auth.jwtSecret);
        return token;
    }
    async sendMail(email) {
        const user = await service.findByMail(email);

        if (!user) {
            //return error and it wont be authenticated
            throw boom.unauthorized();
        }

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
        await transporter.sendMail({
            from: '26richardr@gmail.com', // sender address
            to: email, // list of receivers
            subject: "Hello ✔", // Subject line
            text: "Hello world?", // plain text body
            html: "<b>Hello world?</b>", // html body
        });

        return { message: 'Mail successfully sent' }
    }

}


module.exports = AuthService;