export interface IArangoConfig {
    url: string
    databaseName: string
    auth: {
        username: string
        password: string
    }
}
