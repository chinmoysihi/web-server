
const express = require('express')
const path = require('path')

const app = express()

//Define paths for Express config
const publicDirectoryPath = path.join(__dirname,'../public')
const viewPath = path.join(__dirname,'../templates')

// Setup handlebars engine and views location
app.set('view engine','hbs')
app.set('views',viewPath)

//Setup static directory to serve
app.use(express.static(publicDirectoryPath))



//Landing page here
app.get('',(req,res)=>{
    res.render('index',{
        title:'Weather App',
        name:'Chinmoy'
    })
})


// app.get('/help',(req, res)=>{
//     res.send(help.html)
// })

app.get('/about',(req, res)=>{
    res.render('about',{
        title:'About Myself',
        name:'Chinmoy'
    })
})

app.get('/help',(req,res)=>{
    res.render('help',{
        body:'Please go to the home page to get extra details'
    })
})
app.get('/weather',(req,res)=>{
    res.send({
        forecast:'It is hot',
        location:'Bangaluru'
    })
})
//app.com
// app.com/help

app.listen(3000,()=> {
    console.log('Server is up on port 3000')
})