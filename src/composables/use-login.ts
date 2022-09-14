import { getCaptcha, getUcardLogin, getUcardSMS } from "@/api/user";
import { throttle } from "@/utils/debounced";
import { Toast } from "vant";

export default function useLogin({
  checkForm,
  countDownStart
}: {
  checkForm: CheckForm;
  countDownStart: Fn;
}): any {
  const userStore = useUserStore();
  const route = useRoute();
  const router = useRouter();

  const form = ref<LoginForm>({
    mobile: "",
    captcha: "",
    sms: "",
    randomCode: ""
  });
  const captchaSrc = ref("");
  const isDuring = ref(false); // 短信验证码发送中

  // 立即登录
  const handleSubmit = throttle(async function () {
    if (!checkForm(false)) return;
    const res = await login();
    userStore.updateUser(res);

    const redirectPath = route.query.redirect_path;
    if (redirectPath) {
      router.push({
        path: decodeURIComponent(String(redirectPath))
      });
    } else {
      router.back();
    }
  }, 3000);

  // 获取验证码
  const handleCountDown = throttle(async function () {
    console.log("handleCountDown");
    if (isDuring.value) return false;
    if (!checkForm(true)) return false;
    await getSMSCode();

    isDuring.value = true;
    countDownStart();
  }, 3000);

  // 获取图形验证码接口
  async function handleCaptcha(): Promise<void> {
    const result = await getCaptcha();
    ({ random: form.value.randomCode, base64Image: captchaSrc.value } = result);
  }

  // 发送验证码接口
  async function getSMSCode(): Promise<any> {
    const result = await getUcardSMS(form.value);
    Toast("发送成功");
    return result;
  }

  // 登录/注册
  async function login(): Promise<any> {
    return await getUcardLogin({
      mobile: form.value.mobile,
      smsCode: form.value.sms
    });
  }

  onBeforeMount(() => {
    handleCaptcha();
  });

  return {
    form,
    isDuring,
    captchaSrc,

    handleCountDown,
    handleSubmit,
    handleCaptcha
  };
}
