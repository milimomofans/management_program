<template>
    <a-modal 
        v-model="visible" 
        title="密码修改" 
        ok-text="确定" 
        cancel-text="取消" 
        @ok="sureHandle" 
        @cancel="closeHandle"
    >
        <a-form id="form" ref="form" :form="form" layout="horizontal">
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
                    { rules:[{ required:true, message: '请输入新密码'}, ] }]" />
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
            form:this.$form.createForm(this)
        }
    },
    methods:{
        closeHandle(){
            this.visible = false
            this.onRefreshForm()
        },
        onRefreshForm(){
            // this.form = {
            //     oldPassword:'',
            //     password:''
            // }
            this.form = this.$form.createForm(this)
        },
        sureHandle(){
            const {
                form: { validateFields },
                param
            } = this
            console.log(this.form)
            validateFields(['oldPassword','password'],{ force: true },(err, values) => {
                if (!err) {
                    console.log('进来了')
                    changepwd(values, param.id).then(() => {
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