<template>
  <section class="slug my-5">
    <h1 class="slug_title text-center">
      {{ article.fields.title }}
    </h1>
    記事カテゴリ：
    <b-badge
      v-if="article.categorySlug"
      :to="{
        name: 'blog-category-slug',
        params: {
          slug: article.categorySlug
        }
      }"
      class="mb-2"
      variant="info"
    >
      {{ article.categoryTitle }}
    </b-badge>
    <div class="my-3">
      <div>投稿日：{{ createdAt }}</div>
      <div v-if="updatedAt !== createdAt">更新日：{{ updatedAt }}</div>
    </div>
    <!-- 画像をここに -->
    <b-img
      :src="eyeCatchImageUrl"
      :alt="eyeCatchImageAlt"
      fluid
      class="my-3"
      center
    ></b-img>
    <div v-html="$md.render(article.fields.body)" class="post-content"></div>
    <div class="comments">
      <vue-disqus
        :identifier="'post/' + article.fields.title"
        :url="'http://roppong.com/blog/' + article.fields.slug"
        shortname="roppong"
      ></vue-disqus>
    </div>
  </section>
</template>
<script>
import { createClient } from '~/plugins/contentful'

const client = createClient()
export default {
  head() {
    return {
      title: this.article.fields.title,
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: this.article.fields.metaDescription
        }
      ]
    }
  },
  props: {
    id: {
      type: String,
      default: ''
    }
  },
  transition: 'slide-right',
  computed: {
    createdAt() {
      return this.dateFormat(this.article.sys.createdAt)
    },
    updatedAt() {
      return this.dateFormat(this.article.sys.updatedAt)
    },
    eyeCatchImageUrl() {
      return this.article.eyeCatchImageUrl
        ? 'https:' + this.article.eyeCatchImageUrl
        : 'https://picsum.photos/900/300/?random'
    },
    eyeCatchImageAlt() {
      return this.article.fields.images
        ? this.article.fields.images.fields.description
        : 'random eye catch image'
    }
  },
  asyncData({ env, params }) {
    return client
      .getEntries(env.CTF_BLOG_POST_TYPE_ID)
      .then((entries) => {
        const article = entries.items.find(
          (article) => article.fields.slug === params.slug
        )
        if (article.fields.images) {
          const eyeCatchImage = entries.includes.Asset.find(
            (asset) => asset.sys.id === article.fields.images.sys.id
          )
          article.eyeCatchImageUrl = eyeCatchImage.fields.file.url
        }
        const categories = entries.items.filter(
          (item) => item.sys.contentType.sys.id === 'category'
        )
        if (article.fields.category) {
          const category = categories.find(
            (category) => category.sys.id === article.fields.category.sys.id
          )
          article.categoryTitle = category.fields.title
          article.categorySlug = category.fields.slug
        }
        return {
          article
        }
      })
      .catch(console.error)
  },
  methods: {
    dateFormat(dateString) {
      return dateString
        ? dateString
            .split('T')[0]
            .split('-')
            .join('/')
        : ''
    }
  }
}
</script>
<style lang="scss" scoped>
/deep/ h1 {
  background: linear-gradient(#fefefe, #f3f5f5);
  background: -o-linear-gradient(#fefefe, #f3f5f5);
  background: -ms-linear-gradient(#fefefe, #f3f5f5);
  background: -moz-linear-gradient(#fefefe, #f3f5f5);
  background: -webkit-linear-gradient(#fefefe, #f3f5f5);
  background: -webkit-gradient(
    linear,
    left top,
    left bottom,
    color-stop(1, #f3f5f5),
    color-stop(0, #fefefe)
  );
  border: 1px solid #aaaaaa;
  border-radius: 3px;
  box-sizing: border-box;
  font-size: 22px;
  margin: 0 0 20px;
  padding: 8px 10px 8px 26px;
  position: relative;
  width: 100%;
}

/deep/ .h1:before {
  background-color: #1b73ba;
  border-radius: 3px;
  content: ' ';
  display: inline-block;
  height: 60%;
  left: 10px;
  margin-right: 10px;
  position: absolute;
  top: 20%;
  width: 6px;
}
/deep/ h2 {
  background: linear-gradient(#f3f5f5, #fff);
  background: -o-linear-gradient(#f3f5f5, #fff);
  background: -ms-linear-gradient(#f3f5f5, #fff);
  background: -moz-linear-gradient(#f3f5f5, #fff);
  background: -webkit-linear-gradient(#f3f5f5, #fff);
  background: -webkit-gradient(
    linear,
    left top,
    left bottom,
    color-stop(1, #fff),
    color-stop(0, #f3f5f5)
  );
  border-bottom: 2px solid #1b73ba;
  box-sizing: border-box;
  font-size: 18px;
  margin: 0 0 30px;
  padding: 7px 0 5px 10px;
}
/deep/ h3 {
  border-bottom: 2px solid #1b73ba;
  font-size: 18px;
  margin: 0 0 20px;
  padding-bottom: 5px;
}
/deep/ h4 {
  font-size: 16px;
  margin: 0 0 20px;
}

/deep/ h4:before {
  background-color: #1b73ba;
  border-radius: 2px;
  content: '';
  display: inline-block;
  height: 15px;
  margin-right: 8px;
  vertical-align: middle;
  width: 4px;
}

/deep/ h5 {
  font-size: 16px;
  margin: 0 0 20px;
}
/deep/ h6 {
  font-size: 16px;
  margin: 0 0 20px;
}

/deep/ .post-content {
  padding: 0 0 15px;
  position: relative;
  z-index: 1;
  > * {
    position: relative;
    z-index: 10; // h2のpadding部分より前面に来るように
  }

  p {
    margin: 0 0 30px;
  }

  img {
    max-width: 100%;
    height: auto;
  }
  .table-of-contents {
    background: #f3f3f3;
    border: 1px solid #ccc;
    padding: 5px 10px;
    margin: 0 0 20px;
    width: fit-content;
    ul {
      padding-left: 24px;
    }
    &:before {
      content: '目次';
      font-weight: bold;
      font-size: 16px;
    }
  }

  table {
    border-collapse: collapse;
    margin: 0 auto;
    padding: 0;
    width: 650px;
    table-layout: fixed;
  }

  table tr {
    background-color: #fff;
    border: 1px solid #bbb;
    padding: 0.35em;
  }
  table th,
  table td {
    padding: 1em 10px 1em 1em;
    border-right: 1px solid #bbb;
  }
  table th {
    font-size: 0.85em;
  }
  table thead tr {
    background-color: #eee;
  }
  .txt {
    text-align: left;
    font-size: 0.85em;
  }
  .price {
    text-align: right;
  }
  @media screen and (max-width: 600px) {
    table {
      border: 0;
      width: 100%;
    }
    table th {
      background-color: #eee;
      display: block;
      border-right: none;
    }
    table thead {
      border: none;
      clip: rect(0 0 0 0);
      height: 1px;
      margin: -1px;
      overflow: hidden;
      padding: 0;
      position: absolute;
      width: 1px;
    }

    table tr {
      display: block;
      margin-bottom: 0.625em;
    }

    table td {
      border-bottom: 1px solid #bbb;
      display: block;
      font-size: 0.8em;
      text-align: right;
      position: relative;
      padding: 0.625em 0.625em 0.625em 4em;
      border-right: none;
    }

    table td::before {
      content: attr(data-label);
      font-weight: bold;
      position: absolute;
      left: 10px;
    }

    table td:last-child {
      border-bottom: 0;
    }
  }

  blockquote {
    position: relative;
    padding: 30px 15px 8px 15px;
    box-sizing: border-box;
    font-style: italic;
    background: #efefef;
    color: #555;
  }
  blockquote:before {
    display: inline-block;
    position: absolute;
    top: 5px;
    left: 3px;
    content: '“';
    font-family: sans-serif;
    color: #cfcfcf;
    font-size: 90px;
    line-height: 1;
  }
  blockquote p {
    padding: 0;
    margin: 10px 0;
    line-height: 1.7;
  }

  blockquote cite {
    display: block;
    text-align: right;
    color: #888888;
    font-size: 0.9em;
  }
}
</style>
