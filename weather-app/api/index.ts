import axios from "axios"

const forecastEndpoint = ({city, days} : {city? : string, days? : string}) =>{
    return `https://api.weatherapi.com/v1/forecast.json?key=${process.env.WEATHER_API}&q=${city}&days=${days}&aqi=no&alerts=no`
}
const forecastSearch = ({city} : {city:string}) =>{
    return `https://api.weatherapi.com/v1/search.json?key=$${process.env.WEATHER_API}&q=${city}`
}

const apiCall = async (endpoint:any)=>{
    const options ={
        method : 'GET',
        url : endpoint
    }
    try{
        const resposne = await axios.request(options)
        console.log("this is repsosne ",resposne.data)
        return resposne.data
        
    }catch(e){
        console.log('The error is -->>',e)
        return null
    }

}

export const fetchWeatherForecast =({city , days} :{city : string, days : string})=>{
    return apiCall(forecastEndpoint({city, days}))
}

export const fetchLocation =({city}:{city:string})=>{
    console.log("inside foracast Location ", city   )
    return apiCall(forecastSearch({city : city}))
}