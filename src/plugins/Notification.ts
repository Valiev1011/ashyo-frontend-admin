import { toast } from "vue3-toastify";

export const danger = (text: any) => {
  return toast.error(text);
};
export const info = (text: any) => {
  return toast.info(text);
};
export const warning = (text: any) => {
  return toast.warn(text);
};
export const success = (text: any) => {
  return toast.success(text);
};
