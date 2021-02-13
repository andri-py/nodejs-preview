import express from 'express'
import Database from './connection'

import UserRepo from '../core/repositories/userRepo'
import UserEntity from '../core/entities/userEntity'

const route = express.Router()

route.post('/', async (req, resp) => {
    const repo = UserRepo.init(new Database())
    const body = req.body
    let msg = {status: false}

    try {
        const user = UserEntity.init(req.body)
        const result = repo.storeProfile(user)
        if (result) msg.status = true
    } catch(e) {
        console.log(e)
    }
    resp.json(msg)
})

route.get('/:id', async (req, resp) => {
    const id = req.params.id
    const repo = UserRepo.init(new Database())

    let data: any = null;
    try {
        let result = await repo.detailProfileBy('id', id)
        if (result) {
            data = UserEntity.init(result)
        }
    } catch(e) {
        console.log(e)
    }
    resp.json({data})
}) 

route.delete('/:id', async (req, resp) => {
    const id = req.params.id
    const repo = UserRepo.init(new Database())
    let msg = {status: false}

    try {
        let result = await repo.detailProfileBy('id', id)
        console.log(result)
        if (result) {
            let deleted = await repo.deleteProfileBy('id', id)
            if (deleted) msg.status = true
        }
        if (result) msg.status = true
    } catch(e) {
        console.log(e)
    }
    resp.json(msg)
})

route.put('/:id', async (req, resp) => {
    const id = req.params.id
    const repo = UserRepo.init(new Database())
    let msg = {status: false}

    try {
        let result = await repo.detailProfileBy('id', id)
        if (result) {
            let user = UserEntity.init(result)
            let updated = await repo.updateProfile(user, req.body)
            if (updated) msg.status = true
        }
    } catch(e) {
        console.log(e)
    }
    resp.json(msg)
})



route.get('/', (req, resp) => {
    resp.send('listening...')
})

export default route