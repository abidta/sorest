export const user=(req,res)=>{
    console.log(req.userId);
    res.json('logged a valid user')
}