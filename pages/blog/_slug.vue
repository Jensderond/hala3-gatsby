<template>
  <div class="blogSelected">
    <progress-bar :value="progress" />
    <div class="intro">
      <div class="elevate-cover">
        <div class="elevate-cover__textOffset">
          <div class="elevate-cover__left">
            <nuxt-link :to="localePath('index')">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 6 4"
                aria-hidden="true"
                style="width: 16px; transform: rotate(180deg);"
              >
                <polygon
                  fill="currentColor"
                  points="0 2.33 4.72 2.33 3.53 3.53 4 4 6 2 4 0 3.53 0.47 4.72 1.67 0 1.67 0 2.33"
                />
              </svg>
              {{ $t('goBack') }}
            </nuxt-link>
          </div>
          <div class="elevate-cover__left">
            <span class="blogSelected-year">{{ year }}</span>
            <h1 class="elevate-cover__title">{{ title }}</h1>
            <p class="elevate-cover__description">{{ description }}</p>
          </div>
        </div>
        <ImageResponsive
          :imageURL="thumbnail"
          v-if="!noMainImage"
          width="100%"
          class="elevate-cover__img"
          :alt="'Blog picture'"
        />
        <component v-else class="elevate-cover__img" :is="extraComponentLoader" />
      </div>
    </div>
    <div class="container small" ref="text">
      <no-ssr>
        <DynamicMarkdown
          :render-func="renderFunc"
          :static-render-funcs="staticRenderFuncs"
          :extra-component="extraComponent"
        />
      </no-ssr>
    </div>

    <no-ssr>
      <a v-if="scrollActive" href="#top" class="footer__top-page">
        <svg width="50" height="50" xmlns="http://www.w3.org/2000/svg">
          <path fill="none" d="M-1-1h52v52H-1z" />
          <g>
            <path
              fill="#fff"
              d="M17.638 24.216c.115.122.248.184.397.184s.283-.062.398-.184l6.798-7.226 6.798 7.226a.532.532 0 0 0 .397.184c.15 0 .283-.062.398-.184l.865-.92a.6.6 0 0 0 0-.846l-8.06-8.567a.53.53 0 0 0-.398-.184.532.532 0 0 0-.398.184l-8.06 8.568a.6.6 0 0 0 0 .846l.865.919z"
            />
            <path
              fill="#fff"
              d="M17.638 32.216c.115.122.248.184.397.184s.283-.062.398-.184l6.798-7.226 6.798 7.226a.532.532 0 0 0 .397.184c.15 0 .283-.062.398-.184l.865-.92a.6.6 0 0 0 0-.846l-8.06-8.567a.53.53 0 0 0-.398-.184.532.532 0 0 0-.398.184l-8.06 8.568a.6.6 0 0 0 0 .846l.865.919z"
            />
          </g>
        </svg>
      </a>
    </no-ssr>
  </div>
</template>

<script lang="js">
import ProgressBar from "~/components/Navigation/ProgressBar";
import DynamicMarkdown from "~/components/Markdown/DynamicMarkdown.vue"

export default {
  components: { DynamicMarkdown, ProgressBar},

  async asyncData ({params, app}) {
    const fileContent = await import(`~/contents/${app.i18n.locale}/blog/${params.slug}.md`)
    const attr = fileContent.attributes
    return {
      progress: 0,
      scrollActive: false,
      name: params.slug,
      title: attr.title,
      trans: attr.trans,
      year: attr.year,
      id: attr.id,
      owner: attr.owner,
      colors: attr.colors,
      role: attr.role,
      cardAlt: attr.cardAlt,
      noMainImage: attr.noMainImage,
      description: attr.description,
      thumbnail: attr.thumbnail,
      related: attr.related,
      extraComponent: attr.extraComponent,
      renderFunc: fileContent.vue.render,
      staticRenderFuncs: fileContent.vue.staticRenderFns,
      image: {
        main: attr.image && attr.image.main,
        og: attr.image && attr.image.og
      }
    }
  },

  methods: {
    handleScroll () {
      const progress = (window.scrollY / window.scrollMaxY) / 100 * 100
      if (progress > 1) {
        this.progress = 1
      } else if (progress < 0) {
        this.progress = 0
      } else {
        this.progress = progress
      }

      if(window.scrollY >= 100 && this.scrollActive === true) return
      if(window.scrollY < 100 && this.scrollActive === false) return
      if(window.scrollY >= 100) this.scrollActive = true;
      if(window.scrollY < 100) this.scrollActive = false;
    }
  },
  mounted () {
      if (process.client) { 
          window.scrollTo(0, 0);
          window.addEventListener('scroll', this.handleScroll);
          this.$store.commit('setCurrentBlogProgress', {
            progress: window.scrollMaxY
          })
      }
  },
  destroyed () {
      if (process.client) { 
          window.removeEventListener('scroll', this.handleScroll);
      }
  },

  nuxtI18n: {
    seo: false
  },

  head () {
    return {
      // title: this.pageTitle,
      htmlAttrs: {
        lang: 'nl-NL',
      },
      meta: [
        { name: "author", content: "Hala 3" },
        { name: "description", property: "og:description", content: this.description, hid: "description" },
        { property: "og:title", content: this.pageTitle },
        { property: "og:image", content: this.ogImage },
        { name: "twitter:description", content: this.description },
        { name: "twitter:image", content: this.ogImage }
      ],
    };
  },

  transition: {
    name: 'slide-fade'
  },

  computed: {
    ogImage () {
      return `${process.env.baseUrl}/images/${this.thumbnail}`;
    },
    pageTitle () {
      return this.title + ' – Hala 3';
    },

    extraComponentLoader () {
      if (!this.extraComponent) {
        return null
      }
      return () => import(`~/components/blog/${this.extraComponent}.vue`)
    }
  },
}
</script>

<style lang="scss">
.overflowhidden {
  overflow: hidden;
}
.blogSelected-horizontalImage {
  height: 56rem;
  background-size: contain;
  transition: all ease 0.35s;
  opacity: 0;

  &[lazy="loading"] {
    filter: blur(15px);
    background-repeat: no-repeat !important;
    background-size: contain !important;
  }
  &[lazy="loaded"] {
    opacity: 1;
    background-repeat: no-repeat !important;
    background-size: contain !important;
  }
  .intro {
    display: flex;
  }
}
.elevate-cover {
  display: flex;
  flex-direction: column;
  min-height: 459px;

  @media (min-width: $screen-md) {
    flex-direction: row;
  }

  &__img,
  &__textOffset {
    width: 100%;
  }

  &__left {
    max-width: 500px;
    width: 100%;
    padding: 2.4rem;
    // margin-bottom: auto;

    @media (min-width: $screen-md) {
      margin-left: auto;
      padding: 2.4rem 4rem 2.4rem 2.4rem;
    }
  }

  &__textOffset {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  &__title {
    font-size: 3rem;
    font-family: "Graphik", Arial, sans-serif;
    color: $secondary;

    @media (min-width: $screen-sm) {
      font-size: 4rem;
    }
  }

  &__description {
    margin: 0;
    opacity: 0;
    animation: fadeinmove 0.5s ease;
    animation-delay: 0.5s;
    animation-fill-mode: forwards;
  }
}
.dynamicMarkdown {
  padding: 3.2rem 0;
  font-size: 16px;
  line-height: 1.7;
  color: $secondary;

  > *:not(.datagrid):not(.image-placeholder) {
    max-width: 700px;
    margin-left: auto;
    margin-right: auto;
    display: block;
  }

  @media (min-width: $screen-sm) {
    padding: 3.2rem 0;
    font-size: 19px;
  }

  h2 {
    padding-bottom: 3.2rem;
    padding-bottom: 2rem;

    @media (max-width: $screen-sm) {
      font-size: 2rem;
    }
  }

  h3 {
    font-size: 2.2rem;
    padding-bottom: 2rem;
  }

  li {
    list-style-type: initial;
  }

  pre {
    box-shadow: 0 4px 12px 0 rgba(0, 0, 0, 0.05);
    padding: 2.4rem;
    border-radius: 4px;
    background-color: #f6f8fa;
    overflow-x: scroll;
    display: block;
    margin-bottom: 5rem;

    code {
      background-color: #f6f8fa;
    }
  }

  code {
    background: #f3f4f4;
    border-radius: 4px;
    display: inline;
    color: $secondary;
    font-size: 14px;
    padding: 0.2em 0.4em;

    @media (min-width: $screen-sm) {
      font-size: 16px;
    }
  }
}

.footer__top-page {
  position: fixed;
  bottom: 20px;
  right: 20px;
  background: rgb(0, 0, 0);
  background: rgba(0, 0, 0, 0.7);
  width: 50px;
  height: 50px;
  display: block;
  text-decoration: none;
  -webkit-border-radius: 35px;
  -moz-border-radius: 35px;
  border-radius: 35px;
  // display: none;
  -webkit-transition: all 0.3s linear;
  -moz-transition: all 0.3s ease;
  -ms-transition: all 0.3s ease;
  -o-transition: all 0.3s ease;
  transition: all 0.3s ease;

  i {
    color: #fff;
    margin: 0;
    position: relative;
    left: 16px;
    top: 13px;
    font-size: 19px;
    -webkit-transition: all 0.3s ease;
    -moz-transition: all 0.3s ease;
    -ms-transition: all 0.3s ease;
    -o-transition: all 0.3s ease;
    transition: all 0.3s ease;
  }

  &::hover {
    background: rgba(0, 0, 0, 0.9);
    i {
      color: #fff;
      top: 5px;
    }
  }
}
</style>