import TaskModel from "../models/Task.model.js"
import StatusCode from "../../config/StatusCode.js"

const createTask = async (req, res) => {
    const user = new UserModel({
        username: req.body.username, password: req.body.password
    })
    try {
        const response = await user.save()
        res.status(StatusCode.CREATED).send(response)
    } catch (error) {
        res.status(StatusCode.INTERNAL_SERVER_ERROR).send({message: error.message})
    }
}

const getAllTasksUsers = async (req, res) => {
    try{
        const response = await UserModel.find()
        res.status(StatusCode.OK).send(response)
    } catch (error){
        res.status(StatusCode.INTERNAL_SERVER_ERROR).send({message: error.message})
    }

}

const getTaskWithId = async (req, res) =>{
    try {
        const response = await UserModel.findById(req.params.userId)
        res.status(StatusCode.OK).send(response)
    }catch (error){
        res.status(StatusCode.INTERNAL_SERVER_ERROR).send({
            message: 'Error occurred while trying to retrieve user with ID: ' + req.params.userId,
            error: error.message
        })
    }
}

const getTaskWithUsernameQuery = async (req, res) =>{
    try{
        const response = await UserModel.find({username: req.query.username})
        response.length !== 0
            ? res.status(StatusCode.OK).send(response)
            : res.status(StatusCode.NOT_FOUND).send({message:'Could not find user with username: ' + req.query.username })
    }catch (error) {
        res.status(StatusCode.INTERNAL_SERVER_ERROR).send({
            message: 'Error occurred while trying to retrieve user with username : ' + req.params.userId,
            error: error.message
        })
    }
}

const updateTask = async (req,res)=> {
    try{
        if(!req.body){return res.status(StatusCode.BAD_REQUEST).send({message: 'cannot update empty values'})}
        const response = await UserModel.findByIdAndUpdate(req.params.userId,{
            username: req.body.username,
            password: req.body.password
        },{new:true})
        res.status(StatusCode.OK).send(response)
    }catch (error) {
        res.status(StatusCode.INTERNAL_SERVER_ERROR).send({
            message: 'Error occurred while trying to update values of the user with ID : ' + req.params.userId,
            error: error.message
        })
    }
}

const deleteTask = async (req,res) =>{
    try{
        const response = await UserModel.findByIdAndDelete(req.params.userId)
        await UserModel.findByIdAndDelete(req.params.userId)
        res.status(StatusCode.OK).send({
            message: `Successfully deleted the USER with username: ${response.username}  and ID: ${req.params.userId}`
        })
    }catch (error){
        res.status(StatusCode.INTERNAL_SERVER_ERROR).send({
            message: 'Error occurred while trying to delete user with the ID:' + req.params.userId,
            error: error.message
        })
    }
}

export default {
    createTask,
    getAllTasksUsers,
    getTaskWithId,
    getTaskWithUsernameQuery,
    updateTask,
    deleteTask
}