<template>
  <q-layout view="lHh Lpr lFf" class="bg-white">
    <q-header elevated>
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          @click="toggleLeftDrawer"
          aria-label="Menu"
          icon="menu"
        />

        <q-toolbar-title>
          Quasar App
        </q-toolbar-title>
        <q-btn stretch flat to="/login" v-if="!isAuthenticated">Вход</q-btn>
        <q-btn stretch flat @click="logout" v-else>Выйти</q-btn>
      </q-toolbar>
    </q-header>

<q-drawer
        v-model="leftDrawerOpen"
        show-if-above
        :width="300"
        :breakpoint="400"
      >
        <q-scroll-area style="height: calc(100% - 150px); margin-top: 150px; border-right: 1px solid #ddd">
          <q-list padding>

          <router-link to="/">
            <q-item clickable v-ripple>
              <q-item-section avatar>
                <q-icon name="send"></q-icon>
              </q-item-section>

              <q-item-section>
                <q-item-label>Home</q-item-label>
              </q-item-section>
            </q-item>
          </router-link>

            <router-link to="/test">
            <q-item clickable v-ripple>
              <q-item-section avatar>
                <q-icon name="drafts"></q-icon>
              </q-item-section>

              <q-item-section>
                <q-item-label>Test</q-item-label>
              </q-item-section>
            </q-item>
            </router-link>
          </q-list>
        </q-scroll-area>

        <q-img class="absolute-top" src="https://static.vecteezy.com/system/resources/thumbnails/005/116/864/small/flat-lay-of-office-workplace-work-table-top-view-open-laptop-cup-of-coffee-pen-pencil-realistic-illustration-vector.jpg" style="height: 150px">
          <div class="absolute-bottom bg-transparent">
            <q-avatar size="56px" class="q-mb-sm">
              <img src="https://media.istockphoto.com/id/543042022/vector/businessman-profile-icon-man-avatar-picture-flat-design-vector-icon.jpg?s=612x612&w=0&k=20&c=Lj2DJIvUR-0CqO2kYA37XaqwA_WeD6lXMHQPvPhutJo=">
            </q-avatar>
            <div class="text-weight-bold">Толеген Байбула</div>
            <div>@kazakhtelekom</div>
          </div>
        </q-img>
      </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { ref } from 'vue'

export default {
  name: 'MyLayout',
  setup () {
    const leftDrawerOpen = ref(false)
    function toggleLeftDrawer () {
      leftDrawerOpen.value = !leftDrawerOpen.value
    }
    return {
      leftDrawerOpen,
      toggleLeftDrawer
    }
  },

  methods: {
    logout () {
      this.$store.dispatch('auth/signOut')
      this.$router.push('/')
    }
  }
}
</script>
