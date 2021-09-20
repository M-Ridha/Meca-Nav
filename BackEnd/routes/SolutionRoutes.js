const router = require ('express').Router();
const solutionController = require ('../controllers/solutionController');
const { tokenMiddleware, adminMiddleware } = require('../middlewares/tokenMiddleware');


router.post('/addSolution',tokenMiddleware,adminMiddleware,solutionController.addSolution)
router.get('/getSolution',tokenMiddleware,solutionController.getALlSolution )
router.delete('/deleteSolution/:id',tokenMiddleware,adminMiddleware,solutionController.deleteSolution)


module.exports=router