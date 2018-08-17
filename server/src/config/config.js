module.exports = {
    port: process.env.PORT || '8081',
    db: {
        database: process.env.DB_NAME || 'seminar_invitation', 
        user: process.env.DB_USER || 'root',
        password: process.env.DB_PASSWORD || '',
        options: {
            dialect: process.env.DIALECT || 'mysql',
            host: process.env.HOST || '127.0.0.1',
            port: process.env.PORT || '3306'
        }
    },
    authentication: {
        jwtSecret: process.env.JWT_SECRET || 'secret'
    }
}