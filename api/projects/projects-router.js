// Write your "projects" router here!
const express = require('express');
const router = express.Router();
const Projects = require('./projects-model');


// MIDDLEWARE

// ROUTES

// `[GET] /api/projects`
// Returns an array of projects as the body of the response.
// If there are no projects it responds with an empty array.
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

module.exports = router;
