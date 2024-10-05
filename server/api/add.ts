import dbClient from "../utils/db-client"

export default defineEventHandler(async (event) => {

    const query = getQuery(event)
    const team = query.team

    const data = await readBody(event)

    dbClient.db('entries').collection(String(team)).insertOne(data)

})