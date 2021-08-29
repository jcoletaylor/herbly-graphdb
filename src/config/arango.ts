import { Database } from 'arangojs'
import { IArangoConfig } from './types'
import * as dotenv from 'dotenv'
dotenv.config()

const arangoConfig: IArangoConfig = {
    url: process.env.ARANGO_URL,
    databaseName: process.env.ARANGO_DB,
    auth: {
        username: process.env.ARANGO_USERNAME,
        password: process.env.ARANGO_PASSWORD
    }
}

export const arango = new Database(arangoConfig)

export default arango
