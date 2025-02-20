import Alert from "./Alert.vue";
import DismissButton from "./DismissButton.vue";

const AlertComponent = Object.assign({}, Alert, {
  DismissButton: DismissButton,
});

export type { Variant } from "./Alert.vue";
export default AlertComponent;
