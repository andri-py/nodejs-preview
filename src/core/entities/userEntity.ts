import { EnumType } from "typescript";

export interface UserEntityInterface {
    id: any
    name: string
    type: number
}


class UserEntity implements UserEntityInterface {
    id: any;
    name: string = '';
    type: number = 0;

    constructor(data: Record<string,any>) {
        this.id     = data.id
        this.name   = data.name
        this.type   = data.type ? data.type : 0
    }

}

export default {
    init: (data: any) => new UserEntity(data)
}