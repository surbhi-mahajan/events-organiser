
<template>
  <v-app id="inspire">
    <v-content>
      <v-container fluid fill-height>
        <v-layout align-center justify-center>
          <v-flex xs12 sm8 md4>
            <v-card class="elevation-12">
              <v-toolbar dark color="primary">
                <v-toolbar-title>Create Account</v-toolbar-title>
              </v-toolbar>
              <v-card-text>
                <v-form>
                  <v-text-field prepend-icon="person" name="name" label="Name" type="text" v-model="user.name"></v-text-field>
                  <v-text-field prepend-icon="email" name="email" label="Email" type="email" v-model="user.email"></v-text-field>
                  <v-text-field id="password" prepend-icon="lock" name="password" label="Password" type="password" v-model="user.password"></v-text-field>
                  <v-text-field id="confirm-password" prepend-icon="verified_user" name="confirm-password" label="Confirm Password" type="password" v-model="user.confirmPassword"></v-text-field>
                </v-form>
              </v-card-text>
              <v-card-actions>
                <v-btn flat small color="primary" style="font-weight: bold; text-transform: capitalize; margin-left: 20px;" @click="$router.push({ name: 'login' })">Sign in instead</v-btn>
                <v-spacer></v-spacer>
                <v-btn color="primary" @click="onSignup">Sign up</v-btn>
              </v-card-actions>
            </v-card>
          </v-flex>
        </v-layout>
      </v-container>
    </v-content>
  </v-app>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { IUser } from '../../shared/interface/IUser';

@Component({
  name: 'Signup',
})
export default class Signup extends Vue {
  public user: IUser = {} as IUser;

  public onSignup() {
    // TODO: Add validations
    if (this.user.password !== this.user.confirmPassword) {
      this.$notifier.show({ text: 'Password and Confirm Password should match.', type: 'error' });
      return;
    }

    delete this.user.confirmPassword;
    this.$store.dispatch('signup', this.user)
      .then(() => {
        this.$notifier.show({ text: 'Account created successfully.', type: 'success' });
        this.$router.push({ name: 'dashboard' });
      })
      .catch(() => void 0);
  }
}
</script>

<style scoped>

</style>
