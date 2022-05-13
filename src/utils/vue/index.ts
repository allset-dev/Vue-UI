import { ref } from "vue";

import { DEFAULT_DEBOUNCE } from "@/constants";
import { AxiosPromise, AxiosResponse } from "axios";

export function useDebounce(callback: (...args: any) => void) {
  const fetchServicesTimer = ref();

  return (...args: any) => {
    if (fetchServicesTimer.value) {
      clearTimeout(fetchServicesTimer.value);
    }

    fetchServicesTimer.value = setTimeout(
      () => callback(...args),
      DEFAULT_DEBOUNCE
    );
  };
}

type useApiProps = (...args: any) => AxiosPromise<any>;
type promiseRes = (value: AxiosResponse<any, any>) => void;
type promiseRej = (error: any) => void;

export function useApi(api: useApiProps) {
  const axiosCancelToken = ref();
  const isLoading = ref(false);
  const isError = ref(false);
  const errorMsg = ref("");

  async function fetch(...args: any) {
    if (isLoading.value) {
      cancel();
    } else {
      isLoading.value = true;
      errorMsg.value = "";
      isError.value = false;
    }

    axiosCancelToken.value = new AbortController();

    return new Promise((res: promiseRes, rej: promiseRej) => {
      api(axiosCancelToken.value.signal, ...args)
        .then((response) => {
          isLoading.value = false;
          res(response);
        })
        .catch((error) => {
          isLoading.value = false;
          errorMsg.value = error.message;
          isError.value = true;
          rej(error);
        });
    });
  }

  function cancel() {
    axiosCancelToken.value.abort();
  }

  return { fetch, cancel, isL: isLoading, isE: isError, errorMsg };
}
