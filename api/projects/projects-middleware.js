// add middlewares here related to projects
const Projects = require('./projects-model');

const validateProjectId = async (req, res, next) => {
    try{
        const { id } = req.params;
        console.log(id)
        const project = await Projects.get(id);
        console.log('This is the', project)
        if(!project){
            res.status(404).json([]);
        }else{
            req.project = project;
            next();
        }
    }catch(err){
        res.status(500).json({message: err.message })
    }
}

const validateProject = (req, res, next) => {
    // const newProject = req.body;
    const { name, description, completed } = req.body;
    if(!name || !description || !completed){
        res.status(400).json({message: 'missing required fields'})
    } else {
        next();
    }
}

module.exports={
    validateProjectId, 
    validateProject
}
