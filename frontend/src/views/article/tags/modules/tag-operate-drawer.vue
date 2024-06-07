<script setup lang="ts">
import { computed, reactive, watch } from 'vue';
import { useLoading } from '@sa/hooks';
import { useFormRules, useNaiveForm } from '@/hooks/common/form';
import { addTag, updateTag } from '@/service/api';
import { $t } from '@/locales';

defineOptions({
  name: 'TagOperateDrawer'
});

interface Props {
  /** the type of operation */
  operateType: NaiveUI.TableOperateType;
  /** the edit row data */
  rowData?: Api.Blog.ArticleTag | null;
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
    add: $t('page.article.tag_manage.operateDrawer.addTag'),
    edit: $t('page.article.tag_manage.operateDrawer.editTag')
  };
  return titles[props.operateType];
});

type Model = Pick<Api.Blog.ArticleTag, 'id' | 'tag_name'>;

const model: Model = reactive(createDefaultModel());

function createDefaultModel(): Model {
  return {
    id: 0,
    tag_name: ''
  };
}

type RuleKey = Extract<keyof Model, 'name'>;

const rules: Record<RuleKey, App.Global.FormRule> = {
  name: defaultRequiredRule
};

function handleInitModel() {
  Object.assign(model, createDefaultModel());

  if (props.operateType === 'edit' && props.rowData) {
    Object.assign(model, { id: props.rowData.id, tag_name: props.rowData.tag_name });
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
      const { error } = await addTag(model);
      if (!error) {
        window.$message?.success($t('common.addSuccess'));
      }
      return Boolean(error);
    },
    edit: async () => {
      const { error } = await updateTag(model);
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
        <NFormItem :label="$t('page.article.tag_manage.table.name')" path="tag_name">
          <NInput
            v-model:value="model.tag_name"
            :placeholder="$t('page.article.tag_manage.operateDrawer.nameInputPlaceholder')"
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
