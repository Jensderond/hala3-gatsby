<template>
  <section>
    <div class="blogs__top">
      <div>
        <h2>{{ $t('latestPosts') }}</h2>
        <!-- <span class="emoji-title emoji--writing" /> -->
        <span class="emoji-title emoji--beer" />
        <span class="emoji-title emoji--soccer" />
      </div>
    </div>
    <ul class="blogs">
      <blog-card v-for="blog in sortByDate" :key="blog.name" :blog="blog" />
    </ul>
  </section>
</template>
<script>
import BlogCard from "~/components/BlogCard.vue";

export default {
  components: { BlogCard },
  props: {
    blogs: {
      type: Array
    }
  },
  computed: {
    sortByDate() {
      return this.blogs.sort((a, b) => new Date(b.date) - new Date(a.date));
    }
  }
};
</script>
<style lang="scss">
.blogs {
  margin: 0;

  @media (min-width: $screen-sm) {
    grid-template-columns: 1fr 1fr;
    grid-gap: 50px;
    display: grid;
  }

  &__top {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    margin-top: 4rem;
  }
}
</style>

