<template>
  <div id="components-form-demo-normal-login">
    <div class="logo-wrapper">
      <img class="logo-image" :src="logo" width="300px" />
    </div>
    <a-form class="login-form" :form="form" @submit="handleSubmit">
      <a-form-item v-if="errorMessage.length">
        <a-alert type="error" :message="errorMessage" />
      </a-form-item>
      <a-form-item>
        <a-input
          v-decorator="[
          'email',
          { rules: [{ required: true, type: 'email', message: 'Please input your email!' }] }
        ]"
          placeholder="Email"
        >
          <a-icon slot="prefix" type="user" style="color: rgba(0,0,0,.25)" />
        </a-input>
      </a-form-item>
      <a-form-item>
        <a-input
          v-decorator="[
          'password',
          { rules: [{ required: true, message: 'Please input your Password!' }] }
        ]"
          type="password"
          placeholder="Password"
        >
          <a-icon slot="prefix" type="lock" style="color: rgba(0,0,0,.25)" />
        </a-input>
      </a-form-item>
      <a-form-item>
        <a-button v-if="submitting" type="primary" class="login-form-button">Logging in...</a-button>
        <a-button v-else type="primary" html-type="submit" class="login-form-button">Log in</a-button>
      </a-form-item>
    </a-form>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';

import * as ROUTES from '@/constants/routes';
import * as authService from '@/services/auth';
import { logoInvertedImage } from '@/assets/images';
import * as storageService from '@/services/storage';

@Component
export default class Login extends Vue {
  private form: any;
  private errorMessage: string = '';
  private submitting: boolean = false;
  private logo: string = logoInvertedImage;

  private beforeCreate() {
    this.form = this.$form.createForm(this);
  }

  private handleSubmit(e: any) {
    e.preventDefault();

    this.form.validateFields((err: any, values: any) => {
      if (!err) {
        this.errorMessage = '';
        this.submitting = true;

        const { email, password } = values;

        authService
          .checkLogin(email, password)
          .then((data: any) => {
            if (data && data.accessToken) {
              const params = {
                accessToken: data.accessToken,
                refreshToken: data.refreshToken
              };

              storageService.setUserSession(params);

              this.$router.push(ROUTES.DASHBOARD);

              return;
            } else {
              this.errorMessage = data.message;
            }
          })
          .catch((error: any) => {
            this.errorMessage = error.message;
          })
          .then(() => {
            this.submitting = false;
          });
      }
    });
  }
}
</script>

<style lang="scss" scoped>
#components-form-demo-normal-login {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  .login-form {
    width: 400px;
    padding: 20px;

    @media screen and (max-width: 420px) {
      width: 100%;
    }
  }

  .login-form-button {
    width: 100%;
  }

  .logo-wrapper {
    display: flex;
    justify-content: center;
    padding: 40px 20px;

    .logo-image {
      width: 250px;
    }
  }
}
</style>
