const jwt = require('jsonwebtoken');




const check_user = (req, res, next) => {
    let token = req.headers['authorization']?.split(' ')[1];
    if(token) {
        jwt.verify(token, 'secret', (err, decoded)=>{
           if(err){
            return res.status(401).json({success: false, message: 'invalid token'});
             //  next();
           }
           else {
               req.role = decoded.role;
            next();
           }
            
        });
    }
    else {
        return res.status(403).json({success: false, message: 'token not provided'});
    }
};



module.exports = check_user;