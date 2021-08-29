import * as klaw from 'klaw'
import * as fs from 'fs-extra'

export default class BaseLoader {
    protected dataDirectory: string

    public constructor(dataDirectory: string) {
        this.dataDirectory = dataDirectory
    }

    public async load(): Promise<void> {
        for await (const file of klaw(this.dataDirectory)) {
            // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
            await this.loadFile(file.path).catch((err) => console.error(err))
        }
    }

    protected async loadFile(file: string): Promise<void> {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        const data = await this.getFileData(file)
        await this.loadData(data)
    }

    protected async getFileData(file: string): Promise<any> {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        const data = await fs.readJSON(file)
        // eslint-disable-next-line @typescript-eslint/no-unsafe-return
        return data
    }

    // eslint-disable-next-line @typescript-eslint/require-await
    protected async loadData(data: any): Promise<void> {
        // pass, override in subclass
        console.log(data)
    }
}
