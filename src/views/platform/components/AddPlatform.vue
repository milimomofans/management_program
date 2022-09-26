<template>
   <a-modal 
        v-model="visible"
        title="新增管理员"
        @ok="sureHandle"
        @cancel="closeHandle"
   >
      <a-form ref="form" :form="form">
        <a-form-item label="用户名">
            <a-input
                v-decorator="[
                'username',
                { rules:[{ required:true, message:'请输入用户名' }]} ]" />
        </a-form-item>
        <a-form-item label="昵称">
            <a-input 
                v-decorator="[
                'nickname',
                { rules:[{ required:true, message:'请输入昵称' }]}
                ]"
            ></a-input>
        </a-form-item>
        <a-form-item label="密码">
            <a-input-password
                v-decorator="[
                'password',
                { rules:[{ required:true, message:'请输入密码' }]}
                ]"
            />
        </a-form-item>
      </a-form>
   </a-modal>
</template>
<script>
import { addPlatformApi } from '@/api/platform'
export default {
    data(){
        return {
            visible:false,
            form:this.$form.createForm(this)
        }
    },
    methods:{
        open(){
            this.visible = true
        },
        sureHandle(){
            const {
                form:{validateFields}
            } = this
            validateFields(['username','nickname','password'],(err,values)=>{
                if(!err) {
                    addPlatformApi(values).then(()=>{
                        this.$emit('onRefresh')
                        this.closeHandle()
                    }).catch(err=>{
                        this.closeHandle()
                    })
                }
            })
        },
        closeHandle(){
            this.visible = false
            this.form = this.$form.createForm(this)
        }
    }
}
</script>
<style lang="less" scoped>

</style>