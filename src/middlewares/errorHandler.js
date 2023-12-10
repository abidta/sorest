export const errorHandler = (err,req,res,next)=>{
    console.log(err)
    res.status(err.status||500).send(err)
}