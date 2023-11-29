import "./assets/main.css";

import { createApp } from "vue";
import { createPinia } from "pinia";

import App from "./App.vue";
import router from "./router";
import veeValidatePlugins from "./plugins/vee-validate";
import VueTheMask from "vue-the-mask";

const app = createApp(App);

app.use(createPinia());
app.use(router);
app.use(VueTheMask);
app.use(veeValidatePlugins);

app.mount("#app");
