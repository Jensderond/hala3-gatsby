<template>
  <div class="layout">
    <div class="placeholder__fixed_header"></div>
    <TheHeader @sidenavToggle="displaySidenav = !displaySidenav" />
    <TheSidenav :show="displaySidenav" @close="displaySidenav = false" />
    <nuxt class="nuxt-content" />
    <Footer />
  </div>
</template>
<script>
import TheHeader from "~/components/TheHeader";
import TheSidenav from "~/components/Navigation/TheSideNav";
import Footer from "~/components/Sections/Footer";

export default {
  components: {
    TheHeader,
    TheSidenav,
    Footer
  },
  data() {
    return {
      displaySidenav: false
    };
  }
};
</script>
<style lang="scss">
.layout {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.placeholder__fixed_header {
  position: relative;
  display: block;
  height: 6rem;
  width: 100vw;

  @media (min-width: $screen-sm) {
    height: 8rem;
  }
}

.nuxt-content {
  flex-grow: 1;
}
</style>
