<script setup lang="ts">
import { computed, reactive, watch } from 'vue';
import { useLoading } from '@sa/hooks';
import { useFormRules, useNaiveForm } from '@/hooks/common/form';
import { createCategory, updateCategory } from '@/service/api';
import { $t } from '@/locales';

defineOptions({
  name: 'CategoryOperateDrawer'
});

interface Props {
  /** the type of operation */
  operateType: NaiveUI.TableOperateType;
  /** the edit row data */
  rowData?: Api.Blog.CategoryItem | null;
}

const props = defineProps<Props>();

interface Emits {
  (e: 'submitted'): void;
}

const emit = defineEmits<Emits>();

const visible = defineModel<boolean>('visible', {
  default: false
});

const { formRef, validate, restoreValidation } = useNaiveForm();
const { defaultRequiredRule } = useFormRules();
const { loading, startLoading, endLoading } = useLoading();

const title = computed(() => {
  const titles: Record<NaiveUI.TableOperateType, string> = {
    add: $t('page.article.category_manage.operateDrawer.addCategory'),
    edit: $t('page.article.category_manage.operateDrawer.editCategory')
  };
  return titles[props.operateType];
});

type Model = Api.Blog.Category;

const model: Model = reactive(createDefaultModel());

function createDefaultModel(): Model {
  return {
    id: 0,
    name: ''
  };
}

type RuleKey = Extract<keyof Model, 'name'>;

const rules: Record<RuleKey, App.Global.FormRule> = {
  name: defaultRequiredRule
};

function handleInitModel() {
  Object.assign(model, createDefaultModel());

  if (props.operateType === 'edit' && props.rowData) {
    Object.assign(model, { id: props.rowData.id, name: props.rowData.name });
  }
}

function closeDrawer() {
  visible.value = false;
}

async function handleSubmit() {
  await validate();
  startLoading();
  // request
  const handlers: Record<NaiveUI.TableOperateType, () => Promise<boolean>> = {
    add: async () => {
      const { error } = await createCategory(model);
      if (!error) {
        window.$message?.success($t('common.addSuccess'));
      }
      return Boolean(error);
    },
    edit: async () => {
      const { error } = await updateCategory(model);
      if (!error) {
        window.$message?.success($t('common.updateSuccess'));
      }
      return Boolean(error);
    }
  };

  const errorFlag = await handlers[props.operateType]();
  if (!errorFlag) {
    closeDrawer();
    emit('submitted');
  }
  endLoading();
}

watch(visible, () => {
  if (visible.value) {
    handleInitModel();
    restoreValidation();
  }
});
</script>

<template>
  <NDrawer v-model:show="visible" display-directive="show" :width="360" auto-fucos>
    <NDrawerContent :title="title" :native-scrollbar="false" closable>
      <NForm ref="formRef" :model="model" :rules="rules">
        <NFormItem :label="$t('page.article.category_manage.table.name')" path="name">
          <NInput
            v-model:value="model.name"
            :placeholder="$t('page.article.category_manage.operateDrawer.nameInputPlaceholder')"
          />
        </NFormItem>
      </NForm>
      <template #footer>
        <NSpace :size="16">
          <NButton @click="closeDrawer">{{ $t('common.cancel') }}</NButton>
          <NButton type="primary" :loading="loading" @click="handleSubmit">{{ $t('common.confirm') }}</NButton>
        </NSpace>
      </template>
    </NDrawerContent>
  </NDrawer>
</template>

<style scoped></style>
