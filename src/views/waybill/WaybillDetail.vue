<template>
    <div>
        <el-breadcrumb separator="/">
  
        <el-breadcrumb-item v-for="(item,index) in breadList" :key="index">{{item}}</el-breadcrumb-item>
        </el-breadcrumb>
        <el-card class="card">
            <el-row>
                <el-col :span="12" class="info" style="text-align:left">
                    <span>运单编号</span>
                    <span>创建时间</span>
                    <span>审核员</span>
                </el-col>
                <el-col :span="12" style="text-align:right">
                    <el-button type="primary" @click="back">返回</el-button>
                </el-col>
            </el-row>

        </el-card>
        <el-card class="mt">
            <el-steps :active="2" align-center>
                <el-step title="未发货"></el-step>
                <el-step title="运输中"></el-step>
                <el-step title="已收货"></el-step>
                <el-step title="已完成"></el-step>
            </el-steps>
        </el-card>
        <el-card class="card">
            <h1>基础信息</h1>
            <el-row class="product-detail">
                <el-col :span="6">
                    <p>客户名称</p>
                    <p>客户名称</p>
                    <p>客户名称</p>

                </el-col>
                <el-col :span="6">
                    <p>客户名称</p>
                    <p>客户名称</p>
                    <p>客户名称</p>

                </el-col>
                <el-col :span="6">
                    <p>客户名称</p>
                    <p>客户名称</p>
                    <p>客户名称</p>

                </el-col>
                <el-col :span="6">
                    <p>客户名称</p>
                    <p>客户名称</p>
                    <p>客户名称</p>

                </el-col>
            </el-row>
        </el-card>

    </div>
</template>

<script>
import breadCrumb from "@/mixins/breadCrumb";
import {mapMutations} from "vuex"
    export default {
        mixins:[breadCrumb],
        beforeRouteLeave(to,from,next){
            if(to.path=="/waybill/list"){
                //做一个标记
                this.changeIsFromDetail(true)
            }else{
                this.changeIsFromDetail(false)
            }
            next()
        },
        methods:{
            ...mapMutations(["changeIsFromDetail"]),
            back(){
                this.$router.push("/waybill/list")
            }
        }
    }
</script>

<style lang="less" scoped>
.info span{
    line-height: 40px;
    text-align:left;
    margin: 0 8px;
}
.product-detail p{
    text-align: left;
    line-height: 40px;

}
h1{
    text-align: left;
    margin: 20px 0;
}
.card{
    margin-top: 20px;
}
</style>