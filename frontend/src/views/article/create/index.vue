<script setup lang="ts">
import type { AxiosProgressEvent } from '@sa/axios';
import { MdEditor } from 'md-editor-v3';
import 'md-editor-v3/lib/style.css';
import { computed, onMounted, reactive, ref } from 'vue';
import type { FormInst, SelectOption, UploadFileInfo } from 'naive-ui';
import { $t } from '@/locales';
import { useAppStore } from '@/store/modules/app';
import { useAuthStore } from '@/store/modules/auth';
import { useFormRules } from '@/hooks/common/form';
import { addArticle, deleteImg, fetchArticleCat, fetchArticleTags, uploadImg } from '@/service/api';
import { useLoading } from '~/packages/hooks/src';
import { transformImageToBase64 } from '@/utils/common';

const appStore = useAppStore();
const authStore = useAuthStore();
const { loading, startLoading, endLoading } = useLoading();

// type Model =
const model = reactive<Api.Blog.CreateArticle>(createDefaultModel());
function createDefaultModel(): Api.Blog.CreateArticle {
  return {
    article_title: '',
    author_id: 0,
    article_content: '',
    article_cover: '',
    article_description: '',
    category_name: null,
    tags: [],
    is_top: 0,
    status: 1,
    type: 1
  };
}

const statusOptions = ref([
  { label: 'public', value: 1 },
  { label: 'private', value: 2 },
  { label: 'draft', value: 3 }
]);
const typeOptions = ref([
  { label: 'original', value: 1 },
  { label: 'reprint', value: 2 },
  { label: 'translate', value: 3 }
]);

type ModelRules = Extract<keyof Api.Blog.CreateArticle, 'desc'>;

const formRef = ref<FormInst | null>(null);
const rules = computed<Record<ModelRules, App.Global.FormRule[]>>(() => {
  // inside computed to make locale reactive, if not apply i18n, you can define it without computed
  const { formRules } = useFormRules();

  return {
    article_description: formRules.article_description,
    category_name: formRules.article_category,
    article_cover: formRules.article_cover,
    tags: formRules.article_tag,
    origin_url: {
      trigger: 'input',
      validator(_rule: any, value: string) {
        if (model.type !== 1 && !value) {
          return new Error($t('page.article.create.originUrlPlaceholder'));
        }
        return true;
      }
    }
  };
});

const editorHeight = computed(() => {
  return {
    height: `calc(100vh - ${appStore.fullContent ? '296px' : '312px'})`
  };
});

const catOptions = ref<SelectOption[]>([]);
const tagsOptions = ref<SelectOption[]>([]);

async function getCategoryData() {
  const { data } = await fetchArticleCat();
  const result = data?.items || [];
  // console.log(data);
  catOptions.value = result.map(item => {
    return {
      label: item.name,
      value: item.name
    };
  });
}

async function getTagData() {
  const { data } = await fetchArticleTags();
  const result = data?.items || [];
  // console.log(data);
  tagsOptions.value = result.map(item => {
    return {
      label: item.tag_name,
      value: item.tag_name
    };
  });
}

const UploadList = ref<UploadFileInfo[]>([]);

async function handleChange(file: UploadFileInfo) {
  // console.log(options.file);
  const base64URL = await transformImageToBase64(file.file);
  const resultFile: UploadFileInfo = {
    ...file,
    status: 'uploading',
    url: base64URL
  };
  UploadList.value = [resultFile];
  const param = new FormData(); // 创建form对象
  param.append('file', file.file as File);
  const { data } = await uploadImg(param, onHandleUploadProgress);
  if (!data) {
    UploadList.value = [];
  } else {
    resultFile.url = data.url;
    resultFile.status = 'finished';
    UploadList.value = [resultFile];
    model.article_cover = data.url;
    window.$message?.success($t('common.uploadSuccess'));
  }
}

async function uploadImage(files: File[], callback: (urls: string[]) => void) {
  const res = await Promise.all(
    files.map(file => {
      const param = new FormData(); // 创建form对象
      param.append('file', file);
      return new Promise((resolve, reject) => {
        uploadImg(param)
          .then(data => {
            if (data.data) {
              const { url } = data.data;
              resolve(url);
            }
          })
          .catch(err => {
            reject(err);
          });
      });
    })
  );

  callback(res as string[]);
}

async function handleUpdateFileList() {
  // UploadList.value = fileList;
  model.article_cover = 'url';
  if (UploadList.value.length) {
    const file = UploadList.value[0];
    await handleChange(file);
  }
}

function onHandleUploadProgress(progressEvent: AxiosProgressEvent) {
  UploadList.value[0].percentage = Math.round((progressEvent.loaded / (progressEvent.total as number)) * 10000) / 100.0;
}

async function handleRemove() {
  const url = UploadList.value[0].url!;
  const { error } = await deleteImg({ url });
  if (!error) {
    window.$message?.success($t('common.deleteSuccess'));
  }
}

async function handleSubmit() {
  await formRef.value?.validate();
  startLoading();
  const { error } = await addArticle(model);
  if (!error) {
    window.$message?.success($t('common.addSuccess'));
    Object.assign(model, createDefaultModel());
    UploadList.value = [];
  }
  endLoading();
}

onMounted(async () => {
  startLoading();
  const defaultModel = { ...createDefaultModel(), author_id: authStore.userInfo.id };
  Object.assign(model, defaultModel);
  await getCategoryData();
  await getTagData();
  endLoading();
});
</script>

<template>
  <NSpin :show="loading">
    <div class="rounded-8px bg-[#fff]">
      <div class="flex items-center justify-between p-16px">
        <div class="text-18px font-bold">{{ $t('page.article.create.title') }}</div>
        <div>
          <NButton type="primary" @click="handleSubmit">{{ $t('page.article.create.saveButton') }}</NButton>
        </div>
      </div>
      <div class="h-1px w-full bg-[#e5e7eb]"></div>
      <NGrid cols="4" item-responsive>
        <NGridItem span="0 400:1 600:2 800:3">
          <div class="p-12px">
            <NInput
              v-model:value="model.article_title"
              :bordered="false"
              size="large"
              :placeholder="$t('page.article.create.titlePlaceholder')"
              class="font-bold"
            />
            <div class="rounded-xl">
              <MdEditor v-model="model.article_content" :style="editorHeight" @upload-img="uploadImage" />
            </div>
          </div>
        </NGridItem>
        <NGridItem>
          <div class="h-full b-l">
            <NCard
              class="h-full"
              style="--n-padding-left: 0px"
              :bordered="false"
              size="small"
              :segmented="{
                content: true
              }"
            >
              <template #header>
                <div class="flex items-center gap-8px px-16px text-18px font-bold">
                  <SvgIcon icon="subway:settong"></SvgIcon>
                  {{ $t('page.article.create.settingTitle') }}
                </div>
              </template>
              <template #default>
                <NScrollbar style="max-height: calc(100vh - 340px)" class="px-16px">
                  <NForm ref="formRef" :rules="rules" :model="model">
                    <NFormItem path="category_name" :label="$t('page.article.category')">
                      <NSelect
                        v-model:value="model.category_name"
                        :options="catOptions"
                        clearable
                        :placeholder="$t('page.article.create.categoryPlaceholder')"
                      />
                    </NFormItem>
                    <NFormItem path="tags" :label="$t('page.article.tags')">
                      <NSelect
                        v-model:value="model.tags"
                        multiple
                        tag
                        filterable
                        clearable
                        :options="tagsOptions"
                        :placeholder="$t('page.article.create.tagPlaceholder')"
                      />
                    </NFormItem>
                    <NFormItem path="desc" :label="$t('page.article.create.description')">
                      <NInput
                        v-model:value="model.article_description"
                        :rows="4"
                        type="textarea"
                        :placeholder="$t('page.article.create.descPlaceholder')"
                      />
                    </NFormItem>
                    <NFormItem path="article_cover" :label="$t('page.article.create.cover')">
                      <NUpload
                        v-model:file-list="UploadList"
                        style="--n-item-border-image-card: 0px"
                        accept="image/*"
                        :max="1"
                        list-type="image-card"
                        show-preview-button
                        @update:file-list="handleUpdateFileList"
                        @remove="handleRemove"
                      />
                    </NFormItem>
                    <NFormItem :label="$t('page.article.create.isTop')">
                      <NSwitch v-model:value="model.is_top" :checked-value="1" :unchecked-value="0" />
                    </NFormItem>
                    <NFormItem :label="$t('page.article.status')">
                      <NRadioGroup v-model:value="model.status" name="radiogroup">
                        <NSpace>
                          <NRadio v-for="status in statusOptions" :key="status.value" :value="status.value">
                            {{ $t(`page.article.statusOption.${status.label}`) }}
                          </NRadio>
                        </NSpace>
                      </NRadioGroup>
                    </NFormItem>
                    <NFormItem :label="$t('page.article.type')">
                      <NRadioGroup v-model:value="model.type" name="radiogroup">
                        <NSpace>
                          <NRadio v-for="status in typeOptions" :key="status.value" :value="status.value">
                            {{ $t(`page.article.typeOption.${status.label}`) }}
                          </NRadio>
                        </NSpace>
                      </NRadioGroup>
                    </NFormItem>
                    <NFormItem v-show="model.type !== 1" :label="$t('page.article.origin_url')" path="origin_url">
                      <NInput
                        v-model:value="model.origin_url"
                        :resizable="false"
                        type="textarea"
                        maxlength="255"
                        show-count
                        :placeholder="$t('page.article.create.originUrlPlaceholder')"
                      />
                    </NFormItem>
                  </NForm>
                </NScrollbar>
              </template>
            </NCard>
          </div>
        </NGridItem>
      </NGrid>
    </div>
  </NSpin>
</template>

<style scoped>
:deep(.n-upload-trigger.n-upload-trigger--image-card) {
  width: 260px;
  height: 150px;
}
:deep(.n-upload-file-list .n-upload-file.n-upload-file--image-card-type) {
  width: 260px;
  height: 150px;
}
:deep(.n-upload-file-list img) {
  object-fit: cover !important;
}
</style>
