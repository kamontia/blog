import defaultEyeCatch from '~/assets/images/default.jpg'
// import client from '~/plugins/contentful'
import { createClient } from '~/plugins/contentful.js'

export const state = () => ({
  posts: [],
  categories: [],
  tags: [],
})

// 算出プロパティに類似
export const getters = {
  setEyeCatch: () => (post) => {
    if (!!post.fields.coverImage && !!post.fields.coverImage.fields)
      return {
        url: `https:${post.fields.coverImage.fields.file.url}`,
        title: post.fields.coverImage.fields.title,
      }
    else return { url: defaultEyeCatch, title: 'defaultImage' }
  },
  //
  linkTo: () => (name, obj) => {
    return { name: `${name}-slug`, params: { slug: obj.fields.slug } }
  },
  relatedPosts: (state) => (category) => {
    return state.posts.filter(
      (post) => post.fields.category.sys.id === category.sys.id
    )
  },
  associatePosts: (state) => (currentTag) => {
    const posts = []
    for (let i = 0; i < state.posts.length; i++) {
      const post = state.posts[i]
      if (post.fields.tags) {
        const tag = post.fields.tags.find((tag) => {
          return tag.sys.id === currentTag.sys.id
        })

        if (tag) posts.push(post)
      }
    }
    return posts
  },
}

// stateを操作するための関数群(同期)
export const mutations = {
  setPosts(state, payload) {
    state.posts = payload
  },
  setLinks(state, entries) {
    state.tags = []
    state.categories = []
    for (let i = 0; i < entries.length; i++) {
      const entry = entries[i]
      if (entry.sys.contentType.sys.id === 'tag') state.tags.push(entry)
      else if (entry.sys.contentType.sys.id === 'category')
        state.categories.push(entry)
    }
    state.categories.sort((a, b) => a.fields.sort - b.fields.sort)
  },
}

// mutations の操作を各コンポーネントから呼び出す(非同期処理を定義)
export const actions = {
  async getPosts({ commit }) {
    let client = createClient()
    await client
      .getEntries({
        content_type: process.env.CTF_BLOG_POST_TYPE_ID,
        order: '-fields.publishDate',
        include: 1,
      })
      .then((res) => {
        commit('setPosts', res.items)
        commit('setLinks', res.includes.Entry)
      })
      .catch(console.error)
  },
}
