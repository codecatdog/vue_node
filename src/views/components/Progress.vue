<template>
  <div class="progress-main">
    <div class="progress-bg">
      <div class="progress-bar" :style="barStyle"></div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch, Prop } from "vue-property-decorator";
@Component({})
export default class MyProgress extends Vue {

  // 进度条 的百分比 [0-1] 的小数
  @Prop({}) percent
  percentage = 0;
  barStyle = {};
  // 进度条 每个阶段的 颜色组
  linearColors = [
    { v: 33, s: "#ff1026", e: "#a32f71" },
    { v: 66, s: "#a32f72", e: "#6145a5" },
    { v: 90, s: "#6145a5", e: "#0864ee" },
    { v: 100, s: "#0864ee", e: "#0864ee" }
  ];
  @Watch('percent')
  update(val) {
    this.percentage = val;
    var color = this.getGradient;
    var w = this.getPercentage;
    this.barStyle = {
      backgroundImage: color,
      width: w + "%",
      transition: 'all 1s'
    };
  }

  // 通过比例 获取 百分比
  get getPercentage() {
    if (!this.percentage || this.percentage < 0.01) {
      return 0;
    } else if (this.percentage >= 1) {
      return 100;
    } else {
      return this.percentage * 100;
    }
  }
  // 获取 进度条颜色对象
  get getGradient() {
    let linecolor = this.getColorItem(this.percentage); //[]
    let colors = ''
    for(let sub of linecolor) {
        colors += ',' + sub.s + ',' + sub.e;
    }
    if (linecolor.length) {
      return "linear-gradient(90deg" + colors + ")";
    } else {
      return "";
    }
  }
  // 根据进度 获取颜色数组
  getColorItem(p) {
    let mp = this.getPercentage; //40
    let colorArray = []
    colorArray.push(this.linearColors[0])
    for (let i = 1; i < this.linearColors.length - 1; i ++) {
      if (mp >= this.linearColors[i].v && mp <= this.linearColors[i+1].v ) {
        colorArray.push(this.linearColors[i])
      } 
    }
    return colorArray;
  }
  mounted() {
    this.percentage = this.percent;
    var color = this.getGradient;
    var w = this.getPercentage;
    this.barStyle = {
      backgroundImage: color,
      width: w + "%",
      transition: 'all 1s'
    };
  }
}
</script>

<style lang="scss">
.progress-main {
  display: flex;
  .progress-bg {
    width: 50px;
    background: #eaedf4;
    flex: 1;
    margin: 8px 0;
    border-radius: 4px;
    .progress-bar {
      width: 0%;
      height: 8px;
      border-radius: 4px;
    }
  }
}
</style>