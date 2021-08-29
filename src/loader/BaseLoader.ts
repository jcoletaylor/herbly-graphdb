/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { arango } from '../config'
import * as klaw from 'klaw'
import * as fs from 'fs-extra'
import { EDGE_COLLECTIONS, VERTEX_COLLECTIONS } from './CollectionNames'
import { CollectionMetadata } from 'arangojs/collection'
import { CollectionType } from 'arangojs'
export default class BaseLoader {
    protected dataDirectory: string

    public constructor(dataDirectory: string) {
        this.dataDirectory = dataDirectory
    }

    public async load(): Promise<void> {
        await this.initialize()
        for await (const file of klaw(this.dataDirectory)) {
            if (file.stats.isFile()) {
                await this.loadFile(file.path).catch((err) => console.error(err))
            }
        }
    }

    protected async loadFile(file: string): Promise<void> {
        const data = await this.getFileData(file)
        await this.loadData(data)
    }

    protected async getFileData(file: string): Promise<any> {
        const data = await fs.readJSON(file)
        return data
    }

    // eslint-disable-next-line @typescript-eslint/require-await
    protected async loadData(_data: any): Promise<void> {
        // pass, override in subclass
        // console.log(data)
    }

    private async initialize(): Promise<void> {
        const existingCollections: CollectionMetadata[] = await arango.listCollections()
        const existingVertexCollections: string[] = existingCollections
            .filter((c) => c.type === CollectionType.DOCUMENT_COLLECTION)
            .map((c) => c.name)
        const existingEdgeCollections: string[] = existingCollections
            .filter((c) => c.type === CollectionType.EDGE_COLLECTION)
            .map((c) => c.name)
        for (const collection of VERTEX_COLLECTIONS) {
            if (!existingVertexCollections.includes(collection)) {
                await arango.createCollection(collection)
            }
        }
        for (const collection of EDGE_COLLECTIONS) {
            if (!existingEdgeCollections.includes(collection)) {
                await arango.createEdgeCollection(collection)
            }
        }
    }
}
