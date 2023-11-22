import express from 'express'

const router= express.Router().use('/',()=>{
    console.log('test done');
})
export default router