// add middlewares here related to projects
const projects = require('./projects-model');

const validateProjectId = async (res, req, next) => {
    try{
        const projectId = req.params.id;
        console.log(projectId)
        const project = await projects.getById(projectId);
        
        if(!project){
            res.status(404).json([]);
        }else{
            req.project = project;
            next();
        }
    }catch(err){
        res.status(500).json({message: 'Error'})
    }
}

const validateProject = (req, res, next) => {
    const newProject = req.body
    if(!newProject.name || !newProject.description){
        res.status(400).json({message: 'missing required fields'})
    }else{
        next();
    }
}

module.exports={
    validateProjectId, 
    validateProject
}
