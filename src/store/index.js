import defaultEyeCatch from '~/assets/images/default.jpg'
import client from '~/plugins/contentful'
import { createClient } from '~/plugins/contentful.js'

export const state = () => ({
  posts: []
})

// 算出プロパティに類似
export const getters = {
  setEyeCatch: () => (post) => {
    if (!!post.fields.coverImage && !!post.fields.coverImage.fields)
      return { url: `https:${post.fields.coverImage.fields.file.url}`, title: post.fields.coverImage.fields.title }
    else
      return { url: defaultEyeCatch, title: 'defaultImage' }
  },
  linkTo: () => (name, obj) => {
    return { name: `${name}-slug`, params: { slug: obj.fields.slug } }
  },


}

// stateを操作するための関数群(同期)
export const mutations = {
  setPosts(state, payload) {
    state.posts = payload
  }
}


// mutations の操作を各コンポーネントから呼び出す(非同期処理を定義)
export const actions = {
  async getPosts({ commit }) {
    let client = createClient()
    await client
      .getEntries({
        content_type: process.env.CTF_BLOG_POST_TYPE_ID,
        order: '-fields.publishDate',
      })
      .then((res) => {
        commit('setPosts', res.items)
      })
      .catch(console.error)

  }
}