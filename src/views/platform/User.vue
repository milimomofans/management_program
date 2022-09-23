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
                  {{ item.name }}
                </a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
          <a-button type="primary">查询</a-button>
          <a-button style="margin-left:8px">重置</a-button>
        </a-row>
      </a-form>
      <s-table
        ref="table"
        size="default"
        :columns="columns"
        :data="loadData"
        rowKey="id"
      >
        <template slot="status" slot-scope="text, record">
          <a-switch :checked="Boolean(record.status)" @change="switchHandle($event,record)" />
        </template>
        <template slot="superManager" slot-scope="text, record">
          <span >{{ record.superManager ? '是' : '否' }}</span>
        </template>
        <template slot="action">
          <div>
            <a-button type="primary">编辑昵称</a-button>
            <a-button type="danger">修改密码</a-button>
          </div>
        </template>      
      </s-table>
    </a-card>
  </page-header-wrapper>
</template>
<script>
import { getPlatformUser, enableUserApi, disableUserApi } from '@/api/platform'
import { STable } from '@/components'
const columns = [
    {
        title:'用户名',
        dataIndex:'username',
        key:'username',
        ellipsis:true,
        align:'center'
    },
    {
        title:'昵称',
        dataIndex:'nickname',
        key:'nickname',
        ellipsis:true,
        align:'center'
    },
    {
        title:'登录次数',
        dataIndex:'loginNum',
        align:'center'
    },
    {
        title:'是否是超级管理员',
        dataIndex:'superManager',
        scopedSlots: { customRender: 'superManager' },
        align:'center'
    },
    {
        title:'最后登录时间',
        dataIndex:'lastLoginTime',
        ellipsis:true,
        align:'center'
    },
    {
        title:'最后登录IP',
        dataIndex:'lastLoginIp',
        ellipsis:true,
        align:'center'
    },
    {
        title:'创建时间',
        dataIndex:'createTime',
        ellipsis:true,
        align:'center'
    },
    {
        title:'状态',
        dataIndex:'status',
        scopedSlots: { customRender: 'status' },
        align:'center'
    },
    {
        title: '操作',
        dataIndex: 'action',
        width: '150px',
        scopedSlots: { customRender: 'action' },
        align:'center'
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
                    const _data = {
                        data:res.data,
                        pageNo:res.no,
                        pageSize:res.size,
                        totalPage:res.totalPage,
                        totalCount:res.total
                    }
                    
                    return _data
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
                console.log(res.data,'----result')
                return res.data
            })
        },
        switchHandle(status,param) {
            console.log(status)
            console.log(param)
            const { id } = param
            const { loadData } = this
            console.log(loadData)
            // const ApiPromise = status ? disableUserApi : enableUserApi
            // ApiPromise(id).then(res=>{
            //     // console.log(this.loadData)
            //     // console.log(loadData)
            // })

        }
    }

}
</script>