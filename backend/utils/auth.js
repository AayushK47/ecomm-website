const jwt = require('jsonwebtoken');

function getToken(payload){
    const token = jwt.sign(
        payload, 
        'super secret secret', 
        {expiresIn: '1d'}
    );

    return token;
}

function decodeToken(req, res, next) {
    try{
        let token = req.headers['authorization'];
        console.log(token);
        token = token.split(' ')[1];
        const decodedToken = jwt.verify(token, 'super secret secret');
        console.log(decodedToken);
        req.userId = decodedToken.id;
        next();
    } catch(err) {
        console.log(err);
        res.status(401).json({
            message: "Authorization Failed"
        })
    }
}

module.exports = {
    getToken,
    decodeToken
}