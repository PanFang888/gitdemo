<template>
    <div>
        <el-breadcrumb separator="/">
  
        <el-breadcrumb-item v-for="(item,index) in breadList" :key="index">{{item}}</el-breadcrumb-item>
        </el-breadcrumb>
        <el-card class="mt">
            <el-row :gutter="16">
                <el-col :span="6">
                    <el-input placeholder="请输入运单号" v-model="params.waybillNo"></el-input>
                </el-col>
                <el-col :span="6">
                    <el-input placeholder="请输入客户名称" v-model="params.name"></el-input>
                </el-col>
                <el-col :span="6">
                    <!-- //数据在params里面 ，后面把data放出去了-->
                    <el-date-picker
                        v-model="date"
                        
                        type="daterange"
                        range-separator="至"
                        start-placeholder="开始日期"
                        end-placeholder="结束日期"
                        style="width:100%">
                    </el-date-picker>
                </el-col>
                <el-col :span="6" class="tr">
                    <el-button type="primary" @click="loadData">查询</el-button>
                    <el-button type="primary">重置</el-button>
                </el-col>
            </el-row>
        </el-card>
        <el-card class="mt">
            <!-- 以为是双向绑定，改变的时候status也变了，直接加载数据 -->
            <el-radio-group v-model="params.status" @change="loadData">
                <el-radio-button label="1">全部运单(300)</el-radio-button>
                <el-radio-button label="2">装货中(120)</el-radio-button>
                <el-radio-button label="3">运输中(70)</el-radio-button>
                <el-radio-button label="4">已完成(100)</el-radio-button>
                <el-radio-button label="5">运单异常(100)</el-radio-button>
            </el-radio-group>
        </el-card>
        <el-card class="mt">
            <el-table :data="tableData">
                <el-table-column type="index" width="50" label="序号"></el-table-column>
                <el-table-column prop="no" label="运单号"></el-table-column>
                <el-table-column prop="data" label="下单时间"></el-table-column>
                <el-table-column prop="name" label="客户名称"></el-table-column>
                <el-table-column prop="cargo" label="货物名称"></el-table-column>
                <el-table-column prop="count" label="件数"></el-table-column>
                <el-table-column prop="start" label="起始地"></el-table-column>
                <el-table-column prop="end" label="目的地"></el-table-column>
                <el-table-column prop="price" label="运费"></el-table-column>
                <el-table-column prop="needRecive" label="需要接货"></el-table-column>
                <el-table-column prop="plateNumber" label="车牌号"></el-table-column>
                <el-table-column prop="driver" label="司机"></el-table-column>
                <el-table-column prop="tel" label="司机电话"></el-table-column>
                <el-table-column prop="percent" label="运输进度">
                    <template slot-scope="scope">
                        <el-progress :percentage="scope.row.percent"></el-progress>
                    </template>
                    
                </el-table-column>
                <el-table-column label="操作">
                    <template slot-scope="scope">
                        <el-button size="mini" @click="detail(scope.row.no)">详情</el-button>
                        <el-button size="mini" type="danger">修改</el-button>

                    </template>
                </el-table-column>
                
            </el-table>
            
        </el-card>
    </div>
</template>

<script>
import breadCrumb from "@/mixins/breadCrumb"
import moment from "moment";//日期插件
import {post} from "@/utils/http"
import {mapState,mapMutations} from "vuex"
    export default {
        mixins:[breadCrumb],
        data(){
            return{
                status:1,
                tableData:[],
                params:{
                    waybillNo:"",
                    name:"",
                    status:1//查询的时候看看是哪一个
                   
                },
                 date:[],//因为下面格式 日期，所以改成数组格式
                pageData:{
                    page:1,
                    pageSize:10
                }
            }
        },
        created(){
            this.loadData()
        },
        computed:mapState(["isFromDetail"]),
        activated(){
            if(!this.isFromDetail){
                this.loadData()
            }
        },
        beforeRouteLeave(to,from,next){
            if(to.path=="/waybill/list/detail"){
                from.meta.keepAlive=true;
            }else{
                this.clearCache();
                // this.changeIsFromDetail(false)
            }
                next();
        },
        methods:{
            ...mapMutations(["changeIsFromDetail"]),
            async loadData(){
                //格式化日期
                //问号，有数据才传值，不然默认传今天的，要加this
                let startDate=this.date[0]? moment(this.date[0]).format("YYYY-MM-DD"):""
                let endDate=this.date[0]?moment(this.date[1]).format("YYYY-MM-DD"):""
               
               const res=await post("/waybillList",{...this.pageData,...this.params,startDate,endDate});
               this.tableData=res.data.list
            },
            detail(no){
                this.$router.push("/waybill/list/detail?no="+no)
            },
            clearCache(){

                //清缓存的一段代码
                let vnode=this.$vnode;
                let parentVnode=vnode &&vnode.parent;
                if(
                    parentVnode&&
                    parentVnode.componentInstance&&
                    parentVnode.componentInstance.cache
                    ){
                    var key=
                    vnode.key==null
                        ? vnode.componentOptions.Ctor.cid+
                        (vnode.componentOptions.tag
                        ? `::${vnode.componentOptions.tag}`
                        :"")
                        :vnode.key;
                    var cache=parentVnode.componentInstance.cache;
                    var keys=parentVnode.componentInstance.keys;
                    if(cache[key]){
                        this.$destroy();
                        //remove key
                        if(key.length){
                            var index=keys.indexOf(key);
                            if(index>-1){
                                keys.splice(index,1);
                            }
                        }
                        cache[key] =null;
                    }

                }
            }
        }
    }
</script>

<style lang="less" scoped>

</style>