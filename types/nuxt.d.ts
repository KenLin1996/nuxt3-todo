import { AxiosInstance } from "axios";

// 告訴 TypeScript，當使用 useNuxtApp() 獲取 nuxtApp 時，
// $api 和 $apiAuth 是 AxiosInstance 類型

declare module "#app" {
  interface NuxtApp {
    $api: AxiosInstance;
    $apiAuth: AxiosInstance;
  }
}
