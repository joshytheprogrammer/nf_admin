export const state = () => ({
  user: {

  }
})

export const mutations = {

}

export const actions = {
  onAuthStateChangedAction(ctx, { authUser, claims }) {
    if (!authUser) {
      // claims = null
      // Perform logout operations
      console.log(authUser, claims)
    } else {
      // Do something with the authUser and the claims object...
      const { uid, email, emailVerified } = authUser
      // state.user = { uid, email, emailVerified }
      console.log(authUser, claims)
    }
  }
}

export const modules = {

}
