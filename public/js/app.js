// import { response } from "express"
// const geocode = require('./utils/geocode')
// const forecast = require('./utils/forecast')


console.log('Client side javascript file is here')

const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')


weatherForm.addEventListener('submit', (e)=>{
    e.preventDefault()

    const location = search.value
    console.log(location)

    messageOne.textContent = 'Loading ...'
    messageTwo.textContent = ''
    var url =  'http://localhost:3000/weather?address='+location;
    
    fetch(url).then((response) => {
        // console.log(response.json())
        response.json().then((data) => {
            console.log(data)
            if(data.error){
                messageOne.textContent = data.error
                console.log(1)
                console.log(data.error)
            }else{
                messageOne.textContent = data.location
                messageTwo.textContent = data.forecast.summary +' with '+data.forecast.temparature+' degree of temparature '
                console.log(data.location)
                console.log(data.forecast)
            }
        })
    })

    // console.log(location)
    // const returnData = geocode(location)
    // console.log(returnData)
})


// fetch('http://puzzle.mead.io/puzzle').then((response) =>{
//     response.json().then((data) =>{
//         console.log(data)
//     })
// })