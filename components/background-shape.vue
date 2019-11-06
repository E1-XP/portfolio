<template>
  <svg class="background-shape" viewBox="0 0 1042 720">
    <path ref="path" :d="paths[0]" />
  </svg>
</template>

<script>
import anime from "animejs";
import throttle from "lodash.throttle";

export default {
  data: () => ({
    timeline: anime.timeline({
      loop: false,
      easing: "linear",
      delay: 160
    }),
    paths: [
      "M 41 0.5 C 41 0.5 41 0.5 41 0.5 C 41 0.5 68.5 -3 68.5 34.5 C 68.5 72 32.5 70 32.5 70 C 32.5 70 -2.963 70 0.5 34.5 C 1.654 22.667 6.539 14.945 12.539 9.908 C 18.539 4.871 25.654 2.519 31.27 1.426 C 36.885 0.333 41 0.5 41 0.5",
      "M 213.755 125.618 C 419.493 -74.845 971.017 -28.383 994.255 215.117 C 999.572 270.834 821.255 426.617 768.755 541.117 C 716.255 655.617 888.871 955.124 830.755 1049.12 C 695.465 1267.93 106.669 1095.05 59.255 1049.12 C -54.705 938.723 14.689 431.392 108.254 263.618 C 165.816 160.402 155.255 182.617 213.755 125.618 Z",
      "M 220.569 128.553 C 538.789 -121.459 1207.46 57.86 1093.03 128.553 C 978.597 199.247 842.73 298.302 818.03 451.861 C 793.329 605.421 853.802 745.5 910.365 852.335 C 1175.18 1352.5 26.118 1270.79 8.178 1057.5 C -9.822 843.5 1.551 450 45.678 336 C 89.806 222 149.03 184.759 220.569 128.553 Z"
    ],
    breakPoints: {
      verySmallBP: 500,
      smallBP: 700,
      mediumBP: 1000,
      largeBP: 1200
    },
    usedMQ: undefined // to track previous width on resize
  }),
  computed: {
    baseShapeTransformProps() {
      return {
        targets: this.$refs.path.parentElement,
        delay: 160,
        duration: 900,
        easing: "easeOutSine"
      };
    }
  },
  methods: {
    setUsedMQ() {
      this.usedMQ = Object.values(this.breakPoints)
        .reverse()
        .find(this.isWindowWiderThan);
    },
    isWindowNarrowerThan: size => window.innerWidth < size,
    isWindowWiderThan: size => window.innerWidth >= size,
    initializeAnimation() {
      const pathRef = this.$refs.path;
      const [_, path1] = this.paths;
      const { verySmallBP, smallBP, mediumBP, largeBP } = this.breakPoints;

      this.timeline.add({
        targets: pathRef,
        d: [{ value: path1 }],
        delay: 160,
        duration: 600
      });

      if (this.isWindowWiderThan(smallBP)) {
        if (this.isWindowNarrowerThan(mediumBP)) {
          this.transformShapeForSmallMQ();
        } else if (this.isWindowNarrowerThan(largeBP)) {
          this.transformShapeForMediumMQ(true);
        } else this.transformShapeForLargeMQ();

        this.morphIntoFinalPath(true);
      } else {
        if (this.isWindowWiderThan(verySmallBP)) {
          this.transformShapeForVerySmallMQ();
        } else this.transformShapeForMobileMQ();
      }

      this.setUsedMQ();
    },
    transformShapeForMobileMQ() {
      anime(
        Object.assign({}, this.baseShapeTransformProps, {
          translateX: "16%",
          translateY:
            "calc(100vw + (100vw - 320px) * 0.2 + (100vh - 568px) * 0.1)",
          scaleY: "1.1",
          scale: "2.8",
          rotate: "80deg"
        })
      );
    },
    transformShapeForVerySmallMQ() {
      anime(
        Object.assign({}, this.baseShapeTransformProps, {
          translateX: "5%",
          translateY:
            "calc(75vw + (100vw - 320px) * 0.2 + (100vh - 568px) * 0.1)",
          scaleY: "1",
          scale: "2.8",
          rotate: "80deg"
        })
      );
    },
    transformShapeForSmallMQ() {
      anime(
        Object.assign({}, this.baseShapeTransformProps, {
          translateY: "4%",
          translateX: "5%",
          scale: "1.12",
          scaleY: "1.43",
          rotate: "-2deg"
        })
      );
    },
    transformShapeForLargeMQ() {
      anime(
        Object.assign({}, this.baseShapeTransformProps, {
          translateY: "-24%",
          translateX: "5.5%",
          scale: "1",
          scaleY: "1.2",
          rotate: "0deg"
        })
      );
    },
    transformShapeForMediumMQ(onLoadMode = false) {
      anime(
        Object.assign({}, this.baseShapeTransformProps, {
          translateY: onLoadMode
            ? "-8%"
            : [{ value: "2%", duration: 500 }, { value: "-8%", duration: 900 }],
          translateX: "0.5%",
          scale: "1",
          scaleY: onLoadMode
            ? "1.25"
            : [
                { value: "1.4", duration: 60, delay: 160 },
                { value: "1.25", duration: 900 }
              ],
          rotate: "0deg"
        })
      );
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
    morphIntoStartingPath() {
      const pathRef = this.$refs.path;
      const [path0] = this.paths;
      const { smallBP } = this.breakPoints;

      const isMobile = this.isWindowNarrowerThan(smallBP);

      anime({
        targets: pathRef,
        d: [{ value: path0 }],
        duration: 3000,
        delay: 10,
        translateX: isMobile ? "-50vw" : "-10%",
        translateY: isMobile ? "90vh" : "10%",
        scale: isMobile ? "1" : "1.4",
        scaleY: "1",
        rotate: "-30deg"
      });
    },
    checkWidthAndMorphOncePerMQ() {
      const { verySmallBP, smallBP, mediumBP, largeBP } = this.breakPoints;

      const isAboveVerySmallBP = this.isWindowWiderThan(verySmallBP);
      const isAboveSmallBP = this.isWindowWiderThan(smallBP);
      const isAboveMediumBP = this.isWindowWiderThan(mediumBP);
      const isAboveLargeBP = this.isWindowWiderThan(largeBP);
      const MQNotEqualTo = bp => this.usedMQ !== bp;

      const shouldMorphIntoFinal = () =>
        (this.usedMQ === undefined || this.usedMQ < 700) && isAboveSmallBP;
      const shouldMorphIntoPreFinal = () =>
        this.usedMQ >= 700 && !isAboveSmallBP;

      const shouldTransformFns = [
        // mobile, vsmall, small, medium, large
        () => this.usedMQ !== undefined && !isAboveVerySmallBP,
        () =>
          MQNotEqualTo(verySmallBP) && isAboveVerySmallBP && !isAboveSmallBP,
        () => MQNotEqualTo(smallBP) && isAboveSmallBP && !isAboveMediumBP,
        () => MQNotEqualTo(mediumBP) && isAboveMediumBP && !isAboveLargeBP,
        () => MQNotEqualTo(largeBP) && isAboveLargeBP
      ];

      if (shouldMorphIntoFinal()) this.morphIntoFinalPath();
      else if (shouldMorphIntoPreFinal()) this.morphIntoPreFinalPath();

      const formatKey = key =>
        `${key[0].toUpperCase()}${key.substring(1, key.length - 2)}`;

      const BPs = ["Mobile", ...Object.keys(this.breakPoints).map(formatKey)];

      shouldTransformFns.some((fn, idx) => {
        const should = fn();

        if (should) {
          this[`transformShapeFor${BPs[idx]}MQ`]();
          this.setUsedMQ();
        }

        return should;
      });
    },
    onResize: throttle(function() {
      this.checkWidthAndMorphOncePerMQ();
    }, 1000 / 60)
  },
  mounted() {
    window.addEventListener("resize", this.onResize);

    setTimeout(() => requestAnimationFrame(this.initializeAnimation), 200);
  },
  beforeDestroy() {
    window.removeEventListener("resize", this.onResize);
    this.morphIntoStartingPath();
  }
};
</script>

<style lang="scss">
.background-shape {
  position: absolute;
  width: 100%;
  height: 100vh;
  max-width: 1455px;
  max-height: 69.5vw;
  min-height: 70vw;
  overflow: visible !important;
  transform: translate3d(0, 0, 0);
  backface-visibility: hidden;
  will-change: transform, opacity;

  @include bp($bp-large) {
    width: calc(75rem - (100vw - 1200px) * 0.1);
    top: calc(5rem - (100vw - 1200px) * 0.25);
  }

  @include bp($bp-very-large) {
    min-height: 50vw;
    width: 100%;
    top: 7rem;
  }
}
</style>