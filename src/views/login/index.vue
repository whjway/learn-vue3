<template>
  <div class="login">
    <img src="@/assets/image/avatar-default.png" alt="" class="logo" />
    <h3 class="name">看数藏</h3>

    <div class="login-inputs">
      <van-field
        v-model="form.mobile"
        type="tel"
        maxlength="11"
        clearable
        placeholder="请输入手机号"
        :readonly="isDuring"
      />
      <van-field
        v-model="form.captcha"
        type="number"
        maxlength="6"
        center
        clearable
        placeholder="请输入图形验证码"
      >
        <template #extra>
          <img
            v-if="captchaSrc"
            class="captcha"
            :src="captchaSrc"
            alt=""
            @click="handleCaptcha"
          />
        </template>
      </van-field>
      <van-field
        v-model="form.sms"
        maxlength="6"
        type="number"
        center
        clearable
        placeholder="请输入短信验证码"
      >
        <template #button>
          <div class="count-down-button" @click="handleCountDown">
            <van-count-down
              ref="countDown"
              :time="count"
              :auto-start="false"
              @finish="countDownFinish"
            >
              <template #default="timeData">
                <template v-if="!isDuring">获取验证码</template>
                <template v-else>{{ timeData.seconds }}s 后重新获取</template>
              </template>
            </van-count-down>
          </div>
        </template>
      </van-field>
    </div>

    <div class="login-btns">
      <div class="login-btn" @click="handleSubmit">立即登录</div>
      <div class="login-agree">
        <van-checkbox v-model="isAgree" icon-size="14px" checked-color="#6FA5F3"
          >您已阅读并同意
          <router-link to="/user-agreement">《用户协议》</router-link>
          <router-link to="/privacy-agreement">《隐私政策》</router-link>
        </van-checkbox>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Toast } from "vant";
import { regular } from "@/utils/constant";
import useLogin from "@/composables/use-login";

defineOptions({
  name: "Login"
});

const count = ref(60 * 1000);
const isAgree = ref(true);
const countDown = ref(); //倒计时组件

// 检测用户输入内容
function checkForm(isCheckCaptcha = false) {
  if (!form.value.mobile) {
    Toast("请输入手机号码");
    return false;
  } else if (!regular.phone.test(form.value.mobile)) {
    Toast("手机号码格式有误");
    return false;
  } else if (form.value.captcha === "") {
    Toast("请输入图形验证码");
    return false;
  } else if (!form.value.sms && !isCheckCaptcha) {
    Toast("请输入短信验证码");
    return false;
  } else if (!regular.sms.test(form.value.sms) && !isCheckCaptcha) {
    Toast("短信验证码格式有误");
    return false;
  } else if (!isAgree.value && !isCheckCaptcha) {
    Toast("请阅读并同意协议");
    return false;
  } else {
    return true;
  }
}

// 倒计时组件工具函数
function countDownStart() {
  countDown.value.start();
}

// 登录相关
const {
  captchaSrc,
  form,
  isDuring,

  handleCountDown,
  handleSubmit,
  handleCaptcha
} = useLogin({ checkForm, countDownStart });

function countDownReset() {
  countDown.value.reset();
}

function countDownFinish() {
  countDownReset();
  isDuring.value = false;
  handleCaptcha();
}
</script>

<style scoped lang="scss">
.login {
  padding-top: 40px;
}

.name {
  margin: 14px 0 20px;
  color: #999;
  font-size: 12px;
  text-align: center;
}

.logo {
  display: block;
  margin: 0 auto;
  width: 60px;
  height: 60px;
  border-radius: 50%;
}

.login-inputs {
  .captcha {
    margin-left: 10px;
    width: 60px;
    height: 28px;
    border-radius: 4px;
  }
}

.login-btns {
  padding: 0 20px;

  .login-btn {
    margin: 30px 0 8px;
    height: 40px;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 30px;
    color: #fff;
    font-weight: bold;
    font-size: 15px;
    //background-color: rgba(255, 85, 41, 0.8);
    background-color: $color-primary;
  }

  .login-agree {
    color: #999;

    a {
      color: #666;
    }
  }
}
</style>
