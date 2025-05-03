const express = require("express")
const app = express()

//express is a series of middleware even the last route handler is also a middleware technically even though it is not in the middle


let requestCount = 0

//global middleware run before any request and act as checker that let only 18+ people to proceed further
function isOldEnoughMiddleware (req,res,next){
    requestCount++
    console.log(`Number of Request : ${requestCount}`)
    const age = req.query.age 
    if(age>18){
        next()
    }
    else{
        res.send("Sorry your are not of age yet")
    }
}

app.use(isOldEnoughMiddleware)

app.get("/ride1",(req,res)=>{
    res.send("You have ridden ride 1")
})


app.get("/ride2",(req,res)=>{
    res.send("You have ridden ride 2")
})

app.listen(3000)