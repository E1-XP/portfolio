<template>
  <svg viewBox="0 0 1042 720">
    <path ref="path" v-bind:d="paths[0]" />
  </svg>
</template>

<script>
import anime from "animejs";
import throttle from "lodash.throttle";

export default {
  data: () => ({
    timeline: anime.timeline({
      loop: false,
      easing: "linear"
    }),
    paths: [
      "M 41 0.5 C 41 0.5 41 0.5 41 0.5 C 41 0.5 68.5 -3 68.5 34.5 C 68.5 72 32.5 70 32.5 70 C 32.5 70 -2.963 70 0.5 34.5 C 1.654 22.667 6.539 14.945 12.539 9.908 C 18.539 4.871 25.654 2.519 31.27 1.426 C 36.885 0.333 41 0.5 41 0.5",
      "M 213.755 125.618 C 419.493 -74.845 971.017 -28.383 994.255 215.117 C 999.572 270.834 821.255 426.617 768.755 541.117 C 716.255 655.617 888.871 955.124 830.755 1049.12 C 695.465 1267.93 106.669 1095.05 59.255 1049.12 C -54.705 938.723 14.689 431.392 108.254 263.618 C 165.816 160.402 155.255 182.617 213.755 125.618 Z",
      "M 220.569 128.553 C 538.789 -121.459 1207.46 57.86 1093.03 128.553 C 978.597 199.247 842.73 298.302 818.03 451.861 C 793.329 605.421 853.802 745.5 910.365 852.335 C 1175.18 1352.5 26.118 1270.79 8.178 1057.5 C -9.822 843.5 1.551 450 45.678 336 C 89.806 222 149.03 184.759 220.569 128.553 Z"
    ],
    BreakPoints: { smallBP: 700, mediumBP: 1000, largeBP: 1200 },
    usedMQ: undefined
  }),
  methods: {
    setUsedMQ() {
      this.usedMQ = Object.values(this.BreakPoints)
        .reverse()
        .find(this.isWindowWiderThan);
    },
    isWindowNarrowerThan: size => window.innerWidth < size,
    isWindowWiderThan: size => window.innerWidth > size,
    setupAnimation() {
      const pathRef = this.$refs.path;
      const [_, path1] = this.paths;
      const { smallBP, mediumBP, largeBP } = this.BreakPoints;

      this.timeline.add({
        targets: pathRef,
        d: [{ value: path1 }],
        delay: 160,
        duration: 1000
      });

      if (this.isWindowWiderThan(smallBP)) {
        if (this.isWindowNarrowerThan(mediumBP)) {
          this.transformShapeForSmallMQ();
        } else if (this.isWindowNarrowerThan(largeBP)) {
          this.transformShapeForMediumMQ(true);
        } else this.transformShapeForBigMQ();

        this.morphIntoFinalPath(true);
      } else {
        this.transformShapeForVerySmallMQ();
      }

      this.setUsedMQ();
    },
    transformShapeForVerySmallMQ() {
      const pathRef = this.$refs.path;

      anime({
        targets: pathRef.parentElement,
        translateX: "5%",
        translateY: "142%",
        scaleY: "1",
        scale: "2.8",
        rotate: "80deg",
        delay: 160,
        duration: 900,
        easing: "easeOutSine"
      });
    },
    transformShapeForSmallMQ() {
      const pathRef = this.$refs.path;

      anime({
        targets: pathRef.parentElement,
        translateY: "5%",
        translateX: "2%",
        scale: "1.125",
        scaleY: "1.43",
        rotate: "-4deg",
        delay: 160,
        duration: 900,
        easing: "easeOutSine"
      });
    },
    transformShapeForBigMQ() {
      const pathRef = this.$refs.path;

      anime({
        targets: pathRef.parentElement,
        translateY: "-25%",
        translateX: "0%",
        scale: "1",
        scaleY: "1",
        rotate: "0deg",
        delay: 160,
        duration: 900,
        easing: "easeOutSine"
      });
    },
    transformShapeForMediumMQ(onLoadMode = false) {
      const pathRef = this.$refs.path;

      anime({
        targets: pathRef.parentElement,
        translateY: onLoadMode
          ? "-8%"
          : [{ value: "2%", duration: 500 }, { value: "-8%", duration: 900 }],
        translateX: "2%",
        scale: "1",
        scaleY: onLoadMode
          ? "1.25"
          : [
              { value: "1.4", duration: 60, delay: 160 },
              { value: "1.25", duration: 900 }
            ],
        rotate: "0deg",
        delay: 160,
        duration: 900,
        easing: "easeOutSine"
      });
    },
    morphIntoFinalPath(startMode = false) {
      const pathRef = this.$refs.path;
      const path2 = this.paths[2];

      const fn = startMode ? this.timeline.add : anime;

      fn({
        targets: pathRef,
        d: [{ value: path2 }],
        duration: 700
      });
    },
    morphIntoPreFinalPath() {
      const pathRef = this.$refs.path;
      const [_, path1] = this.paths;

      anime({
        targets: pathRef,
        d: [{ value: path1 }],
        duration: 1000
      });
    },
    checkWidthAndMorphOncePerMQ() {
      const { smallBP, mediumBP, largeBP } = this.BreakPoints;

      const isAboveSmallBP = this.isWindowWiderThan(smallBP);
      const isAboveMediumBP = this.isWindowWiderThan(mediumBP);
      const isAboveLargeBP = this.isWindowWiderThan(largeBP);
      const MQNotEqualTo = bp => this.usedMQ !== bp;

      const shouldMorphIntoFinal = !this.usedMQ && isAboveSmallBP;
      const shouldMorphIntoPreFinal = !!this.usedMQ && !isAboveSmallBP;

      const shouldTransformToSmallBP =
        MQNotEqualTo(smallBP) && isAboveSmallBP && !isAboveMediumBP;
      const shouldTransformToMediumBP =
        MQNotEqualTo(mediumBP) && isAboveMediumBP && !isAboveLargeBP;
      const shouldTransformToLargeBP = MQNotEqualTo(largeBP) && isAboveLargeBP;

      if (shouldMorphIntoFinal) {
        this.morphIntoFinalPath();
      } else if (shouldMorphIntoPreFinal) {
        this.morphIntoPreFinalPath();
        this.transformShapeForVerySmallMQ();

        this.setUsedMQ();
      }

      if (shouldTransformToSmallBP) {
        this.transformShapeForSmallMQ();
        this.setUsedMQ();
      } else if (shouldTransformToMediumBP) {
        this.transformShapeForMediumMQ();
        this.setUsedMQ();
      } else if (shouldTransformToLargeBP) {
        this.transformShapeForBigMQ();
        this.setUsedMQ();
      }
    },
    onResize: throttle(function() {
      this.checkWidthAndMorphOncePerMQ();
    }, 16)
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