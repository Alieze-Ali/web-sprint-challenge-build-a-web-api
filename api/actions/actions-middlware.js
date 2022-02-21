// add middlewares here related to actions
const Actions = require('./actions-model');

const validateActionId = async (req, res, next) => {
    try {
        // const actionId = req.params.id;
        // const action = await Actions.getById(actionId);
        const action = await Actions.get(req.params.id);
        if(!action){
            //res.status(404).json([]);
            res.status(404).json({
                message: 'No actions were found with that id.'
            })
        } else {
            req.action = action;
            next();
        }
    } catch(err) {
        res.status(500).json({
            message: 'Problem finding action'
              });
    }
};

const validateAction = (req, res, next) => {
    const newAction = req.body
    if(!newAction.project_id || !newAction.description || !newAction.notes){
        res.status(400).json({ 
            message: 'missing required fields'
        })
    } else {
        next()
    }
}
module.exports = {
    validateActionId,
    validateAction
};