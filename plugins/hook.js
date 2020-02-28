module.exports = function() {
  this.nuxt.hook('build:extendRoutes', (routes) => {
    const blogPages = {
      path: '/blog/page/:id',
      component: 'pages/blog/index.vue',
      name: 'blog-page-id'
    }
    const blogArchivies = {
      path: '/blog/archives/:slug',
      component: 'pages/blog/index.vue',
      name: 'blog-archives-slug'
    }
    const blogCategory = {
      path: '/blog/category/:slug',
      component: 'pages/blog/index.vue',
      name: 'blog-category-slug'
    }
    const blogArchivesPages = {
      path: '/blog/archives/:slug/page/:id',
      component: 'pages/blog/index.vue',
      name: 'blog-archives-slug-page-id'
    }
    const blogCategoryPages = {
      path: '/blog/category/:slug/page/:id',
      component: 'pages/blog/index.vue',
      name: 'blog-category-slug-page-id'
    }
    routes.unshift(
      blogArchivesPages,
      blogCategoryPages,
      blogPages,
      blogArchivies,
      blogCategory
    )
  })
}
