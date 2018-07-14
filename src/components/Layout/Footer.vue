<template functional>
  <v-footer color="indigo" app>
    <span class="white--text">&copy; 2017</span>
  </v-footer>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component({
  name: 'Footer',
})
export default class Footer extends Vue {}
</script>
