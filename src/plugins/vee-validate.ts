import type { App } from "vue";
import { Form, Field, ErrorMessage, defineRule, configure } from "vee-validate";
import { required, min, max, email } from "@vee-validate/rules";

// Define the RuleName type
type RuleName = "required" | "min" | "max" | "email";

const messages: Record<RuleName, string> = {
  required: "The field is required",
  min: "The field is too short",
  max: "The field is too long",
  email: "The field is not an email",
};

export default {
  install(app: App): void {
    app.component("VeeForm", Form);
    app.component("VeeField", Field);
    app.component("ErrorMessage", ErrorMessage);

    defineRule("required", required);
    defineRule("min", min);
    defineRule("max", max);
    defineRule("email", email);

    configure({
      generateMessage: (ctx: any) => {
        return messages[ctx.rule.name as RuleName]
          ? messages[ctx.rule.name as RuleName]
          : `${ctx} kiritilmadi`;
      },
      validateOnBlur: true,
      validateOnChange: true,
      validateOnInput: true,
      validateOnModelUpdate: true,
    });
  },
};
