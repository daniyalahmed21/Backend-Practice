const express = require("express")
const app  = express()

const users = [{
    name: "John",
    kidneys : [{
        healthy : false
    }]
}]

app.use(express.json())

//delete all unhealthy kidneys
app.delete("/",(req,res)=>{
    let newKidneys = []
    for(let i = 0; i<users[0].kidneys.length;i++){
        if(users[0].kidneys[i].healthy){
            users[0].kidneys.push(users[0].kidneys[i])
        }
    }
    users[0].kidneys=newKidneys
    res.send("Unhealthy kidneys Deleted ...")
})


//make all kidneys healthy
app.put("/",(req,res)=>{
    for(let i=0;i<users[0].kidneys.length;i++){
        users[0].kidneys[i].healthy = true
    }
    res.send("Done ...")
})

//add healthy kidneys
app.post("/",(req,res)=>{
   const isHealthy =  req.body.isHealthy
   users[0].kidneys.push({
    healthy:isHealthy
   })
   res.send("Kidney added")
})

//fetch all kidneys data
app.get("/",(req,res)=>{
    const johnKidneys = users[0].kidneys
    const numberOfKidneys = johnKidneys.length
    let numberOfHealthyKidneys = 0
    for(let i = 0 ; i<numberOfKidneys ; i++){
        if(johnKidneys[i].healthy == true){
            numberOfHealthyKidneys++;
        }
    }
    const numberOfUnhealthyKidneys = numberOfKidneys - numberOfHealthyKidneys

    res.json({
        numberOfKidneys,
        numberOfHealthyKidneys,
        numberOfUnhealthyKidneys
    })
})



app.listen(3000)