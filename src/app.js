const express = require("express")
const app  = express()

const users = [{
    name: "John",
    kidneys : [{
        healthy : false
    },{
        healthy : true
    }]
}]

app.get("/",(req,res)=>{
    const johnKidneys = users[0].kidneys
    const numberOfKidneys = johnKidneys.length
    let numberOfHealthyKidneys = 0
    for(let i = 0 ; i<numberOfKidneys ; i++){
        if(johnKidneys[i].healthy === true){
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