<template>
    <page-header-wrapper>
        <a-card>
            <a-form :form="queryParam" layout="inline">
                <a-row :gutter="24">
                    <a-col :md="6">
                        <a-form-item label="项目名称">
                            <a-input v-model="queryParam.name" />
                        </a-form-item>
                    </a-col>
                    <a-col :md="6">
                        <a-button type="primary">查询</a-button>
                    </a-col>
                </a-row>
            </a-form>
            <a-button style="margin-top: 20px;">
                <template #icon>
                    <to-top-outlined />
                </template>
                新增项目
            </a-button>
            <s-table
                ref="table"
                size="default"
                :columns="columns"
                :data="loadData"
                rowKey="id"
                :showPagination="true"
                style="margin-top:20px"
            >
                <template slot="status" slot-scope="text, record">
                    <a-switch :checked="record.status == 1 ? true : false" @change="switchHandle($event,record)" />
                </template>
                <template slot="action">
                    <a-button>查看项目</a-button>
                </template>
            </s-table>
        </a-card>
    </page-header-wrapper>
</template>
<script>
import { STable } from '@/components'
import { getProjectList, enableProject, disableProject  } from '../../api/project' 
import { topTopOutlined } from '@ant-design/icons-vue'
const columns = [
    {
        title:'项目名称',
        dataIndex:'name',
        key:'name',
        ellipsis:true,
        align:'center'
    },
    {
        title:'项目编码',
        dataIndex:'code',
        key:'code',
        ellipsis:true,
        align:'center'
    },
    {
        title:'联系人电话',
        dataIndex:'phone',
        key:'phone',
        ellipsis:true,
        align:'center'
    },
    {
        title:'项目域名',
        dataIndex:'domain',
        key:'domain',
        ellipsis:true,
        align:'center'
    },
    {
        title:'过期时间',
        dataIndex:'expireAt',
        key:'expireAt',
        ellipsis:true,
        align:'center'
    },
    {
        title:'创建人',
        dataIndex:'createUser',
        key:'createUser',
        ellipsis:true,
        align:'center'
    },
    {
        title:'创建时间',
        dataIndex:'createTime',
        key:'createTime',
        ellipsis:true,
        align:'center'
    },
    {
        title:'更新人',
        dataIndex:'updateUser',
        key:'updateUser',
        ellipsis:true,
        align:'center'
    },
    {
        title:'更新时间',
        dataIndex:'updateTime',
        key:'updateTime',
        ellipsis:true,
        align:'center'
    },
    {
        title:'状态',
        dataIndex:'status',
        key:'status',
        scopedSlots: { customRender: 'status' },
        align:'center'
    },
    {
        title:'操作',
        dataIndex:'action',
        width:'120px',
        scopedSlots: { customRender: 'action' },
        align:'center'
    }
]
export default {
    data(){
        return {
            columns,
            queryParam:{
                name:''
            },
            loadData:parameter => {
                const requestParameters = { ...parameter, ...this.queryParam }
                return getProjectList(requestParameters).then(res => {
                    const _data = {
                        data:res.data,
                        pageNo:res.no,
                        pageSize:res.size,
                        totalPage:res.totalPage,
                        totalCount:res.total
                    }
                    console.log(_data)
                    return _data
                })
            }
        }
    },
    components:{
        STable,
        topTopOutlined
    },
    methods:{
        switchHandle(status,param) {
            const localData = this.$refs['table'].getLocalDataSource()
            const { id } = param
            const ApiPromise = !status ? disableProject : enableProject
            ApiPromise(id).then(()=>{
                localData.map(item => {
                    if (item.id === param.id) {
                        return item.status = status ? 1 : 0
                    }
                })
            })
        }
    }
}
</script>
<style lang="less" scoped>

</style>