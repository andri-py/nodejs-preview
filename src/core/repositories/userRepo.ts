import { UserEntityInterface } from '../entities/userEntity'

class UserRepo {
    connection: any

    constructor(connection: any) {
        this.connection = connection
    }

    async detailProfileBy(field: string, value: any) {
        const query = `where ${field}=${value}`
        let result = await this.connection.query(`select * from users ${query} limit 1`)

        return result ? result[0] : null
    }

    async storeProfile(data: UserEntityInterface) {
        const query = `insert into users (name, type) values('${data.name}', ${data.type})`
        let result = await this.connection.query(query)

        return result ? result[0] : null
    }
    
    async deleteProfileBy(field:string, value: any) {
        const query = `delete from users where ${field}=${value}`;
        let result = await this.connection.query(query)

        return result ? result[0] : null
    }

    async updateProfile(entity: UserEntityInterface, data: Record<string,any>) {
        if (data.name) entity.name = data.name
        if (data.type) entity.type = data.type
        
        const query = `update users set name='${entity.name}', type=${entity.type} where id=${entity.id}`
        let result = await this.connection.query(query)
        
        return result ? true : false
    }
 
}
export default {
    init: (params: any) => new UserRepo(params)
}