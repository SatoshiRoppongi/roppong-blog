module.exports = function () {
  this.nuxt.hook('build:extendRoutes', (routes) => {
    const blogPages = {
      path: '/blog/page/:id',
      component: 'pages/blog/index.vue',
      name: 'blog-page-id',
    }
    const blogArchivies = {
      path: '/blog/archive/:slug',
      component: 'pages/blog/index.vue',
      name: 'blog-archive-slug',
    }
    const blogCategory = {
      path: '/blog/category/:slug',
      component: 'pages/blog/index.vue',
      name: 'blog-category-slug',
    }
    const blogArchivePages = {
      path: '/blog/archive/:slug/page/:id',
      component: 'pages/blog/index.vue',
      name: 'blog-archive-slug-page-id',
    }
    const blogCategoryPages = {
      path: '/blog/category/:slug/page/:id',
      component: 'pages/blog/index.vue',
      name: 'blog-category-slug-page-id',
    }
    routes.unshift(
      blogArchivePages,
      blogCategoryPages,
      blogPages,
      blogArchivies,
      blogCategory
    )
  })
}
