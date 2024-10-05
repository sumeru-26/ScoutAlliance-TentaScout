import { MongoClient } from 'mongodb'

const config = useRuntimeConfig()
console.log(config.mongodbUri)
const client = new MongoClient(config.mongodbUri)

export default client