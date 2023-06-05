<template>
    <div>
        <el-breadcrumb separator="/">
  
        <el-breadcrumb-item v-for="(item,index) in breadList" :key="index">{{item}}</el-breadcrumb-item>
        </el-breadcrumb>
        <el-card class="mt">
            <el-row>
                <el-col :span="6">
                    <el-input placeholder="请输入订单号或者客户名称" 
                    v-model="params.keyword" 
                    class="input-with-select">
                
                    <el-button slot="append" icon="el-icon-search"></el-button>
                    </el-input>
                </el-col>
                <el-col :span="6" :offset="12" class="operate">
                    <el-button type="primary" @click="visible=true">新建订单</el-button>
                    <el-button :disabled="!select.length" @click="operate(1)">审核</el-button>
                    <el-button :disabled="!select.length" @click="operate(2)">修改</el-button>
                    <el-button :disabled="!select.length" @click="operate(3)">作废</el-button>
                </el-col>
            </el-row>
            
        </el-card>
        <el-card class="mt fr mb">
            <el-table
                :data="tableData"
                stripe
                style="width: 100%" v-loading="loading"
                @selection-change="handleSelectionChange">>
                <el-table-column type="selection" width="55"></el-table-column>
                <el-table-column type="index" width="55" label="序号"></el-table-column>
                <el-table-column
                prop="id"
                label="订单号"
                fixed="left"
                width="100"
                >
                </el-table-column>
                <el-table-column
                prop="status"
                label="状态"
                width="180"
                >
                <!-- ui里面封装了，判断一下状态 -->
                <!-- 就可以拿到scope.row -->
                    <template slot-scope="scope">
                        <span v-if="scope.row.status==1">待审核</span>
                        <span v-else-if="scope.row.status==2">已审核</span>
                        <span v-else-if="scope.row.status==3">审核通过</span>
                        <span v-else>审核拒绝</span>

                    </template>
                </el-table-column>
                <el-table-column
                prop="date"
                label="下单时间"
                width="180">
                </el-table-column>
                <el-table-column
                prop="name"
                label="客户名称"
                width="180"
                >
                </el-table-column>
                <el-table-column
                prop="start"
                label="起始城市"
                width="180"
                >
                </el-table-column>
                <el-table-column
                prop="end"
                label="目的城市"
                
                >
                </el-table-column>
                <el-table-column
                prop="cargo"
                label="货物名称"
                
                >
                </el-table-column>
                <el-table-column
                prop="count"
                label="件数"
                
               >
                </el-table-column>
                <el-table-column
                prop="unit"
                label="单位"
                width="50"
                >
                </el-table-column>
                <el-table-column
                prop="price"
                label="运费"
                
                >
                </el-table-column>
                <el-table-column
                prop="from"
                label="订单来源"
                
                >
                </el-table-column>
                <el-table-column
                prop="pay"
                label="是否支付"
               
                >
                    <template slot-scope="scope">
                        {{scope.row.pay==1?"已支付":"未支付"}}
                    </template>
                </el-table-column>
                <el-table-column
                
                label="操作"
                fixed="right"
                width="180"
                >
                <!-- 也要写scope，因为删除要对应 -->
                    <template slot-scope="scope">
                        <el-button size="mini" @click="edit(scope.row)">编辑</el-button>
                        <el-button type="danger" size="mini" @click="deletes(scope.row.id)">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <el-pagination
            class="mt fr mb"
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page="params.page"
                :page-sizes="[10, 20, 30, 40]"
                
                layout="total, sizes, prev, pager, next, jumper"
                :total="total">
            </el-pagination>
        </el-card>
        <orders-modal :visible="visible" @hide="visible=false" @reload="loadDate">

        </orders-modal>
    </div>
</template>

<script>
import breadCrumb from "@/mixins/breadCrumb"
import {post} from "@/utils/http"
import OrdersModal from "./OrdersModal.vue"
import {mapMutations} from "vuex"

//http://localhost:8081/orderList
    export default {
        mixins:[breadCrumb],
        data(){
            return{
                visible:false,
                loading:false,
                tableData: [],
                total:0,
                params:{
                    page:1,
                    pageSize:10,
                    keyword:"",
                
                },
                select:[]
            } 
        },
        created(){
            this.loadData()
        },
        
        components:{
            OrdersModal
        },
        methods:{
            async loadDate(){
                this.loading=true
                const res=await post("/orderList",this.params)
                this.tableData=res.data.list
                this.loading=false
                this.total=res.data.total
            },
            handleSizeChange(pageSize){
                this.params.pageSize=pageSize;
                this.loadDate()
            },
            handleCurrentChange(page){
                this.params.page=page;
                this.loadDate()
            },
            handleSelectionChange(selection){
                this.select=selection
            },
            operate(type){
                console.log(type)
                let nos=this.select.map(item=>item.id);//map循环，操作这一项数据
                this.$notify({
                    title: '操作成功',
                    message: nos,
                    type: 'success'
                    });
            },
            //辅助函数调用setRow？？？？？？？？？？？？？
            //点击编辑调用mutation
            ...mapMutations(["setRow"]),
            //点编辑拿到vuex里面的数据，传进去，修改数据的唯一办法是提交mutation
            edit(row){
                this.setRow(row);//往vuex里面存数据，在modal里面mapstate取数据
                this.visible=true;//弹窗
            }
           
        }
    }
</script>

<style lang="less" scoped>
.operate{
    text-align: right;
}
</style>