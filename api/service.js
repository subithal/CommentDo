const mongoose = require('mongoose');
var {models} = require('./Models');



async function addComment({parentId, author, text}){
    try{
        var document = new models.Comment ({
            parent_id: parentId ? mongoose.Types.ObjectId(parentId) : parentId,
            author: author,
            text: text
        });
        var data =  await document.save();
        return [null,data]
    }
    catch(err){
        return [err];
    }
}



async function getAllComments(){
    try {
        var data =  await models.Comment.
                find().
                sort({'full_slug': -1} ).
                exec();
        return [null,data];
    }
    catch(err){
        return [err];
    }
}

async function deleteComment(obj){
    const pattern =  obj.full_slug ;
    try {
        var data =  await models.Comment.
                deleteMany({"full_slug": new RegExp(pattern,"g") }).
                exec();
        return [null,data];
    }
    catch(err){
        return [err];
    }
}

async function updateComment(obj){
    try {
        var data =  await models.Comment.
                findByIdAndUpdate(obj._id,obj,{new: true}).
                exec();
        return [null,data];
    }
    catch(err){
        return [err];
    }
}



module.exports = {
    addComment,
    getAllComments,
    deleteComment,
    updateComment
};