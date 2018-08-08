
<template>
  <v-app id="inspire">
    <v-content>
      <v-container fluid fill-height>
        <v-layout align-center justify-center>
          <v-flex xs12 sm8 md4>
            <v-card class="elevation-12">
              <v-toolbar dark color="primary">
                <v-toolbar-title>Login</v-toolbar-title>
              </v-toolbar>
              <v-card-text>
                <h2 style="display: flex; justify-content: center;">
                  <img src="logo.jpg" width="30px" height="40px"/>                  
                  <span style="padding: 5px 0px 5px 12px;">Minents</span>
                </h2>
              </v-card-text>
              <!-- <v-card-text>
                <v-form>
                  <v-text-field prepend-icon="person" name="email" label="Email" type="email" v-model="email"></v-text-field>
                  <v-text-field id="password" prepend-icon="lock" name="password" label="Password" type="password" v-model="password"></v-text-field>
                </v-form>
              </v-card-text>
              <v-card-actions>
                <v-btn flat small color="primary" style="font-weight: bold; text-transform: capitalize; margin-left: 20px;" @click="$router.push({ name: 'signup' })">Create account</v-btn>
                <v-spacer></v-spacer>
                <v-btn color="primary" @click="onLogin">Login</v-btn>
              </v-card-actions> -->
              <g-signin-button
                :params="googleSignInParams"
                @success="onGoogleSignInSuccess"
                @error="onGoogleSignInError">
                <div style="padding: 20px 0px 50px 0px;">
                  <div style="height: 36px; width: 170px; margin: auto;" class="abcRioButton abcRioButtonLightBlue">
                    <div class="abcRioButtonContentWrapper">
                      <div class="abcRioButtonIcon" style="padding: 8px">
                        <div style="width: 18px; height: 18px;" class="abcRioButtonSvgImageWithFallback abcRioButtonIconImage abcRioButtonIconImage18">
                          <svg version="1.1" xmlns="http://www.w3.org/2000/svg" width="18px" height="18px" viewBox="0 0 48 48" class="abcRioButtonSvg">
                            <g>
                              <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z">
                              </path>
                              <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"></path>
                              <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"></path>
                              <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"></path>
                              <path fill="none" d="M0 0h48v48H0z"></path>
                            </g>
                          </svg>
                        </div>
                      </div>
                      <span style="font-size:13px;line-height:34px;" class="abcRioButtonContents">
                        <span id="not_signed_ine2whubfo8zz0">Login with Google</span>
                      </span>
                    </div>
                  </div>
                </div>
              </g-signin-button>
            </v-card>
          </v-flex>
        </v-layout>
      </v-container>
    </v-content>
  </v-app>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import 'vuetify';
@Component({
  name: 'Login',
})
export default class Login extends Vue {
  // public email: string = '';
  // public password: string = '';
  public googleSignInParams = {
    client_id: '361002868378-nd625d911rmefiv3r1fo2kvdnt02l82b.apps.googleusercontent.com',
  };
  // public onLogin() {
  //   this._login({ email: this.email, password: this.password });
  // }

  public onGoogleSignInSuccess(googleUser: any) {
    const token = googleUser.getAuthResponse().id_token;
    this._login({ token, provider: 'google' });
  }

  public onGoogleSignInError({ error }: { error: string }) {
    // On error
  }

  private _login(payload: object) {
    this.$store.dispatch('login', payload)
      .then(() => {
        this.$notifier.hide();
        this.$router.push({ name: 'dashboard' });
      })
      .catch(() => void 0);
  }
}
</script>

<style scoped>
.abcRioButtonLightBlue {
  background-color: ghostwhite;
  color: #757575;
}
.abcRioButton {
  -webkit-border-radius: 1px;
  border-radius: 1px;
  box-shadow: 0 2px 4px 0 rgba(0,0,0,.25);
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  -webkit-transition: background-color .218s,border-color .218s,box-shadow .218s;
  transition: background-color .218s,border-color .218s,box-shadow .218s;
  -webkit-user-select: none;
  -webkit-appearance: none;
  /* color: #262626; */
  cursor: pointer;
  outline: none;
  overflow: hidden;
  position: relative;
  text-align: center;
  vertical-align: middle;
  white-space: nowrap;
  width: auto;
}
.abcRioButton:hover {
    -webkit-box-shadow: 0 0 3px 3px rgba(66,133,244,.3);
    box-shadow: 0 0 3px 3px rgba(66,133,244,.3);
}
.abcRioButtonContentWrapper {
    height: 100%;
    width: 100%;
}
.abcRioButtonIcon {
    float: left;
    border-right: #ececec 1px solid;
}
.abcRioButtonSvg {
    display: block;
}
.abcRioButtonContents {
    font-family: Roboto,arial,sans-serif;
    font-size: 14px;
    font-weight: 500;
    letter-spacing: .21px;
    margin-left: 6px;
    margin-right: 6px;
    vertical-align: top;
}
</style>
