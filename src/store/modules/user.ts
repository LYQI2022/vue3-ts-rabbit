import { defineStore } from 'pinia'
import request from '@/utils/request'
import { ApiRes } from '@/types/data'
import { Profile } from '@/types/user'

export default defineStore('user', {
  state() {
    return {
      profile: {} as Profile
    }
  },
  actions: {
    async login(data: {account: string, password: string}) {
      const res = await request.post<ApiRes<Profile>>('/login',data)
      // console.log(res.data);
      this.profile = res.data.result
    }
  }
})