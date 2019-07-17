<template>
  <div class="container small">
    <no-ssr>
      <DynamicMarkdown
        :render-func="renderFunc"
        :static-render-funcs="staticRenderFuncs"
        :extra-component="extraComponent"
      />
    </no-ssr>
  </div>
</template>

<script>
import DynamicMarkdown from "~/components/Markdown/DynamicMarkdown.vue";

export default {
  components: { DynamicMarkdown },
  head: function() {
    return {
      title: `${this.title}`,
      meta: [
        {
          hid: "description",
          name: "description",
          content: this.description
        }
      ]
    };
  },
  asyncData: async ({ app, route, payload, params }) => {
    const fileContent = await import(`~/contents/pages/${params.page}.md`);
    const attr = fileContent.attributes;
    return {
      name: params.slug,
      title: attr.title,
      trans: attr.trans,
      description: attr.description,
      year: attr.year,
      id: attr.id,
      owner: attr.owner,
      colors: attr.colors,
      role: attr.role,
      cardAlt: attr.cardAlt,
      noMainImage: attr.noMainImage,
      description: attr.description,
      related: attr.related,
      extraComponent: attr.extraComponent,
      renderFunc: fileContent.vue.render,
      staticRenderFuncs: fileContent.vue.staticRenderFns,
      image: {
        main: attr.image && attr.image.main,
        og: attr.image && attr.image.og
      }
    };
  }
};
</script>