import { ref, toValue } from 'vue';
import type { ComputedRef, Ref } from 'vue';
import type { FormInst } from 'naive-ui';
import { REG_CODE_SIX, REG_EMAIL, REG_PHONE, REG_PWD, REG_USER_NAME } from '@/constants/reg';
import { $t } from '@/locales';

export function useFormRules() {
  const patternRules = {
    userName: {
      pattern: REG_USER_NAME,
      message: $t('form.userName.invalid'),
      trigger: ['change', 'input']
    },
    phone: {
      pattern: REG_PHONE,
      message: $t('form.phone.invalid'),
      trigger: ['change', 'input']
    },
    pwd: {
      pattern: REG_PWD,
      message: $t('form.pwd.invalid'),
      trigger: ['change', 'input']
    },
    code: {
      pattern: REG_CODE_SIX,
      message: $t('form.code.invalid'),
      trigger: ['change', 'input']
    },
    email: {
      pattern: REG_EMAIL,
      message: $t('form.email.invalid'),
      trigger: ['change', 'input']
    },
    articleDesc: {
      trigger: ['blur', 'input']
    },
    article_category: {
      trigger: ['change']
    },
    article_tag: {
      type: 'array',
      trigger: ['change']
    },
    article_cover: {
      trigger: ['change']
    }
  } satisfies Record<string, App.Global.FormRule>;

  const formRules = {
    userName: [createRequiredRule($t('form.userName.required')), patternRules.userName],
    phone: [createRequiredRule($t('form.phone.required')), patternRules.phone],
    pwd: [createRequiredRule($t('form.pwd.required')), patternRules.pwd],
    code: [createRequiredRule($t('form.code.required')), patternRules.code],
    email: [createRequiredRule($t('form.email.required')), patternRules.email],
    article_description: [createRequiredRule($t('form.articleDesc')), patternRules.articleDesc],
    article_category: [createRequiredRule($t('form.articleCategory')), patternRules.article_category],
    article_tag: [createRequiredRule($t('form.articleCategory')), patternRules.article_tag],
    article_cover: [createRequiredRule($t('form.articleCover')), patternRules.article_cover]
  } satisfies Record<string, App.Global.FormRule[]>;

  /** the default required rule */
  const defaultRequiredRule = createRequiredRule($t('form.required'));

  function createRequiredRule(message: string): App.Global.FormRule {
    return {
      required: true,
      message
    };
  }

  /** create a rule for confirming the password */
  function createConfirmPwdRule(pwd: string | Ref<string> | ComputedRef<string>) {
    const confirmPwdRule: App.Global.FormRule[] = [
      { required: true, message: $t('form.confirmPwd.required') },
      {
        asyncValidator: (rule, value) => {
          if (value.trim() !== '' && value !== toValue(pwd)) {
            return Promise.reject(rule.message);
          }
          return Promise.resolve();
        },
        message: $t('form.confirmPwd.invalid'),
        trigger: 'input'
      }
    ];
    return confirmPwdRule;
  }

  return {
    patternRules,
    formRules,
    defaultRequiredRule,
    createRequiredRule,
    createConfirmPwdRule
  };
}

export function useNaiveForm() {
  const formRef = ref<FormInst | null>(null);

  async function validate() {
    await formRef.value?.validate();
  }

  async function restoreValidation() {
    formRef.value?.restoreValidation();
  }

  return {
    formRef,
    validate,
    restoreValidation
  };
}
