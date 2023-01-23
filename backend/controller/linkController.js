const LinkModel = require("../helper/model")
const isUrl = require("is-valid-http-url");



exports.createLink = async (request, response, next) => {
    const URL = await LinkModel.findOne({URL: request.body.URL});
    if(isUrl(request.body.URL) === true){
        if(URL){
            return response.status(201).json({data: URL})
        }
        const createLink = await LinkModel.create({...request.body})
            await LinkModel.findByIdAndUpdate(createLink.id, {
                shortURL: 'http://localhost:3000/links/' + createLink.id,
                userID: request.userId
            })
            response  
                .status(201)
                .json({message: `created`, data: createLink})
    }else{
        console.log('not url');
    }
};



exports.getLinks = async (request, response, next) => {
    try{
        const Links = await LinkModel.find({userID: request.userId});
        response.status(200).json({
            message: true,
            data: Links,
        });   
    } catch (error) {
        return response.status(400).json({message: error, data: null});

    }
};


exports.getLink = async (request, response, next) => {
    const {id}  = request.params
    try{
        const Links = await LinkModel.findById(id);
         response.status(200).json({
            message: true,
            data: Links,
        });   
    } catch (error) {
        return response.status(400).json({message: error, data: null});

    }
};





exports.deleteLink =  async (request, response, next) => {

    const {id} = request.params;
    try{
       const link= await LinkModel.findByIdAndDelete(id);
       response.status(200).json({message:"deleted", data: link})
    } catch (error) {
        return response.status(400).json({message: error, data: null});

    }
};