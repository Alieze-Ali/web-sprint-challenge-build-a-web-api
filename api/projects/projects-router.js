// Write your "projects" router here!
const express = require('express');
const router = express.Router();
const Projects = require('./projects-model');


// MIDDLEWARE

// ROUTES

// `[GET] /api/projects`
// Returns an array of projects as the body of the response.
// If there are no projects it responds with an empty array.
// ??? How come the route localhost:4550/api/projects is not returning any projects???
router.get('/api/projects', (req, res) => {
    Projects.get()
    .then(projects => {
        res.status(200).json(projects);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({
            message: 'No projects could be found',
        });
    });
});


// `[GET] /api/projects/:id`
// Returns a project with the given `id` as the body of the response.
// If there is no project with the given `id` it responds with a status code 404.
router.get('/api/projects/:id', async (req, res) => {
    const { id } = req.params;
    try{
        const project = await Projects.get(id);
        if (!project){
            res.status(404).json({
                message: 'Thre is no project with the given id'
            });
        } else {
            res.status(200).json(project);
        }

    }catch (err) {
        res.status(500).json({
            Error: {err}
        });
    }

})


// `[POST] /api/projects`
// Returns the newly created project as the body of the response.
// If the request body is missing any of the required fields it responds with a status code 400.
// insert()
router.post('/api/projects', (req, res) => {
    const newProject = req.body;
    Projects.insert(newProject)
    .then(project => {
        res.status(200).json(newProject);
    })
    .catch(err => {
        console.log(err);
        res.status(400).json({
            message: 'Error adding the project'
        });
    });
});


// `[PUT] /api/projects/:id`
// Returns the updated project as the body of the response.
// If there is no project with the given `id` it responds with a status code 404.
// If the request body is missing any of the required fields it responds with a status code 400.


// `[DELETE] /api/projects/:id`
// Returns no response body.
// If there is no project with the given `id` it responds with a status code 404.


// `[GET] /api/projects/:id/actions`
// Returns an array of actions (could be empty) belonging to a project with the given `id`.
// If there is no project with the given `id` it responds with a status code 404.


module.exports = router;
