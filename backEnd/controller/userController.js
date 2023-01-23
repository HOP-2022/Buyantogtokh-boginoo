const UserModel = require("../helper/userModel")
const SECRET_KEY = 'itssecretkey'
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")

exports.createUser = async (req, res ,next ) => {
    try{
        const { password,  email} = req.body
        const existingUser = await UserModel.findOne({ email : email})
        if(existingUser){
            return res.status(409).json({message : "burtgeltei hereglegc bn"})
        }
        const hashedPassword = await bcrypt.hash(password, 10)
        const createUser = await UserModel.create({
            email: email,
            password: hashedPassword,
        })
        const token = jwt.sign({email: createUser.email, id: createUser._id}, SECRET_KEY)

        res.status(200).json({
            message: 'created',
            data: createUser,
            token: token
            //   message: created
            //   data: {
            //    _id: hjh32jk
            //    email: sasfsa@mail.com
            //    password: sfnalafr3rfegregbhebr
            //   },
            //   token: "gfsdgjdgjkh34kjh43kjh342ihrtkjhk4htjkjtkl43tjk4tjkl" 
            // 
            //
            //
        })   
    }catch(error) {
        return res.status(500).json({message: error, data: null});

    }
}

exports.login = async (req, res , next) => {
    try{
        const { password,  email} = req.body
        const existingEmail = await UserModel.findOne({email: email})
        if(!existingEmail){
            return res.status(409).json({message : "burtgelgui hereglegc bn"})
        }
        const isValid = await bcrypt.compare(password, existingEmail.password)
        if(!isValid){
            return res.status(409).json({message : "nuuts ug buruu bn"})
        }
        const token = jwt.sign({email: existingEmail.email, id: existingEmail._id}, SECRET_KEY)
         res.status(200).json({
                success: true,
                data: existingEmail,
                token: token,
        })
    }catch(error){
        return res.status(500).json({message: error, data: null});
    }
}

exports.getUsers = async ( req, res, next) => {
    try{
        const getUsers = await UserModel.find()
        res.status(200).json({
            message:true,
            data: getUsers,
        });
    }catch(error){
        return res.status(400).json({message:error, data: null});
    }
}

exports.getUser = async (req, res , next) => {
    const {id} = req.params
    try{
        const getUser = await UserModel.findById(id)
        res.status(200).json({
            message:true,
            data: getUser
        })   
    }catch(error){
        return res.status(400).json({message:error, data: null});
    }
}


exports.deleteUser = async (req, res, next) => {
    const {id} = req.params
    try{
        const deleteUser = await UserModel.findByIdAndDelete(id)
        res.status(200).json({
            message:"deleted"
        })
    }catch(error){
        return res.status(400).json({message:error, data:null})
    }
}

exports.updateUser = async (req, res, next) => {
    const {id} = req.params
    try{
        const updateUser = await UserModel.findByIdAndUpdate(id, {...req.body})
        res.status(200).json({
            message:"updated"
        })
    }catch(error){
         return res.status(400).json({message:error, data:null})
    }
}