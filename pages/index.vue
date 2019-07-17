<template>
  <div class="page-index">
    <div class="container">
      <BlogSection :blogs="blogs" />
    </div>
  </div>
</template>

<script>
import BlogSection from "~/components/Sections/BlogSection";

export default {
  async asyncData({ app }) {
    const blogs = process.env.blogsNl; //app.i18n.locale === 'nl' ? blogsNl : blogsEn

    async function asyncImport(blogName) {
      const wholeMD = await import(`~/contents/${
        app.i18n.locale
      }/blog/${blogName}.md`);
      return wholeMD.attributes;
    }

    return Promise.all(blogs.map(blog => asyncImport(blog))).then(res => {
      return {
        blogs: res
      };
    });
  },

  components: { BlogSection },

  transition: {
    name: "slide-fade"
  },

  head() {
    return {
      title: "Hala 3 | Kampioensteam uit Tholen 🍺⚽",
      htmlAttrs: {
        lang: "nl-NL"
      },
      meta: [
        { name: "author", content: "Hala 3" },
        {
          name: "description",
          property: "og:description",
          content:
            "Tholense boys 3, een team vol vrienden en gezelligheid. Een familie onderling. Van hoogstaand voetbal hoef je niet uit te gaan, maar gezelligheid staat voorop. HALA 3!",
          hid: "description"
        },
        {
          property: "og:title",
          content: "Hala 3 | Kampioensteam uit Tholen 🍺⚽"
        },
        { property: "og:image", content: this.ogImage },
        {
          name: "twitter:description",
          content:
            "Tholense boys 3, een team vol vrienden en gezelligheid. Een familie onderling. Van hoogstaand voetbal hoef je niet uit te gaan, maar gezelligheid staat voorop. HALA 3!"
        },
        { name: "twitter:image", content: this.ogImage }
      ]
    };
  },

  computed: {
    ogImage: function() {
      return;
    }
  }
};
</script>
