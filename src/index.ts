// const express = require('express') // CJS CommonJS  -> Don't use anymore
import server from './server'
const port = process.env.PORT || 4000

// Routing




server.listen(port, () =>{
    console.log('Server is running on port', port)
})