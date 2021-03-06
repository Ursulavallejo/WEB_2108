import TaskModel from "../models/Task.model.js"
import StatusCode from "../../utils/StatusCode.js"

const createTask = async (req, res) => {
    const userTask = new TaskModel({
        task: req.body.task,
        name: req.body.name,
        done: req.body.done
    })
    try {
        const response = await userTask.save()
        res.status(StatusCode.CREATED).send(response)
    } catch (error) {
        res.status(StatusCode.BAD_REQUEST).send({
            error: 'Error creating user'
        })
    }
}

const getAllTasks = async (req, res) => {
    try {
        const response = await TaskModel.find()
        res.status(StatusCode.OK).send(response)
    } catch (error) {
        res.status(StatusCode.BAD_REQUEST).send({
            error: 'Error getting users'
        })
    }
}

const getTaskWithId = async (req, res) => {
    try {
        const response = await TaskModel.findById(req.params.userId)
        console.log(response.length)
        console.log(typeof response)
        res.status(StatusCode.OK).send(response)
    } catch (error) {
        res.status(StatusCode.OK).send([{
            message: `Error occurred as information do not exist trying to retrieve user with ID: ${req.params.userId}`
        }])
    }
}

const getTaskWithUsernameQuery = async (req, res) => {
    try {
        const response = await TaskModel.find({name: req.params.name})
        let messageNotFind = [{message: `Could not find user with username:"${req.params.name}" `}]
        response.length === 0
            ? res.status(StatusCode.OK).send(messageNotFind)
            : res.status(StatusCode.OK).send(response)
    } catch (error) {
        res.status(StatusCode.INTERNAL_SERVER_ERROR).send({
            error: 'Error occurred while trying to retrieve user with username : ' + req.params.userId,
        })
    }
}


const updateTaskID = async (req, res) => {
    try {
        const updatedTaskID = {
            task: req.body.task,
            name: req.body.name
        }
        TaskModel.findByIdAndUpdate(req.params.userId, updatedTaskID,
            {new: true},
            (error, task) => {
                if (error) {
                    res.status(StatusCode.BAD_REQUEST).send([{
                        message: `Could not find userTask with ID: ${req.params.userId}`
                    }])
                } else {
                    res.status(StatusCode.ACCEPTED).send(task ? task : [{
                        message: `Could not find userTask with ID: ${req.params.userId}!! `
                    }])
                }
            })
    } catch (error) {
        res.status(StatusCode.BAD_REQUEST).send({
            error: `Error updating task`
        })
    }
}


const deleteTask = async (req, res) => {
    try {
        const response = await TaskModel.findById(req.params.userId)
        TaskModel.findByIdAndRemove(req.params.userId, (error, task) => {
            if (error) {
                res.status(StatusCode.BAD_REQUEST).send({
                    error: `Error deleting task`
                })
            } else {
                res.status(StatusCode.OK).send(
                    task ?
                        `Successfully deleted the USER name "${response.name}" and with ID: ${req.params.userId} `
                        :
                        `Not able to find TaskUser with id: ${req.params.userId} `
                )
            }
        })
    } catch (error) {
        res.status(StatusCode.BAD_REQUEST).send({
            error: `Error deleting todo task`
        })
    }
}


const toggleTaskIsDone = (req, res) => {
    try {
        const {id} = req.params
        const {newTaskStatus} = req.body
        const returnUpdatedObject = {
            new: true
        }
        const Query = {
            done: newTaskStatus
        }
        TaskModel.findByIdAndUpdate(id, Query, returnUpdatedObject, (error, task) => {
            if (error) {
                res.status(StatusCode.BAD_REQUEST).send({
                    error: `Error changing task is done`
                })
            } else {
                res.status(StatusCode.OK).send(task.done)
            }
        })
    } catch (error) {
        res.status(StatusCode.BAD_REQUEST).send({
            error: `Error updating a task is done`
        })
    }
}

export default {
    createTask,
    getAllTasks,
    getTaskWithId,
    getTaskWithUsernameQuery,
    updateTaskID,
    deleteTask,
    toggleTaskIsDone
}