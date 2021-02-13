import mysql from 'mysql'

class Database {
    async query(query: string) {
        const connection = mysql.createConnection('mysql://root:admin@127.0.0.1:33062/app?debug=false')
        
        let result = await new Promise((resolve, reject) => {
            connection.query(query, (errors: any, results: any, fields: any) => {
                if (results) return resolve(results)
                return reject(errors)
            })
        })

        connection.end()
        return result
    }
}

export default Database