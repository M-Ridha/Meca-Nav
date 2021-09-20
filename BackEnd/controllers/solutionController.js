const Solution = require ('../models/SolutionSchema')
const cloudinary = require ('../helpers/cloudinary')



const addSolution = async (req,res) => {
    try {
        
        const {image,panne,description} = req.body
            
        const newSolution = new Solution ({
            image,
            panne,
            description
        })

        if (image) {
        
            const savedImage = await cloudinary.uploader.upload( image ,{
                timeout: 6000,  //time for upload picture 
                upload_preset:"ProjectPic"
            })
        
        
            newSolution.image= {
                url : savedImage.url,
                public_id: savedImage.public_id
            }    
        }
        const savedSolution = await newSolution.save()
        res.json (savedSolution)
    }

    catch (err) {
        res.status(400).json(  {errors:[{ msg:err.message }] } )
    }
}




const getALlSolution = async (req,res) => {
    try {
        const solutions = await Solution.find()
        res.json (solutions)
    }

    catch ( err) {
        res.status(400).json ({errors:[{ msg:err.message }] })
    }
}



const deleteSolution = async (req,res) => {
    try {
        const deletedSolution = await Solution.findByIdAndDelete(req.params.id)
        res.json (deletedSolution)
    }

    catch (err) {
        res.status(402).json({errors:[{ msg:err.message }] } )
    }
}





module.exports ={addSolution,getALlSolution,deleteSolution}