import * as path from 'path'
import * as config from '../config'

import HerbLoader from './HerbLoader'
import FormulaLoader from './FormulaLoader'

export default class MainLoader {
    protected herbLoader: HerbLoader
    protected formulaLoader: FormulaLoader

    public constructor() {
        this.herbLoader = new HerbLoader(path.join(config.appPaths.dataDirectory, 'herbs'))
        this.formulaLoader = new FormulaLoader(path.join(config.appPaths.dataDirectory, 'formulas'))
    }

    public async load(): Promise<void> {
        await this.herbLoader.load()
        await this.formulaLoader.load()
    }
}
