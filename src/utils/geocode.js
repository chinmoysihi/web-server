const request = require('request')

const geocode = (address,callback)=>{
    const geoCodeUrl = "https://api.mapbox.com/geocoding/v5/mapbox.places/"+encodeURIComponent(address)+".json?access_token=pk.eyJ1IjoiY2hpbm1veXNpaGkiLCJhIjoiY2s1eTNlMHU0MGdhMjNsbmplOTF1ODEwaCJ9.cxd4JXZN0Gem_1kFRq11gg"

    request({url:geoCodeUrl,json:true},(error,response) => {
        if(error){
            callback("Unable to connect the location services")
        }else if(response.body.length === 0){
            callback("Unable to find location. Try another search")
        }else{
            callback(undefined,{
                latitude : response.body.features[0].center[0],
                longitude : response.body.features[0].center[1],
                location : response.body.features[0].place_name
            })
        }
    })
}

module.exports = geocode