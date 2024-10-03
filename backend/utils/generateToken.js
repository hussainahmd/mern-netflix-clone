import jwt from 'jsonwebtoken'
import { ENV_VARS } from '../config/envVars.js'

export function generateTokenAndSetCookie(userId, res) {

    const token = jwt.sign({userId}, ENV_VARS.JWT_SECRET, {expiresIn: '15d'})

    res.cookie('jwt-netflix', token, {
        maxAge: 15 * 24 * 60 * 60 * 1000, // 15 days in milliseconds
        httpOnly: true, //prevent cookie from being accessed by client side scripts / only accessible on server side by browser
        sameSite:'strict', //crsf attacks cross site request forgery attacks
        
        //only secure cookies are sent over https
        secure: ENV_VARS.NODE_ENV !== 'development' //if not in development mode, secure is true
    })

    return token
}
