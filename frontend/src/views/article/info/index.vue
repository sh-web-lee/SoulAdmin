<script lang="ts" setup>
import { onMounted, reactive, ref } from 'vue';
import type { FormInst, UploadFileInfo } from 'naive-ui';
import { fetchBlogSiteConfig, updateBlogSiteConfig } from '@/service/api';
import { useLoading } from '~/packages/hooks/src';
import { $t } from '../../../locales';

const { loading, startLoading, endLoading } = useLoading();
const { loading: skeLoading, startLoading: startSkeLoading, endLoading: endSkeLoading } = useLoading();

const editEnabled = ref(true);
const fileList = ref<UploadFileInfo[]>([]);

const model = reactive<Api.Blog.SiteInfo>(createDefaultModel());
const originModel = reactive<Api.Blog.SiteInfo>(createDefaultModel());
function createDefaultModel(): Api.Blog.SiteInfo {
  return {
    blog_name: 'lee malachi Blog',
    personal_say: 'I’m a Front-end development engineer, javascript, css, vue, nodejs python, blog',
    gitee_link: 'https://gitee.com/leefath',
    github_link: 'https://github.com/sh-web-lee',
    avatar_bg: '',
    blog_avatar: '',
    notice: ''
  };
}
const formRef = ref<FormInst | null>(null);
const rules = {};

function init() {
  getData();
}

function handleEdit() {
  editEnabled.value = !editEnabled.value;
  fileList.value = [
    {
      status: 'finished',
      name: '',
      url: model.blog_avatar,
      id: 'avatar'
    }
  ];
}

async function getData() {
  startSkeLoading();
  const { data } = await fetchBlogSiteConfig();
  if (data) {
    Object.assign(model, data);
    Object.assign(originModel, { ...data });
  }
  endSkeLoading();
}

async function handleSubmit() {
  startLoading();
  const { error } = await updateBlogSiteConfig(model);
  if (!error) {
    window.$message?.success($t('common.updateSuccess'));
    editEnabled.value = !editEnabled.value;
    getData();
  }
  endLoading();
}

function handleCancel() {
  Object.assign(model, originModel);
  editEnabled.value = !editEnabled.value;
}

function handleUpdateFileList() {}
function handleRemove() {}

onMounted(() => {
  init();
});
</script>

<template>
  <div class="">
    <NCard :title="$t('page.article.site_info.title')">
      <template #header-extra>
        <div class="flex gap-12px">
          <NButton v-if="editEnabled" type="primary" secondary @click="handleEdit">
            {{ $t('common.edit') }}
          </NButton>
          <NButton v-if="!editEnabled" secondary @click="handleCancel">{{ $t('common.cancel') }}</NButton>
          <NButton v-if="!editEnabled" type="primary" :loading="loading" secondary @click="handleSubmit">
            {{ $t('common.confirm') }}
          </NButton>
        </div>
      </template>
      <NSpace v-if="skeLoading" vertical class="pl-120px">
        <NGrid :cols="24" :x-gap="24" :y-gap="20">
          <NGridItem :span="12">
            <NSkeleton height="96px" circle />
          </NGridItem>
          <NGridItem :span="12">
            <!-- <NSkeleton height="34px" round /> -->
          </NGridItem>
          <NGridItem :span="12">
            <NSkeleton height="34px" round />
          </NGridItem>
          <NGridItem :span="12">
            <NSkeleton height="34px" round />
          </NGridItem>
          <NGridItem :span="12">
            <NSkeleton height="34px" round />
          </NGridItem>
          <NGridItem :span="12">
            <NSkeleton height="34px" round />
          </NGridItem>
        </NGrid>
      </NSpace>
      <NForm
        v-else
        ref="formRef"
        label-placement="left"
        :disabled="editEnabled"
        :label-width="120"
        :model="model"
        :rules="rules"
      >
        <NGrid :cols="24" :x-gap="24">
          <NFormItemGi :label="$t('page.article.site_info.form.blog_avatar')" :span="12">
            <NImage
              v-show="editEnabled"
              :src="model.blog_avatar"
              object-fit="cover"
              class="h-96px w-96px rounded-full"
            />
            <NUpload
              v-show="!editEnabled"
              v-model:file-list="fileList"
              data-role="upload"
              style="--n-border-radius: 50%; --n-item-border-image-card: 0px"
              accept="image/*"
              :max="1"
              list-type="image-card"
              show-preview-button
              @update:file-list="handleUpdateFileList"
              @remove="handleRemove"
            />
          </NFormItemGi>
          <NFormItemGi></NFormItemGi>
          <NFormItemGi :label="$t('page.article.site_info.form.blog_name')" :span="12">
            <NInput
              v-model:value="model.blog_name"
              :placeholder="$t('page.article.site_info.form.site_name_placeholder')"
            />
          </NFormItemGi>
          <NFormItemGi :label="$t('page.article.site_info.form.personal_say')" :span="12">
            <NInput
              v-model:value="model.personal_say"
              :placeholder="$t('page.article.site_info.form.per_say_placeholder')"
            />
          </NFormItemGi>
          <NFormItemGi :label="$t('page.article.site_info.form.github_link')" :span="12">
            <NInput
              v-model:value="model.github_link"
              :placeholder="$t('page.article.site_info.form.github_placeholder')"
            />
          </NFormItemGi>
          <NFormItemGi :label="$t('page.article.site_info.form.gitee_link')" :span="12">
            <NInput
              v-model:value="model.gitee_link"
              :placeholder="$t('page.article.site_info.form.gitee_placeholder')"
            />
          </NFormItemGi>
          <NFormItemGi :label="$t('page.article.site_info.form.notice')" :span="12">
            <NInput v-model:value="model.notice" :placeholder="$t('page.article.site_info.form.notice_placeholder')" />
          </NFormItemGi>
        </NGrid>
      </NForm>
    </NCard>
  </div>
</template>

<style scoped>
:deep(.n-upload .n-image) {
  width: 100%;
  height: 100%;
}
:deep(img) {
  width: 100%;
  height: 100%;
  object-fit: cover !important;
}
</style>
