<template>
  <page-header-wrapper>
    <a-card>
      <a-form layout="inline">
        <a-row :gutter="24">
          <a-col :md="6">
            <a-form-item label="平台用户昵称">
              <a-input style="width:150px" v-model="queryParam.nickname" placeholder="请输入平台用户昵称" />
            </a-form-item>   
          </a-col>
          <a-col :md="6">
            <a-form-item label="平台用户名">
              <a-input  style="width:150px" v-model="queryParam.username" placeholder="请输入平台用户名" />
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
          <a-col :md="6">
            <a-button type="primary" v-action:platformModalHandle @click="platformModalHandle">添加管理员</a-button>
            <a-button style="margin-left:10px" @click="refreshHandle">查询</a-button>
            <a-button type="danger" style="margin-left:10px" @click="onReset">重置</a-button>
          </a-col>
        </a-row>
      </a-form>
      <s-table
        ref="table"
        size="default"
        :columns="columns"
        :data="loadData"
        rowKey="id"
        :showPagination="true"
        style="margin-top:20px"
      >
        <template slot="nickname"  slot-scope="text, record, index">
           <editable-cell :ref="'cell' + index" :text="text" @change="onCellChange(record, index, $event)" />
        </template>
        <template slot="status" slot-scope="text, record">
          <a-switch :disabled="userInfo.superManager ? userInfo.id == record.id : true " :checked="record.status === 1 ? true : false" @change="switchHandle($event,record)" />
        </template>
        <template slot="superManager" slot-scope="text, record">
          <span >{{ record.superManager ? '是' : '否' }}</span>
        </template>
        <template slot="action" slot-scope="text, record">
          <div class="flex">
            <a-button type="primary" :disabled="userInfo.superManager ? false : !(userInfo.id === record.id) " @click="pwdModalHandle(record)" >修改密码</a-button>
          </div>
        </template>      
      </s-table>
      <PasswordModal ref="pwdModal" :param="modalParam" />
      <AddPlatformModal ref="addModal" @onRefresh="refreshHandle" />
    </a-card>
  </page-header-wrapper>
</template>
<script>
import { getPlatformUser, enableUserApi, disableUserApi, editorNickNameApi  } from '@/api/platform'
import { mapGetters } from 'vuex'
import { STable } from '@/components'
import PasswordModal from './components/PasswordModal.vue'
import AddPlatformModal from './components/AddPlatform.vue'
import EditableCell from './components/EditableCell.vue'
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
        align:'center',
        scopedSlots: { customRender: 'nickname' },
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
        width: '120px',
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
            },
            modalParam:{}
        }
    },
    components:{
        STable,
        EditableCell,
        PasswordModal,
        AddPlatformModal
    },
    computed:{
      ...mapGetters([
        'userInfo'
      ])
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
            const localData = this.$refs['table'].getLocalDataSource()
            const { id } = param
            // 返回的status是需要变换的status
            const ApiPromise = !status ? disableUserApi : enableUserApi
            ApiPromise(id).then(()=>{
               localData.map(item => {
                  if (item.id === param.id) {
                    return item.status = status ? 1 : 2
                  }
                })
            })
        },
        onCellChange(param, index, value) {
          console.log(value)
          console.log(param)
          editorNickNameApi(param.id, param.nickname).then(res => {
            console.log('进来了')
            const localData = this.$refs['table'].getLocalDataSource()
            localData.map(item => {
              if (item.id === param.id) {
                return item.nickname = value
              }
            })
            this.$refs['cell' + index].closeEdit()
          })
          .catch(()=>{
            this.$refs['cell' + index].refresh()
          })
        },
        pwdModalHandle(param) {
          this.modalParam = param
          this.$refs['pwdModal'].open()
        },
        refreshHandle(){
          this.$refs.table.refresh()
        },
        platformModalHandle(){
          this.$refs['addModal'].open()
        },
        onReset(){
          this.queryParam = {
            nickname:'',
            username:'',
            status:''
          }
          this.refreshHandle()
        }
    }

}
</script>
<style lang="less" scoped>
  .flex {
    display: flex;
  }
</style>