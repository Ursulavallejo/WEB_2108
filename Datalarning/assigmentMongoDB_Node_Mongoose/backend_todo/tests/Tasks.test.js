import Chai from 'chai'
import ChaiHTTP from 'chai-http'
import {describe, it as test} from 'mocha'
import app from '../src/Server.js'
import StatusCode from "../utils/StatusCode.js";


Chai.should()
Chai.use(ChaiHTTP)

let userId = ''

const newTask = {
    name: 'Magnus',
    task: 'go shopping'
}

const updatedTask = {
    name: 'Oliver',
    task: 'Play Minecraft'
}

const createTask = () => {
    describe('TESTING CREATE(POST) method for user entity', () => {
        test('Expecting a task to be created', (done) => {
            Chai.request(app)
                .post('/todo')
                .send(newTask)
                .end((error, response) => {
                    response.should.have.a.status(StatusCode.CREATED)
                    userId = response.body._id
                    response.body.should.be.an('object')
                    response.body.should.have.property('task').equal(newTask.task)
                    response.body.should.have.property('name').equal(newTask.name)
                    done()
                })
        })
    })
}

const getAllTasks = () => {
    describe('Fetching all tasks-todo(GET)', () => {
        test('Expecting to return all the tasks-todo', (done) => {
            Chai.request(app)
                .get('/todo')
                .end((error, response) => {
                    response.should.have.status(StatusCode.OK)
                    response.body.should.be.an('array')
                    response.body.length.should.be.equal(response.body.length)
                    done()
                })
        })
    })
}

const updateTaskId = () => {
    describe('Updating (PUT) a task in the database', () => {
        test('Expecting a task and user to be updated', (done) => {
            Chai.request(app)
                .put(`/todo/${userId}`)
                .send(updatedTask)
                .end((error, response) => {
                    response.should.have.a.status(StatusCode.ACCEPTED)
                    response.body.should.be.an('object')
                    response.body.should.have.property('_id').equal(userId)
                    response.body.should.have.property('task').equal(updatedTask.task)
                    response.body.should.have.property('name').equal(updatedTask.name)
                    done()
                })
        })
    })
}

const deleteTask = () => {
    describe('Deleting (DELETE) a task in the database', () => {
        test('Expecting a user to be deleted', (done) => {
            Chai.request(app)
                .delete(`/todo/${userId}`)
                .end((error, response) => {
                    response.should.have.status(StatusCode.OK)
                    done()
                })
        })
    })
}


describe('TESTING THE TASK_API ROUTE', () =>{
    createTask()
    getAllTasks()
    updateTaskId()
    deleteTask()

})
