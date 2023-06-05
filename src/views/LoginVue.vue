<template>
  <div>
     <el-row type="flex" justify="center">
            <el-card class="box-card">
                <div slot="header" class="clearfix">
                    <h2>蚂蚁金融后台管理系统</h2>
                </div>
                <div>
                    <el-form 
                        :model="ruleForm"
                        :rules="rules" 
                        ref="ruleForm" 
                        label-width="100px" 
                        class="demo-ruleForm">
                        <el-form-item label="用户名：" prop="username">
                            <el-input v-model.trim="ruleForm.username"></el-input>
                        </el-form-item>
                        <el-form-item label="密码：" prop="password">
                            <el-input type="password" v-model.trim="ruleForm.password"></el-input>
                        </el-form-item>
                        <el-form-item>
                            <el-button 
                            type="primary" 
                            style="width:100%" 
                            @click="login"
                            :loading="loading"
                            >登录</el-button>
                        </el-form-item>
                    </el-form>
                
                </div>
            </el-card>
     </el-row>       
    
  </div>
</template>
<script>

import {post } from "@/utils/http"
import {setToken} from "@/utils/auth"
import {mapMutations} from "vuex"


    export default{
        data(){
            return{
                loading:false,//不能再点登录
                ruleForm:{
                    username:"",
                },
                rules:{
                    username:[
                        {required:true,message:"用户名不能为空",trigger:'blur'},
                        {pattern:/^\w{4,8}$/,message:'要求是4到8位数字字母组合',trigger:'blur'},//自定义正则
                        // {min:3,max:5,message:'长度在3到5个字符',trigger:'blur'},
                        
                        //自定义正则
                    ],
                    password:[
                        {required:true,message:"密码不能为空",trigger:'blur'},
                        {pattern:/^\d{6}$/,message:'要求是6位纯数字',trigger:'blur'}
                    ]
                }
            }
        },
        methods:{
            ...mapMutations(["setRole"]),//提交
            login(){
                
                this.$refs.ruleForm.validate((valid)=>{
                    
                    if(valid){
                        //登录逻辑,添加路由表
                        this.loading=true;//放开，注意要在这个位置
                        post("/login",this.ruleForm).then(res=>{

                            // this.$router.addRoute();

                            this.loading=false;
                            setToken(res.token);

                            this.setRole(res.role)//调用
                            console.log("role",this.$store.state.role)
                           sessionStorage.setItem("nickname",res.nickname)
                          this.$router.push("/")
                        }).catch((error)=>{
                            this.loading=false;
                            console.log(error)
                        })
                        
                        // axios({
                        //     url:"http://localhost:8080/login",
                        //     method:"post",
                        //     data:this.ruleForm


                        //     // data:{
                        //     //    username:this.ruleForm.name,
                        //     //    password:this.ruleForm.password
                        //     // }
                        // }).then(res=>{
                        //     console.log(1,res.data)
                        // })
                    }
                })
            }
        }
    }
</script>

<style lang="less">
    .box-card{
        width: 500px;
        margin-top: 200px;
        h2{
            text-align: center;
        }
        
    }
</style>
