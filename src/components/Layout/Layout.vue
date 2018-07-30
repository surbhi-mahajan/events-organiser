<template>
  <div>
    <Header @toggleDrawer="isDrawerOpen = !isDrawerOpen"/>
    <!-- Please don't remove below <div>. If we drag mouse from left of screen to right, nav bar opens.
      This functionality stops somehow by enclosing in a div and we want that. -->
    <div>
      <Navbar v-model="isDrawerOpen"/>
    </div>
    <v-content>
      <v-container fluid fill-height pa-0>
        <v-layout
          justify-center
          align-center
        >
          <router-view />
        </v-layout>
      </v-container>
    </v-content>
    <Footer />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import Header from './Header.vue';
import Footer from './Footer.vue';
import Navbar from './Navbar.vue';

@Component({
  components: {
    Header,
    Footer,
    Navbar,
  },
  name: 'Layout',
})
export default class Layout extends Vue {
  public isDrawerOpen = window.screen.width > 768 ? true : false;
}
</script>

