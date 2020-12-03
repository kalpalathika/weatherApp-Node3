const express = require('express')
const path = require('path')
const hbs = require('hbs')
const forecast = require('./forecast')
const geocode = require('./geocode')


const app = express()
const port = process.env.PORT || 3000


const publicDirectory = path.join(__dirname,'../public')
const viewsDirectory = path.join(__dirname,'../templates/views')
const partialsDirectory = path.join(__dirname,'../templates/partials')



app.use(express.static(publicDirectory))

app.set('view engine','hbs')
app.set('views',viewsDirectory)
hbs.registerPartials(partialsDirectory)



app.get('',(req,res)=>
{
    res.render('index',{
        title: 'Weather',
        name: 'Kalp'
    })
})


app.get('/about',(req,res)=>
{
    res.render('about',{
        title: 'About',
        name: 'Kalp'
    })
})


app.get('/help',(req,res)=>
{
    res.render('help',{
        helpText: 'This is some help text',
        title: 'Help',
        name: 'Kalp'
    })
})
// app.get('/about',(req,res)=>{
//     res.send('<h1>This is the about page!!<h1>')

// })

app.get('/weather',(req,res)=>{
    
    if(!req.query.address){
        return res.send({
            error: 'No address location was provided.'
        })
    }
    
        geocode(req.query.address, (error, {latitude,longitude,location}={}) => {
            if (error){
                return res.send({error})
            }
           forecast(latitude,longitude,(error,forecastData)=>{
               if(error){
                   return res.send({error})
 
                }
                res.send({
                    forecast: forecastData,
                    location,
                    address: req.query.address

                })
           })
              })
        }
        // forecast:'50 deg',
        // location:'India'
)

app.get('/help/4*',(req,res)=>{
    res.render('404',{
        title:'404',
        name: 'Kalp',
        errorMessage: 'Page not found.'
    })
})



app.get('*',(req,res)=>{
    res.render('404',{
        title:'404',
        name: 'Kalp',
        errorMessage: 'Page not found.'
    })
})


app.listen(3000,()=>{
    console.log('server is up and running on port' + port)
})