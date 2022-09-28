<template>
    <page-header-wrapper>
        <a-card>
            <a-form :form="queryParam">
                <a-form-item label="项目名称">
                    <a-input v-model="queryParam.name" />
                </a-form-item>
                <a-button type="primary">查询</a-button>
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
            </s-table>
        </a-card>
    </page-header-wrapper>
</template>
<script>
import { STable } from '@/components'
import { getProjectList } from '../../api/project' 
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
                getProjectList(requestParameters).then(res => {
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
        STable
    },
    methods:{

    }
}
</script>
<style lang="less" scoped>

</style>