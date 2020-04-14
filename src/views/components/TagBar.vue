<template>
  <div class="bar">
      <div class="circle red">
          <div class="cir"></div>
      </div>
      <div class="text">关机</div>
      <div class="circle blue">
          <div class="cir"></div>
      </div>
      <div class="text">正常运行</div>
      <div class="circle orange">
          <div class="cir"></div>
      </div>
      <div class="text">调机</div>
      <div class="circle yellow">
          <div class="cir"></div>
      </div>
      <div class="text">手轮</div>
      <div class="circle gray">
          <div class="cir"></div>
      </div>
      <div>闲置</div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from "vue-property-decorator";
@Component({})
export default class TagBar extends Vue {

}
</script>

<style lang="scss" scoped>
.bar {
    height: 100%;
    display: flex;
    align-items: center;
    margin-left: 20px;
    .circle {
        width: 12px;
        height: 12px;
        border-radius: 50%;
        position: relative;
        margin-right: 10px;
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
    .text {
        margin-right: 10px;
    }
    .red {
        background: #ff1026;
        box-shadow: 0px 3px 6px 0px rgba(255,16,38,0.4); 
    }
    .blue {
        background: #0864ee;
        box-shadow: 0px 3px 6px 0px rgba(8,100,238,0.4); 
    }
    .orange {
        background: #ff6400;
        box-shadow: 0px 3px 6px 0px rgba(255,100,0,0.4); 
    }
    .yellow {
        background: #ffc83e;
        box-shadow: 0px 3px 6px 0px rgba(255,200,62,0.4); 
    }
    .gray {
        background: #a2a2a2;
        box-shadow: 0px 3px 6px 0px rgba(162,162,162,0.4); 
    }
}
</style>