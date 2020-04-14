<template>
  <div class="pie-container">
    <div id="pieChart"></div>
    <div class="info">
      <div class="line">
        <div class="circle red">
          <div class="cir"></div>
        </div>
        <div>
          <span>关机：</span>
          <span>{{deviceNumber.shutdown}}</span>
        </div>
        
      </div>
      <div class="line">
        <div class="circle blue">
          <div class="cir"></div>
        </div>
        <div>
          <span>正常运行：</span>
          <span>{{deviceNumber.running}}</span>
        </div>
        
      </div>
      <div class="line">
        <div class="circle orange">
          <div class="cir"></div>
        </div>
        <div>
          <span>调机：</span>
          <span>{{deviceNumber.debugmachine}}</span>
        </div>
        
      </div>
      <div class="line">
        <div class="circle yellow">
          <div class="cir"></div>
        </div>
        <div>
          <span>手轮：</span>
          <span>{{deviceNumber.handwheel}}</span>
        </div>
        
      </div>
      <div class="line">
        <div class="circle gray">
          <div class="cir"></div>
        </div>
        <div>
          <span>闲置：</span>
          <span>{{deviceNumber.idle}}</span>
        </div>
        
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch, Prop } from "vue-property-decorator";
import TagBar from "./TagBar.vue";
var echarts = require("echarts");
@Component({
  components: {
    TagBar
  }
})
export default class PieChart extends Vue {
  @Prop({}) deviceStatus
  
  option = {
    color: ["#ff1026", "#0864ee", "#ff6400", "#ffc83e", "#a2a2a2"],
    tooltip: {
      trigger: "item",
      formatter: "{a} <br/>{b}: {c} ({d}%)"
    },
    series: [
      {
        name: "状态分析",
        type: "pie",
        radius: ["40%", "70%"],
        avoidLabelOverlap: false,
        label: {
          normal: {
            show: false,
            position: "center"
          },
          emphasis: {
            show: true,
            textStyle: {
              fontSize: "18",
              fontWeight: "bold"
            }
          }
        },
        labelLine: {
          normal: {
            show: false
          }
        },
        data: [
          // { value: null, name: "关机" },
          // { value: null, name: "正常运行" },
          // { value: null, name: "调机" },
          // { value: null, name: "手轮" },
          // { value: null, name: "闲置" }
        ]
      }
    ]
  };
  deviceNumber = {}
  myChart = null;
  @Watch('deviceStatus', { deep: true })  
  updateOption1(deviceStatus) {
    this.deviceNumber = this.deviceStatus;
    this.updateOption();
    this.myChart.setOption(this.option);
  }
  updateOption() {
    let data = [];
    data.push({
      value: this.deviceStatus.shutdown,
      name: '关机'
    },
    { value: this.deviceStatus.running, name: "正常运行" },
    { value: this.deviceStatus.debugmachine, name: "调机" },
    { value: this.deviceStatus.handwheel, name: "手轮" },
    { value: this.deviceStatus.idle, name: "闲置" })
    this.option.series[0].data = data;
  }
  
  mounted() {
    this.myChart = echarts.init(document.getElementById("pieChart"));
  }
  destroyed() {
    this.myChart.clear();
    this.myChart.dispose();
  }
}
</script>

<style lang="scss" scoped>
.pie-container {
  position: relative;
  #pieChart {
    width: 60%;
    height: 200px;
    margin-top: -30px;
  }
  .info {
    position: absolute;
    right: 10px;
    top: 45px;
    .line {
      display: flex;
      margin-bottom: 10px;
    }
    .circle {
      width: 12px;
      height: 12px;
      border-radius: 50%;
      position: relative;
      margin-right: 10px;
      margin-top: 4px;
      .cir {
        width: 6px;
        height: 6px;
        border-radius: 50%;
        opacity: 0.4;
        background: #0a1233;
        position: absolute;
        top: 3px;
        left: 3px;
      }
    }
    .red {
      background: #ff1026;
      box-shadow: 0px 3px 6px 0px rgba(255, 16, 38, 0.4);
    }
    .blue {
      background: #0864ee;
      box-shadow: 0px 3px 6px 0px rgba(8, 100, 238, 0.4);
    }
    .orange {
      background: #ff6400;
      box-shadow: 0px 3px 6px 0px rgba(255, 100, 0, 0.4);
    }
    .yellow {
      background: #ffc83e;
      box-shadow: 0px 3px 6px 0px rgba(255, 200, 62, 0.4);
    }
    .gray {
      background: #a2a2a2;
      box-shadow: 0px 3px 6px 0px rgba(162, 162, 162, 0.4);
    }
  }
}
</style>