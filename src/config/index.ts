import * as path from 'path'
import arango from './arango'

const sourceRoot = path.join(__dirname, '../')
const appRoot = path.join(sourceRoot, '../')
const dataDirectory = path.join(appRoot, 'data')

const appPaths = {
    sourceRoot, appRoot, dataDirectory
}

export { arango, appPaths }
