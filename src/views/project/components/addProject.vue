<template>
    <a-modal
        v-model="visible"
        title="添加新项目"
        @ok="sureHandle"
        @cancel="closeHandle"
    >
        <a-form ref="form" :label-col="labelCol" :wrapper-col="wrapperCol" :form="form">
            <a-form-item label="项目名称">
                <a-input 
                    v-decorator="[
                        'name',
                        { rules: [{ required: true, message: '请输入项目名称' } ] }
                    ]"
                />
            </a-form-item>
            <a-form-item label="项目编码">
                <a-input
                    v-decorator="[
                        'code',
                        { rules: [{ required:true, message: '请输入项目编码' }] }
                    ]"
                />
            </a-form-item>
            <a-form-item label="短信电话">
                <a-input 
                    v-decorator="[
                        'phone',
                        { rules: [{ required:true, message: '请输入短信电话' } ] }
                    ]"
                    @blur="validatePhoneBlur"
                />
            </a-form-item>
        </a-form>
    </a-modal>
</template>
<script>
    import { addProject } from '@/api/project'
    export default {
        data(){
            return {
                visible:false,
                form:this.$form.createForm(this),
                labelCol: { span: 4 },
                wrapperCol: { span: 20 },
            }
        },
        methods:{
            openModal(){
                this.visible = true
            },
            closeModal(){
                this.visible = false
            },
            sureHandle(){
                const {
                    form:{validateFields}
                } = this
                validateFields(['name','code','phone'],(err,values)=>{
                    if (!err) {
                        const {
                            name,
                            phone,
                            code
                        } = values
                        const apiValue = {
                            name,
                            phone,
                            code
                        }
                        addProject(apiValue).then(res=>{
                            
                        })
                    }
                })
            },
            closeHandle(){

            },
            validatePhoneBlur(e){
                const validatePhoneReg = /^1\d{10}$/
                if (e.target.value && !validatePhoneReg.test(e.target.value)) {
                    const arr = [{
                        message: '您输入的手机格式不正确!',
                        field: 'phone',
                    }]
                    this.form.setFields({ phone: { value: e.target.value, errors: arr } })
                }
            }
        }
    }
</script>
<style>

</style>