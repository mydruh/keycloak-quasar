<template>
  <q-page class="flex flex-center column">
    <q-space />
    <div class="text-h2">
      <span>Авторизован как</span> {{ username }}
    </div>
    <q-space />
    <q-btn @click="logout" label="Выйти" />
    <q-space />
  </q-page>
</template>

<script>
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'PageIndex',
  data() {
    return {
      username: this.$keycloak.tokenParsed.name
    }
  },
  mounted () {
    window.authRedirection()
  },
  methods: {
    logout() {
      window.location.href = this.$keycloak.createLogoutUrl()
    }
  }
})
</script>
