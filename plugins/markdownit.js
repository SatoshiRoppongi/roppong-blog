import MarkdownIt from 'markdown-it'
import markdownItAnchor from 'markdown-it-anchor'
import markdownItTocDoneRight from 'markdown-it-toc-done-right'
import hljs from 'highlight.js'
/* refs https://izm51.com/posts/markdown-it-target-blank-anchor */

export default ({ app }, inject) => {
  const md = new MarkdownIt({
    // markdownitのオプション
    injected: true, // $mdを利用してmarkdownをhtmlにレンダリングする
    breaks: true, // 改行コードを<br>に変換する
    html: true, // HTML タグを有効にする
    linkify: true, // URLに似たテキストをリンクに自動変換する
    typography: true, // 言語に依存しないきれいな 置換 + 引用符 を有効にします。
    preset: 'default',
    xhtmlOut: true,
    langPrefix: 'language-',
    highlight: (code, lang) => {
      if (lang && hljs.getLanguage(lang)) {
        try {
          return (
            '<pre class="hljs"><code>' +
            hljs.highlight(lang, code, true).value +
            '</code></pre>'
          )
        } catch (__) {}
      }
      return (
        '<pre class="hljs"><code>' +
        hljs.highlight('plaintext', code, true).value +
        '</code></pre>'
      )
    }
  })
  md.use(require('markdown-it-table-of-contents'))
  md.use(require('markdown-it-footnote'))
  md.use(require('markdown-it-mark'))
  md.use(require('markdown-it-video'))
  md.use(require('markdown-it-sanitizer'))
  md.use(require('markdown-it-emoji'))
  md.use(require('markdown-it-checkbox'))
  md.use(markdownItAnchor, {
    permalink: true,
    permalinkBefore: true,
    permalinkSymbol: '' // §
  }).use(markdownItTocDoneRight)
  // md.use(require('markdown-it-imsize'))
  md.use(require('markdown-it-podcast'), {
    url: '',
    height: 200,
    auto_play: false,
    hide_related: false,
    show_comments: false,
    show_user: true,
    show_reposts: false,
    visual: true
  })

  const defaultRender =
    md.renderer.rules.link_open ||
    function(tokens, idx, options, env, self) {
      return self.renderToken(tokens, idx, options)
    }

  md.renderer.rules.link_open = function(tokens, idx, options, env, self) {
    const aIndex = tokens[idx].attrIndex('target')
    if (tokens[idx].attrs[0][1].match('http')) {
      if (aIndex < 0) {
        tokens[idx].attrPush(['target', '_blank'])
      } else {
        tokens[idx].attrs[aIndex][1] = '_blank'
      }
    }
    return defaultRender(tokens, idx, options, env, self)
  }

  inject('md', md)
}
