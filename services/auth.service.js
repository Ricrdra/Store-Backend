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

    async sendRecovery(email) {
        const user = await service.findByMail(email);



        if (!user) {
            //return error and it wont be authenticated
            throw boom.unauthorized();
        }
        const payload = {
            sub: user.id,
        }
        const token = await jwt.sign(payload, config.auth.jwtSecret, { expiresIn: '15min' });
        const link = `https://front.com/recovery?token=${token}`

        service.update(user.id, { recoveryToken: token });
        const mail = {
            from: '26richardr@gmail.com', // sender address
            to: email, // list of receivers
            subject: "Password Restore", // Subject line
            text: "Hello world?", // plain text body
            html: `<b>Click on link to reset password <a>${link}</a></b>`, //, // html body
        }
        await this.sendMail(mail);
    }

    async sendMail(infoMail) {
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
        await transporter.sendMail(infoMail);

        return { message: 'Mail successfully sent' }
    }

    async changePassword(token, password) {
        try {
            const payload = await jwt.verify(token, config.auth.jwtSecret);
            const user = await service.findOne(payload.sub);
            if (!user || user.recoveryToken !== token) {
                throw boom.unauthorized();
            }

            const hash = await bcrypt.hashSync(password, 10);
            await service.update(user.id, { password: hash, recoveryToken: null });
            return { message: 'Password successfully changed' };
        } catch (err) {
            throw boom.unauthorized();
        }
    }


}


module.exports = AuthService;