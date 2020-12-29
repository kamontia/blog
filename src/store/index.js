import defaultEyeCatch from '~/assets/images/default.jpg'

export const state = () => ({})

// 算出プロパティに類似
export const getters = {
  setEyeCatch: () => (post) => {
    if (!!post.fields.coverImage && !!post.fields.coverImage.fields)
      return { url: `https:${post.fields.coverImage.fields.file.url}`, title: post.fields.coverImage.fields.title }
    else
      return { url: defaultEyeCatch, title: 'defaultImage' }

  }


}

// stateを操作するための関数群(同期)
export const mutations = {}


// mutations の操作を各コンポーネントから呼び出す(非同期処理を定義)
export const actions = {}