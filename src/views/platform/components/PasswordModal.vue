<template>
    <a-modal 
        v-model="visible" 
        title="密码修改" 
        ok-text="确定" 
        cancel-text="取消" 
        @ok="sureHandle" 
        @cancel="closeHandle"
    >
        <a-form 
            id="form" 
            ref="form" 
            :form="form" 
            :label-col="labelCol" 
            :wrapper-col="wrapperCol"
        >
            <a-form-item label="老密码" >
                <!-- <a-input placeholder="111"></a-input> -->
                <a-input-password
                    v-decorator="[
                    'oldPassword',
                    { rules:[{ required:true, message:'请输入老密码' }]} ]" />
            </a-form-item>
            <a-form-item label="新密码" style="margin-top:20px" >
                <a-input-password 
                    v-decorator="[
                    'password', 
                    { rules:[{ required:true, message: '请输入新密码'},{ validator: handlePass } ] }]" />
            </a-form-item>
            <a-form-item label="确认密码" style="margin-top:20px" >
                <a-input-password 
                    v-decorator="[
                    'confirm_password', 
                    { rules:[{ required:true, message: '两次密码不一致'},{ validator: handleConfirmPass } ] }
                    ]" />
            </a-form-item>
        </a-form>
    </a-modal>
</template>
<script>
import { changepwd } from '@/api/platform'
export default {
    props:{
        param:{
            type:Object,
            default:()=>{
                return {}
            }
        }
    },
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
        handlePass(rule,value,callback){
            this.password = value
            callback()
        },
        handleConfirmPass(rule,value,callback){
            if (this.password && this.password !== value) {
                callback('与新密码输入不一致')
            }
            callback()
        },
        closeHandle(){
            this.visible = false
            this.password = ''
            this.onRefreshForm()
        },
        onRefreshForm(){
            this.password = ''
            this.form = this.$form.createForm(this)
        },
        sureHandle(){
            const {
                form: { validateFields },
                param
            } = this
            validateFields(['oldPassword','password','confirm_password'],{ force: true },(err, values) => {
                if (!err) {
                    const apiValue = {
                        oldPassword:values.oldPassword,
                        password:values.password
                    }
                    changepwd(apiValue, param.id).then(() => {
                        this.closeHandle()
                    })
                }
            })
        },
        open(){
            this.visible = true
        }
    }
}
</script>