/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { arango } from '../config'
import BaseLoader from './BaseLoader'

export default class HerbLoader extends BaseLoader {
    protected async loadData(data: any): Promise<void> {
        await this.createCategory(data)
        await this.createHerb(data)
    }

    protected async createHerb(data: any): Promise<any> {
        const { herb, names: { pinyin, hanzi, latin, pharmaceuticalLatin, commonEnglish }} = data
        const options = { pinyin, hanzi, latin, pharmaceuticalLatin, commonEnglish }

        const herbExists = await arango.collection('herbs').documentExists(herb)

        if (herbExists) {
            await arango.collection('herbs').update(herb, options)
        } else {
            await arango.collection('herbs').save({ _key: herb, ...options })
        }
    }

    protected async createCategory(data: any): Promise<void> {
        const categoryName: string = data.category ? data.category : 'unknown'
        const key = encodeURIComponent(Buffer.from(categoryName).toString('base64'))
        const categoryExists = await arango.collection('herb_categories').documentExists(key)
        if (!categoryExists) {
            await arango.collection('herb_categories').save({
                _key: key,
                name: categoryName
            }).catch((_err) => {
                // pass console.error(err)
                // stupid document dbs aren't acid compliant so sometimes it's been saved already
            })
        }
    }
}
