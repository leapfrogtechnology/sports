<template>
  <div class="header">
    <div class="header-image">
      <img :src="logo" width="300px" />
    </div>

    <a-form @submit.prevent="handleSubmit">
      <a-form-item v-if="errorMessage.length">
        <a-alert type="error" :message="errorMessage" />
      </a-form-item>

      <a-form-item class="input-box">
        <a-input
          v-decorator="[{rules: [{required: true, message: 'Please enter your email'}]}]"
          placeholder="Email"
          size="large"
          v-model="userEmail"
        >
          <a-icon slot="prefix" type="user" style="color:rgba(0,0,0,.25)" />
        </a-input>
      </a-form-item>

      <a-form-item class="input-box">
        <a-input
          type="password"
          v-decorator="[{rules: [{required: true, message: 'Please enter your password'}]}]"
          placeholder="Password"
          size="large"
          v-model="userPassword"
        >
          <a-icon slot="prefix" type="lock" style="color:rgba(0,0,0,.25)" />
        </a-input>
      </a-form-item>

      <a-form-item class="checkbox">
        <a-checkbox class="checkbox-item">Remember Me</a-checkbox>
      </a-form-item>

      <a-form-item class="button">
        <a-button type="primary" html-type="submit">Log in</a-button>
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
  private userEmail: string = '';
  private userPassword: string = '';
  private errorMessage: string = '';
  private logo: string = logoInvertedImage;

  private handleSubmit() {
    authService
      .checkLogin(this.userEmail, this.userPassword)
      .then((res) => {
        const data = res.data.data.login;

        if (data && data.accessToken) {
          const params = {
            accessToken: data.accessToken,
            refreshToken: data.refreshToken
          };

          this.errorMessage = '';

          storageService.setUserSession(params);

          this.$router.push(ROUTES.DASHBOARD);

          return;
        }

        this.errorMessage = data.message;
      })
      .catch((err) => {
        this.errorMessage = err.message;
      });
  }
}
</script>

<style scoped>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

.header-image {
  text-align: center;
  margin-top: 89px;
  margin-bottom: 90px;
}

.ant-input-affix-wrapper {
  width: 370px;
}

.input-box {
  text-align: center;
  margin-bottom: 25px;
}

.checkbox-item {
  color: white;
}

.checkbox {
  text-align: center;
  margin-bottom: 5px;
}

.ant-btn-primary {
  width: 370px;
}

.button {
  text-align: center;
}
</style>
