const express = require('express')

// Initialize the express application
const app = express()
// Routing

app.get('/', (req,res)=>{
    res.send('Hello World!')
})
app.get('/ecommerce', (req,res)=>{
    res.send('Ecommerce')
})
// npm run dev
app.get('/blog', (req,res)=>{
    res.send('Blog')
})


app.listen(4000, () =>{
    console.log('Server is running on port 4000')
})