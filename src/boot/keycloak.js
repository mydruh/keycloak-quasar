import { boot } from 'quasar/wrappers'
import Keycloak from 'keycloak-js'

export default boot(({ app /* , store } */ }) => {

  async function createRefreshTokenTimer(keycloak) {
    setInterval(() => {
      keycloak.updateToken(60).then((refreshed) => {
        if (refreshed) {
          console.log("Token refreshed" + refreshed)
        } else {
          // Do Something
        }
      }).catch(() => {
        console.log("ERROR to refresh token")
      })
    }, 6000)
  }

  return new Promise(resolve => {
    const keycloak = Keycloak({
      url: "http://10.8.93.133:8081/",
      realm: "Test",
      clientId: "employee-interaction-fe"
    })

    keycloak
      .init({
        onLoad: "login-required",
        checkLoginIframe: false,
        enableLogging: true
      })
      .then(async (authenticated) => {
        if (authenticated) {
          console.log("Authed")
          await createRefreshTokenTimer(keycloak);
          resolve()
        } else {
          console.log("Not authed")
        }
      }).catch((error) => {
      console.log("Auth ERROR", error)
    })

    app.config.globalProperties.$keycloak = keycloak
    app.use(keycloak)
  })
})
