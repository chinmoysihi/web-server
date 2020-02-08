
const express = require('express')
const path = require('path')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()

//Define paths for Express config
const publicDirectoryPath = path.join(__dirname,'../public')
const viewPath = path.join(__dirname,'../templates/views')
const partialPath = path.join(__dirname,'../templates/partials')


// Setup handlebars engine and views location
app.set('view engine','hbs')
app.set('views',viewPath)
hbs.registerPartials(partialPath)

//Setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('/weather',(req,res)=>{
    if(!req.query.address){
        return res.send({
            error:'You must provide Address'
        })
    }
    else{
        geocode(req.query.address,(error,{latitude,longitude,location} = {})=>{
            if(error){
                return res.send({
                    error: error
                })
            }
        
            forecast(latitude,longitude, (error, forecastData) => {
                if(error){
                    return res.send({
                        error:error
                    })
                }
                res.send({
                    forecast:forecastData,
                    location,
                    address:req.query.address
                })
              })
        })
    }
})

//Landing page here
app.get('',(req,res)=>{
    res.render('index',{
        title:'Weather',
        name:'Chinmoy'
    })
})



//About page
app.get('/about',(req, res)=>{
    res.render('about',{
        title:'About',
        name:'Chinmoy'
    })
})

app.get('/help',(req,res)=>{
    res.render('help',{
        title:'Help',
        body:'Please go to the home page to get extra details'
    })
})



//
app.get('/products',(req,res)=>{
    if(!req.query.search){
        return res.send({
            error:'You must provide a search term'
        })
    }

    console.log(req.query.search)
    res.send({
        products:{} 
    })
})



app.get('/help/*',(req,res)=>{
    res.render('404',{
        title:'404',
        name:'Chinmoy',
        errorMessage:'Help article not found'
    })
})

//404 page
app.get('*',(req,res)=>{
    res.render('404',{
        title:'404',
        name:'Chinmoy',
        errorMessage:'Page Not Found'
    })
})


app.listen(3000,()=> {
    console.log('Server is up on port 3000')
})