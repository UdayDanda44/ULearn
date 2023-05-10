var jwt = require('jsonwebtoken')
const JWT_SECRET = "Harryisafreak$@"
const fetchUser = (req,res,next)=>{
    const token = req.header('auth-token');
    if(!token){
        res.status(401).json({error:"please use a vaild token"})
    }
    try {
        const string = jwt.verify(token,JWT_SECRET);
        req.user = string.user;
        next()
    } catch (err) {
      res.status(401).json("please use a valid token")
    }

}

module.exports = fetchUser;