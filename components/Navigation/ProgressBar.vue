<template>
  <div class="progress-bar">
    <div class="progress-container" style>
      <div class="filled-bar" :style="{ transform: `translate3d(-${(1 - value) * 100}%, 0, 0)` }"></div>
    </div>

    <!-- <span class="percentage-text">Progress: {{ percentageText }}</span> -->
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  props: {
    value: {
      type: Number,
      default: 0
    }
  },

  computed: {
    ...mapState({
      progress: "getCurrentBlogProgress",
      totalScroll: "getCurrentBlogTotalScroll"
    }),
    percentageText() {
      return `${Math.round(this.value * 100)}%`;
    }
  }
};
</script>

<style scoped>
.progress-bar {
  position: fixed;
  height: 2px;
  width: 100%;
  /* border-bottom: 1px solid #fd1e1e; */
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  border-radius: 3px 3px 0 0;
}

.percentage-text {
  position: absolute;
  top: 50%;
  left: 50%;
  z-index: 2;
  font-size: 14px;
  transform: translate3d(-50%, -50%, 0);
}

.filled-bar {
  position: absolute;
  top: 0;
  left: 0;
  z-index: 2;
  height: 100%;
  width: 100%;
  background: #ffdd57;
}
</style>