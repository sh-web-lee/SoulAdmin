<script setup lang="tsx">
import { NButton, NImage, NPopconfirm } from 'naive-ui';
import { fetchGetUserList } from '@/service/api';
import { $t } from '@/locales';
import { useAppStore } from '@/store/modules/app';
import { useTable, useTableOperate } from '@/hooks/common/table';
import UserOperateDrawer from './modules/user-operate-drawer.vue';
import UserSearch from './modules/user-search.vue';

const appStore = useAppStore();

const { columns, columnChecks, data, getData, loading, mobilePagination, searchParams, resetSearchParams } = useTable({
  apiFn: fetchGetUserList,
  showTotal: true,
  apiParams: {
    current: 1,
    size: 10,
    username: '',
    email: '',
    qq: '',
    roles: ''
  },
  columns: () => [
    {
      type: 'selection',
      align: 'center',
      width: 48
    },
    {
      title: $t('page.manage.user.avatar'),
      key: 'avatar',
      render: row => {
        return <NImage src={row.avatar} width={64}></NImage>;
      }
    },
    {
      key: 'username',
      title: $t('page.manage.user.userName'),
      align: 'center',
      minWidth: 100
    },
    {
      key: 'roles',
      title: $t('page.manage.user.userRole'),
      align: 'center',
      minWidth: 100
    },
    {
      key: 'qq',
      title: $t('page.manage.user.qq'),
      align: 'center',
      width: 120
    },
    {
      key: 'email',
      title: $t('page.manage.user.userEmail'),
      align: 'center',
      minWidth: 200
    },
    {
      title: $t('common.createdAt'),
      key: 'createdAt'
    },
    {
      title: $t('common.updatedAt'),
      key: 'updatedAt'
    },
    {
      title: $t('page.manage.user.ip'),
      key: 'ip_address'
    },
    {
      key: 'operate',
      title: $t('common.operate'),
      align: 'center',
      width: 130,
      render: row => (
        <div class="flex-center gap-8px">
          <NButton type="primary" ghost size="small" onClick={() => edit(row.id)}>
            {$t('common.edit')}
          </NButton>
          <NPopconfirm onPositiveClick={() => handleDelete(row.id)}>
            {{
              default: () => $t('common.confirmDelete'),
              trigger: () => (
                <NButton type="error" ghost size="small">
                  {$t('common.delete')}
                </NButton>
              )
            }}
          </NPopconfirm>
        </div>
      )
    }
  ]
});

const {
  drawerVisible,
  operateType,
  editingData,
  handleAdd,
  handleEdit,
  checkedRowKeys,
  onBatchDeleted,
  onDeleted
  // closeDrawer
} = useTableOperate(data, getData, handleDeleteUser);

async function handleBatchDelete() {
  // request
  console.log(checkedRowKeys.value);

  onBatchDeleted();
}

function handleDelete(id: number) {
  // request
  console.log(id);

  onDeleted();
}

function edit(id: number) {
  handleEdit(id);
}

async function handleDeleteUser() {
  return '';
}
</script>

<template>
  <div class="min-h-500px flex-col-stretch gap-16px overflow-hidden lt-sm:overflow-auto">
    <NCard>
      <NCollapse>
        <template #arrow>
          <NIcon>
            <icon-ic-round-search class="text-icon" />
          </NIcon>
        </template>
        <NCollapseItem :title="$t('common.search')">
          <UserSearch v-model:model="searchParams" @reset="resetSearchParams" @search="getData" />
        </NCollapseItem>
      </NCollapse>
    </NCard>
    <NCard :title="$t('page.manage.user.title')" :bordered="false" size="small" class="sm:flex-1-hidden card-wrapper">
      <template #header-extra>
        <TableHeaderOperation
          v-model:columns="columnChecks"
          :disabled-delete="checkedRowKeys.length === 0"
          :loading="loading"
          @add="handleAdd"
          @delete="handleBatchDelete"
          @refresh="getData"
        />
      </template>
      <NDataTable
        v-model:checked-row-keys="checkedRowKeys"
        :columns="columns"
        :data="data"
        size="small"
        :flex-height="!appStore.isMobile"
        :scroll-x="962"
        :loading="loading"
        remote
        :row-key="row => row.id"
        :pagination="mobilePagination"
        class="sm:h-full"
      />
      <UserOperateDrawer
        v-model:visible="drawerVisible"
        :operate-type="operateType"
        :row-data="editingData"
        @submitted="getData"
      />
    </NCard>
  </div>
</template>

<style scoped></style>
