import { MainLoader } from './loader'

const main = async (): Promise<void> => {
    const loader = new MainLoader()
    await loader.load()
}

void main()
