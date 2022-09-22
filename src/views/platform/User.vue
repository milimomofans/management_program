<template>
    <page-header-wrapper>
        <a-card>
            <a-form layout="inline">
                <a-row :gutter="24">
                    <a-col :md="6">
                        <a-form-item label="平台用户昵称">
                            <a-input v-model="queryParam.nickname" placeholder="请输入平台用户昵称" />
                        </a-form-item>   
                    </a-col>
                    <a-col :md="6">
                        <a-form-item label="平台用户名">
                            <a-input v-model="queryParam.username" placeholder="请输入平台用户名" />
                        </a-form-item>
                    </a-col>
                    <a-col :md="6">
                        <a-form-item label="使用状态">
                            <a-select style="width:100px;" v-model="queryParam.status">
                                <a-select-option 
                                    v-for="item in statusList" 
                                    :value="item.status" 
                                    :key="item.status"
                                >
                                    {{item.name}}
                                </a-select-option>
                            </a-select>
                        </a-form-item>
                    </a-col>
                    <a-button type="primary" @click="test">查询</a-button>
                    <a-button style="margin-left:8px" @click="reset">重置</a-button>
                </a-row>
            </a-form>
            <s-table
                ref="table"
                size="default"
                :columns="columns"
                :data="loadData"
                showPagination="auto"
            >
                <span slot=""></span>
            </s-table>
        </a-card>
    </page-header-wrapper>
</template>
<script>
import { getPlatformUser } from '@/api/platform'
import { STable } from '@/components'
const columns = [
    {
        title:'用户名',
        dataIndex:'username'
    },
    {
        title:'昵称',
        dataIndex:'nickname'
    },
    {
        title:'状态',
        dataIndex:'status'
    },
    {
        title:'登录次数',
        dataIndex:'loginNum'
    },
    {
        title:'是否是超级管理员',
        dataIndex:'supperManager'
    },
    {
        title:'最后登录时间',
        dataIndex:'lastLoginTime'
    },
    {
        title:'最后登录IP',
        dataIndex:'lastLoginIp'
    },
    {
        title:'创建时间',
        dataIndex:'createTime'
    }
]

export default {
    data () {
        return {
            queryParam:{
                nickname:'',
                username:'',
                status:''
            },
            statusList:[
                {
                    name:'全部',
                    status:''
                },
                {
                    name:'正常',
                    status:1
                },
                {
                    name:'禁用',
                    status:2
                }
            ],
            pageParam:{
                pageNo:1,
                pageSize:10
            },
            columns,
            loadData:parameter => {
                const requestParameters = {...parameter,...this.queryParam}
                return getPlatformUser(requestParameters).then(res=>{
                    return res.data
                })
            }
        }
    },
    components:{
        STable
    },
    mounted(){
        this.getList()
    },
    methods:{
        getList(){
            const { queryParam, pageParam } = this,
                _queryParam = {
                    ...queryParam,
                    ...pageParam
                }
            getPlatformUser(_queryParam).then(res=>{
                console.log(res,'----result')
                return res.data
            })
        }
    }

}
</script>