import mongoose from 'mongoose'
import { config as envConfig } from 'dotenv'
envConfig()

const connection = ()=>{
    console.log(`connection string: -  ${process.env.HOST_DB}:${process.env.PORT_DB}/${process.env.NAME_DB}`)
    
    const options = {useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true}
    mongoose.connect(`mongodb://${process.env.HOST_DB}:${process.env.PORT_DB}/${process.env.NAME_DB}`, options)
    .then(()=>{
        console.log('Successfully connect to MongoDB')
    })
    .catch(err=>{ 
        console.error(`Connection to MongoDB error: ${err}`)
        process.exit()
    })
}

export default connection