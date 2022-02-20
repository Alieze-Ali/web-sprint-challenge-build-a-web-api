// Write your "actions" router here!
const express = require('express');
const router = express.Router();
const Actions = require('./actions-model');

// MIDDLEWARE

// ENDPOINTS
// `[GET] /api/actions` - PRETTY MUCH SAME
// Returns an array of actions (or an empty array) as the body of the response.
router.get('/api/actions', (req, res) => {
    Actions.get()
    .then(actions => {
        res.status(200).json(actions);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({
            message: 'No actions could be found',
        });
    });
});


// `[GET] /api/actions/:id` - SAME
// Returns an action with the given `id` as the body of the response.
// If there is no action with the given `id` it responds with a status code 404.
router.get('/api/actions/:id', async (req, res) => {
    const { id } = req.params;
    try{
        const action = await Actions.get(id);
        if (!action){
            res.status(404).json({
                message: 'Thre is no action with the given id'
            });
        } else {
            res.status(200).json(action);
        }

    }catch (err) {
        res.status(500).json({
            Error: {err}
        });
    }

})


// `[POST] /api/actions` - SLIGHTLY DIFFERENT
// Returns the newly created action as the body of the response.
// If the request body is missing any of the required fields it responds with a status code 400.
// When adding an action make sure the `project_id` provided belongs to an existing `project`. - this last part is slightly different


// `[PUT] /api/actions/:id` - SAME
// Returns the updated action as the body of the response.
// If there is no action with the given `id` it responds with a status code 404.
// If the request body is missing any of the required fields it responds with a status code 400.
router.put('/api/actions/:id', (req,res) => {
    const id = req.params.id;
    const changes = req.body;
    if (!changes) {
        res.status(400).json({
            message: 'All fields required.'
        })
    } else {
        Actions.update(id, changes)
        .then((updateRes) => {
          console.log('updateResponse', updateRes) 
          if (!updateRes) {
              res.status(404).json({ message: `Action id ${id} not found`})
          } else {
              res.status(200).json(updateRes);
          }
      })
        .catch((err) => {
            console.log(err)
            res.status(400).json({
                 message: 'Unable to update action.'
            });
        })
    }
  });

// `[DELETE] /api/actions/:id` - SAME
// Returns no response body.
// If there is no action with the given `id` it responds with a status code 404.


module.exports = router;