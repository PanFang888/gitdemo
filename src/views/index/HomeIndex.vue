<template>
    <div>
        <el-row :gutter="24" style="margin-buttom:20px" class="total">
            <el-col :span="6">
                <el-card shadow="always" class="in">
                    <div style="float:left">
                        <p>本月进件</p>
                        <p style="font-weight:bold">6588</p>
                        <p>
                            +20.12%
                            <span style="font-size:12px">与上月同比</span>
                        </p>
                    </div>
                    <i class="el-icon-tickets icon"></i>
                    <div style="clear:both"></div>
                </el-card>
            </el-col>
            <el-col :span="6">
                <el-card shadow="always" class="in">
                    <div style="float:left">
                        <p>本月进件</p>
                        <p style="font-weight:bold">6588</p>
                        <p>
                            +20.12%
                            <span style="font-size:12px">与上月同比</span>
                        </p>
                    </div>
                    <i class="el-icon-tickets icon"></i>
                    <div style="clear:both"></div>
                </el-card>
            </el-col>
            <el-col :span="6">
                <el-card shadow="always" class="in">
                    <div style="float:left">
                        <p>本月进件</p>
                        <p style="font-weight:bold">6588</p>
                        <p>
                            +20.12%
                            <span style="font-size:12px">与上月同比</span>
                        </p>
                    </div>
                    <i class="el-icon-tickets icon"></i>
                    <div style="clear:both"></div>
                </el-card>
            </el-col>
            <el-col :span="6">
                <el-card shadow="always" class="in">
                    <div style="float:left">
                        <p>本月进件</p>
                        <p style="font-weight:bold">6588</p>
                        <p>
                            +20.12%
                            <span style="font-size:12px">与上月同比</span>
                        </p>
                    </div>
                    <i class="el-icon-tickets icon"></i>
                    <div style="clear:both"></div>
                </el-card>
            </el-col>
        </el-row>
        <el-row :gutter="24">
            <el-col :span="18">
                <el-card>
                    <div slot="header">进件统计分析</div>
                    <div style="height:240px" ref="analysis">内容</div>
                </el-card>
            </el-col>
            <el-col :span="6">
                <el-card>
                    <div slot="header">进件统计分析</div>
                    <div style="height:240px" ref="percent">内容</div>
                </el-card>
            </el-col>
        </el-row>
        <el-row :gutter="24" class="mt">
            <el-col :span="12">
                <el-card>
                    <el-timeline>
                        <el-timeline-item timestamp="2018/4/12" placement="top">
                        <el-card>
                            <h4>更新 Github 模板</h4>
                            <p>王小虎 提交于 2018/4/12 20:46</p>
                        </el-card>
                        </el-timeline-item>
                        <el-timeline-item timestamp="2018/4/3" placement="top">
                        <el-card>
                            <h4>更新 Github 模板</h4>
                            <p>王小虎 提交于 2018/4/3 20:46</p>
                        </el-card>
                        </el-timeline-item>
                        <el-timeline-item timestamp="2018/4/2" placement="top">
                        <el-card>
                            <h4>更新 Github 模板</h4>
                            <p>王小虎 提交于 2018/4/2 20:46</p>
                        </el-card>
                        </el-timeline-item>
                        <el-timeline-item timestamp="2018/4/2" placement="top">
                        <el-card>
                            <h4>更新 Github 模板</h4>
                            <p>王小虎 提交于 2018/4/2 20:46</p>
                        </el-card>
                        </el-timeline-item>
                        <el-timeline-item timestamp="2018/4/2" placement="top">
                        <el-card>
                            <h4>更新 Github 模板</h4>
                            <p>王小虎 提交于 2018/4/2 20:46</p>
                        </el-card>
                        </el-timeline-item>
                        
                    </el-timeline>
                </el-card>
            </el-col>
            <el-col :span="12">
                <el-card>
                    <el-calendar v-model="date">
                </el-calendar>
                </el-card>
                
            </el-col>
        </el-row>
    </div>
</template>

<script>
//数据可视化
/*
1.准备一个容器（用来显示图表）
2.配置图表配置项（关键步骤）
3.调用方法，生成图表（setOption）
*/
import * as echarts from 'echarts';
import {get} from "@/utils/http"

    export default {
        data(){
            return{
                date:new Date()
            }
        },
        mounted(){
            this.drawLine();
            this.drawPie()
        },
        methods:{
            
            async drawLine(){
                //1.准备一个容器（用来显示图表）
                var myChart = echarts.init(this.$refs.analysis);
                const {data}=await get("/line");//一定要await，不用存data，因为直接用
                let keys=[];
                let values=[];
                //取值
                for(let key in data){
                    keys.push(key);
                    values.push(data[key])
                }
                //2.配置图表配置项（关键步骤）
                const option = {
                    tooltip: {
                        trigger: 'axis',
                        formatter: '类目是{b}:<br/>数值是{c}'
                    },
                    xAxis: {
                        type: 'category',
                        boundaryGap: false,
                        data:keys
                    },
                    yAxis: {
                        type: 'value'
                    },
                    series: [
                        {
                        data:values,
                        type: 'line',
                        smooth: true,
                        areaStyle:{
                            color:{
                                type: 'linear',
                                x: 0,
                                y: 0,
                                x2: 0,
                                y2: 1,
                                colorStops: [{
                                    offset: 0, 
                                    color: '#4f88ff' // 0% 处的颜色
                                }, {
                                    offset: 1, 
                                    color: 'white' // 100% 处的颜色
                                }],
                                global: false // 缺省为 false
                                }
                        }
                        }
                    ]
                    };
                //3.调用方法，生成图表（setOption）
                myChart.setOption(option)
            },
            drawPie(){
                var myChart = echarts.init(this.$refs.percent);
                const option={
                    tooltip: {
                        trigger: 'item'
                    },
                    
                    series: [
                        {
                        name: 'Access From',
                        type: 'pie',
                        radius: ['40%', '70%'],
                        avoidLabelOverlap: false,
                        label: {
                            show: false,
                            position: 'center'
                        },
                        emphasis: {
                            label: {
                            show: true,
                            fontSize: 16,
                            fontWeight: 'bold'
                            }
                        },
                        labelLine: {
                            show: false
                        },
                        data: [
                            { value: 1048, name: 'Search Engine' },
                            { value: 735, name: 'Direct' },
                            { value: 580, name: 'Email' },
                            { value: 484, name: 'Union Ads' },
                            { value: 300, name: 'Video Ads' }
                        ]
                        }
                    ]
                    };
                    myChart.setOption(option)
            }
        }
    }
</script>

<style lang="less" scoped>
.icon{
    float:right;
    font-size: 90px;
    color:rgba(255,255,255,0.3);
}
.in{
    background-color: #4f88ff;
}

.total{
    p{
    line-height: 30px;
    color:#fff;
    font-size: 16px;
}
}
</style>