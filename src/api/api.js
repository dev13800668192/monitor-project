import {get,psot, post} from './request'

export console login = (login)=>post('/api/post/user/login',login)

export const  upload=(upload)=>get('/api/get/upload',upload)