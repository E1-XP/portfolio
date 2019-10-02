<template>
  <svg viewBox="0 0 1042 720">
    <path
      ref="path"
      d="M 41 0.5 C 41 0.5 41 0.5 41 0.5 C 41 0.5 68.5 -3 68.5 34.5 C 68.5 72 32.5 70 32.5 70 C 32.5 70 -2.963 70 0.5 34.5 C 1.654 22.667 6.539 14.945 12.539 9.908 C 18.539 4.871 25.654 2.519 31.27 1.426 C 36.885 0.333 41 0.5 41 0.5"
    />
  </svg>
</template>

<script>
import anime from "animejs";

export default {
  data: () => ({
    timeline: anime.timeline({
      loop: false,
      easing: "linear"
    }),
    paths: [
      "M 213.755 125.618 C 419.493 -74.845 971.017 -28.383 994.255 215.117 C 999.572 270.834 821.255 426.617 768.755 541.117 C 716.255 655.617 888.871 955.124 830.755 1049.12 C 695.465 1267.93 106.669 1095.05 59.255 1049.12 C -54.705 938.723 14.689 431.392 108.254 263.618 C 165.816 160.402 155.255 182.617 213.755 125.618 Z",
      "M 222.18 134.544 C 560.055 -115.371 1256.5 47.334 1135 118 C 1013.5 188.666 883.226 290 857 443.5 C 830.774 597 899 742.5 954.583 858.044 C 1143 1249.71 248.751 825.393 85.751 1029.39 C -47.397 1196.03 3.203 437.61 47.464 329.959 C 91.725 222.308 140.18 195.197 222.18 134.544 Z"
    ],
    isResizedPastMediaQuery: false
  }),
  methods: {
    setupAnimation() {
      const pathRef = this.$refs.path;
      const [path1, path2] = this.paths;

      this.timeline.add({
        targets: pathRef,
        d: [{ value: path1 }],
        delay: 160,
        duration: 1000
      });

      if (window.innerWidth > 1400) {
        this.transformShapeForBigMQs();
        this.morphIntoFinalPath(true);
      } else {
        this.transformShapeForSmallMQs();
      }
    },
    transformShapeForSmallMQs() {
      const pathRef = this.$refs.path;

      anime({
        targets: pathRef.parentElement,
        translateX: "5%",
        translateY: "142%",
        scale: "2.8",
        rotate: "80deg",
        delay: 160,
        duration: 900,
        easing: "easeOutSine"
      });
    },
    transformShapeForBigMQs() {
      const pathRef = this.$refs.path;

      anime({
        targets: pathRef.parentElement,
        translateY: "-25%",
        translateX: "0%",
        scale: "1",
        rotate: "0deg",
        delay: 160,
        duration: 900,
        easing: "easeOutSine"
      });
    },
    morphIntoFinalPath(startMode = false) {
      const pathRef = this.$refs.path;
      const [_, path2] = this.paths;

      const fn = startMode ? this.timeline.add : anime;

      fn({
        targets: pathRef,
        d: [{ value: path2 }],
        duration: 700
      });
    },
    morphIntoPreFinalPath() {
      const pathRef = this.$refs.path;
      const [path1] = this.paths;

      anime({
        targets: pathRef,
        d: [{ value: path1 }],
        duration: 1000
      });
    },
    checkWidthAndMorphOncePerMQ() {
      const isBigMQ = window.innerWidth > 1400;
      const shouldMorphIntoFinal = !this.isResizedPastMediaQuery && isBigMQ;
      const shouldMorphIntoPreFinal = this.isResizedPastMediaQuery && !isBigMQ;

      if (shouldMorphIntoFinal) {
        this.morphIntoFinalPath();
        this.transformShapeForBigMQs();

        this.isResizedPastMediaQuery = true;
      } else if (shouldMorphIntoPreFinal) {
        this.morphIntoPreFinalPath();
        this.transformShapeForSmallMQs();

        this.isResizedPastMediaQuery = false;
      }
    },
    onResize() {
      this.checkWidthAndMorphOncePerMQ();
    }
  },
  mounted() {
    this.setupAnimation();
    window.addEventListener("resize", this.onResize);
  },
  beforeDestroy() {
    window.removeEventListener("resize", this.onResize);
  }
};
</script>

<style lang="scss">
svg {
  position: absolute;
  width: 100%;
  height: 100vh;
  max-width: 1455px;
  max-height: 69.5vw;
  overflow: visible !important;
}
</style>