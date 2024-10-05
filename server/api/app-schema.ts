import dbClient from "../utils/db-client"

export default defineEventHandler(async (_event) => {
    
    const query = getQuery(_event)
    const event = query.event
    const type = query.type
    const key = query.key

    const teamCursor = await dbClient.db('security').collection('keys').findOne({ key: key })
    const team = teamCursor.team

    console.log({ team: team, event: event, type: type })
    const appSchema = await dbClient.db('schemas').collection('app').findOne({ team: team, event: event, type: type }, { projection: { _id: 0 } })
    const schema = {
        app: appSchema
    }
    console.log(schema)
    console.log(typeof appSchema)
    return schema;
})