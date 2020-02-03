const request = require('request')

const forecast = (latitude,longitude,callback) =>{
const url = 'https://api.darksky.net/forecast/3e054f3a948e0244b06fcad8d8ae71f7/'+encodeURIComponent(longitude)+","+encodeURIComponent(latitude)

request({url,json:true},(error, {body})=>{
    if(error)
    {
        callback("Unable to connect to weather service")
    }else if(body.error){
        callback('Unable to find Location')
    }else{
        callback(undefined,{
            summary:body.daily.data[0].summary,
            temparature:body.currently.temperature,
            rainPossibility:body.currently.precipProbability
        })
    }
})
}



module.exports = forecast