var jwt = require('jsonwebtoken');
const JWT_SECRET = "we@reperfect!"

const fetchuser = (req,res,next) =>{
    //Get user from JWT token & add ID to req object\
    const token = req.header('auth-token');
    if(!token){
        res.status(401).send({error:"Token authenticatiion error"});
    }
    try {
        const data = jwt.verify(token,JWT_SECRET);
        req.user = data.user;
        next();
    } catch (error) {
        res.status(401).send({error:"Token authenticatiion error"});
    }
}

module.exports =  fetchuser ;
