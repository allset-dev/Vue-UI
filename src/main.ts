import { createApp } from "vue";

import router from "@/routes";
import App from "@/views/app/index.vue";
import store from "@/store";
import Kongponents from "@kong/kongponents";

import "./registerServiceWorker";

import "@/styles/index.scss";
import "/node_modules/@kong/kongponents/dist/style.css";

createApp(App).use(Kongponents).use(store).use(router).mount("#root");
