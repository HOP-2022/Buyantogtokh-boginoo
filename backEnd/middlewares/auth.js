const jwt = require("jsonwebtoken")
const SECRET_KEY = 'itssecretkey'

module.exports.auth = (req, res, next) => {
    try{
        let token = req.headers.authorization;
        if(token){
            token = token.split(' ')[1];
            let user = jwt.verify(token, SECRET_KEY)
            req.userId = user.id
            next()
        }else{
            res.status(401).json({message:"burtgelgui bn"})
        }
    }catch(error){
        console.log(error);
        res.status(401).json({message:"burtgelgui bn"})
    }
}