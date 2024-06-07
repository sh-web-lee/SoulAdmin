<script lang="tsx" setup>
import { ref } from 'vue';
import { NButton, NPopconfirm } from 'naive-ui';
import { deleteCategory, fetchCategoryList } from '@/service/api';
import { $t } from '@/locales';
import { useTable, useTableOperate } from '@/hooks/common/table';
import CategoryOperateDrawer from './modules/category-operate-drawer.vue';

const { columns, columnChecks, data, getData, loading, mobilePagination } = useTable({
  apiFn: fetchCategoryList,
  showTotal: true,
  apiParams: {
    current: 1,
    size: 10,
    info: ''
  },
  columns: () => [
    {
      type: 'selection',
      align: 'center',
      width: 48
    },
    {
      key: 'index',
      title: $t('common.index'),
      align: 'center',
      width: 64
    },
    {
      key: 'name',
      title: $t('page.article.category_manage.table.name'),
      align: 'center',
      minWidth: 100
    },
    {
      key: 'createdAt',
      title: $t('page.article.category_manage.table.createdAt'),
      align: 'center'
    },
    {
      key: 'updatedAt',
      title: $t('page.article.category_manage.table.updatedAt'),
      align: 'center'
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
} = useTableOperate(data, getData, handleDeleteCategory);

const deleteIds = ref<number[]>([]);

async function handleBatchDelete() {
  // request
  deleteIds.value = checkedRowKeys.value;

  onBatchDeleted();
}

function handleDelete(id: number) {
  // request
  deleteIds.value = [id];

  onDeleted();
}

function edit(id: number) {
  handleEdit(id);
}

async function handleDeleteCategory() {
  const { error } = await deleteCategory({ ids: deleteIds.value });
  if (!error) {
    window.$message?.success($t('common.deleteSuccess'));
    return Promise.resolve('success');
  }
  return Promise.reject(error);
}
</script>

<template>
  <div class="">
    <NCard
      :title="$t('page.article.category_manage.pageTitle')"
      :bordered="false"
      size="small"
      class="sm:flex-1-hidden card-wrapper"
    >
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
        :scroll-x="962"
        :loading="loading"
        remote
        :row-key="row => row.id"
        :pagination="mobilePagination"
        class="sm:h-full"
      />
      <CategoryOperateDrawer
        v-model:visible="drawerVisible"
        :operate-type="operateType"
        :row-data="editingData"
        @submitted="getData"
      />
    </NCard>
  </div>
</template>

<style lang="scss" scoped></style>
