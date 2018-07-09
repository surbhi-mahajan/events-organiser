<template>
  <v-app>
    <Header @toggleDrawer="isDrawerOpen = !isDrawerOpen"/>
    <Navbar v-model="isDrawerOpen" />
    <v-content>
      <v-container fluid fill-height>
        <v-layout
          justify-center
          align-center
        >
          <router-view />
        </v-layout>
      </v-container>
    </v-content>
    <Footer />
  </v-app>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import Header from './Header.vue'
import Footer from './Footer.vue'
import Navbar from './Navbar.vue'

@Component({
  components: {
    Header,
    Footer,
    Navbar
  },
  name: 'Layout'
})
export default class Layout extends Vue {
  isDrawerOpen = true
}
</script>

