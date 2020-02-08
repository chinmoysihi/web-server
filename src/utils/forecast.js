const request = require('request')

const forecast = (latitude,longitude,callback) =>{
    // const nowTime = new Date().valueOf()
    // console.log(nowTime)
const url = 'https://api.darksky.net/forecast/3e054f3a948e0244b06fcad8d8ae71f7/'+encodeURIComponent(longitude)+","+encodeURIComponent(latitude)+'?units=si'

request({url,json:true},(error, {body})=>{
    console.log(new Date(body.daily.data[0].temperatureMaxTime))
    if(error)
    {
        callback("Unable to connect to weather service")
    }else if(body.error){
        callback('Unable to find Location')
    }else{
        console.log(body.daily.data[0])
        callback(undefined,body.daily.data[0].summary +" It is currently "+ 
                           body.currently.temperature +" degree temparature with "+ 
                           body.currently.precipProbability +"% possibility of rain. "+
                           "Maximum temparature of the day is "+ body.daily.data[0].temperatureMax +//+ " at "+ new Date(body.daily.data[0].temperatureMaxTime)+
                           "degree and Minimum temparature of the day is "+ body.daily.data[0].temperatureMin +" degree."//+ " at "+ new Date(body.daily.data[0].temperatureMinTime)
        )
    }
})
}



module.exports = forecast