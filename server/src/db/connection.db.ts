import mongoose from 'mongoose'
import { config as envConfig } from 'dotenv'
envConfig()

const connection = ()=>{
    console.log(`connection string: -  mongodb://localhost:27017/tasks`)
    
    const options = {useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true}
    mongoose.connect(`mongodb://localhost:27017/tasks`, options)
    .then(()=>{
        console.log('Successfully connect to MongoDB')
    })
    .catch(err=>{ 
        console.error(`Connection to MongoDB error: ${err}`)
        process.exit()
    })
}

export default connection