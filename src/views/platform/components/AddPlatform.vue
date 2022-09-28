<template>
   <a-modal 
        v-model="visible"
        title="新增管理员"
        @ok="sureHandle"
        @cancel="closeHandle"
   >
      <a-form ref="form" :label-col="labelCol" :wrapper-col="wrapperCol" :form="form">
        <a-form-item label="用户名" >
            <a-input
                v-decorator="[
                    'username',
                    { rules:[{ required:true, message:'请输入用户名' }]} ]" 
                />
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
                    { rules:[{ required:true, message:'请输入密码' },{ validator: handlePass }]}
                ]"
            />
        </a-form-item>
        <a-form-item label="确认密码">
            <a-input-password 
                v-decorator="[
                    'confirm_password',
                    { rules:[{ required:true, message:'两次密码不一致'},{ validator: handleConfirmPass }] }
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
            form:this.$form.createForm(this),
            labelCol: { span: 4 },
            wrapperCol: { span: 20 },
            password:''
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
            validateFields(['username','nickname','password','confirm_password'],(err,values)=>{
                if(!err) {
                    console.log(values)
                    const apiValue = {
                        nickname:values.nickname,
                        password:values.password,
                        username:values
                    }
                    addPlatformApi(apiValue).then(()=>{
                        this.password = ''
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
            this.password = ''
            this.form = this.$form.createForm(this)
        },
        handlePass(rule,value,callback){
            this.password = value
            callback()
        },
        handleConfirmPass(rule,value,callback){
            if (this.password && this.password !== value) {
                callback('与新密码输入不一致')
            }
            callback()
        }
    }
}
</script>
<style lang="less" scoped>

</style>