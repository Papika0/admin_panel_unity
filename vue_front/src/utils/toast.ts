import { toast } from "vue3-toastify";
import "vue3-toastify/dist/index.css";

let isToastShowing = false;

export const toastify = {
  success: (message: string) => {
    if (!isToastShowing) {
      isToastShowing = true;
      toast.success(message, {
        autoClose: 5000,
        onClose: () => {
          isToastShowing = false;
        },
      });
    }
  },
  error: (message: string) => {
    if (!isToastShowing) {
      isToastShowing = true;
      toast.error(message, {
        autoClose: 10000,
        onClose: () => {
          isToastShowing = false;
        },
      });
    }
  },
  warning: (message: string) => {
    if (!isToastShowing) {
      isToastShowing = true;
      toast.warning(message, {
        autoClose: 5000,
        onClose: () => {
          isToastShowing = false;
        },
      });
    }
  },
  info: (message: string) => {
    if (!isToastShowing) {
      isToastShowing = true;
      toast.info(message, {
        autoClose: 5000,
        onClose: () => {
          isToastShowing = false;
        },
      });
    }
  },
};