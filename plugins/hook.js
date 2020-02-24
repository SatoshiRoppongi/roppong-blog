module.exports = function() {
  this.nuxt.hook('build:extendRoutes', (routes) => {
    const blogPages = {
      path: '/blog/page/:id',
      component: 'pages/blog/index.vue',
      name: 'blog-page-id'
    }
    routes.unshift(blogPages)
  })
}
