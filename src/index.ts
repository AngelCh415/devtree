// const express = require('express') // CJS CommonJS  -> Don't use anymore
import colors from 'colors'
import server from './server'
const port = process.env.PORT || 4000

// Routing




server.listen(port, () =>{
    console.log(colors.magenta.italic('Server is running on port'), port)
})