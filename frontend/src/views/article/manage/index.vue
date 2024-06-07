<script lang="tsx" setup>
import { NImage, NSwitch, NTag } from 'naive-ui';
import { fetchArticleList } from '@/service/api';
import { $t } from '@/locales';
import { useTable, useTableOperate } from '@/hooks/common/table';

const { columns, data, getData, columnChecks, loading, mobilePagination } = useTable({
  apiFn: fetchArticleList,
  showTotal: true,
  apiParams: {
    current: 1,
    size: 10,
    article_title: '',
    category: '',
    createdAt: '',
    is_top: 0,
    tags: []
  },
  columns: () => [
    {
      type: 'selection',
      align: 'center'
    },
    {
      key: 'article_title',
      title: $t('page.article.article_title'),
      align: 'center',
      minWidth: 120,
      ellipsis: {
        tooltip: true
      }
    },
    {
      key: 'article_description',
      title: $t('page.article.article_description'),
      width: 160,
      ellipsis: {
        tooltip: true
      }
    },
    {
      key: 'article_cover',
      title: $t('page.article.article_cover'),
      align: 'center',
      width: 100,
      render: row => {
        return <NImage src={row.article_cover} class={'w-160px h-80px rounded-3px overflow-hidden'} />;
      }
    },
    {
      key: 'category',
      title: $t('page.article.category'),
      align: 'center',
      width: 80,
      render: row => {
        return <NTag>{row.category}</NTag>;
      }
    },
    {
      key: 'tags',
      title: $t('page.article.tags'),
      align: 'center',
      minWidth: 200,
      render: row => {
        return (
          <div class={'flex-x-center gap-2px'}>
            {row.tags.map((item: any, index: any) => {
              return (
                <NTag key={index} type="primary">
                  {item}
                </NTag>
              );
            })}
          </div>
        );
      }
    },
    {
      title: $t('page.article.status'),
      key: 'status',
      width: 60,
      render: row => {
        const status: ('error' | 'warning' | 'success')[] = ['success', 'warning', 'error'];
        const text = ['公开', '私密', '草稿箱'];
        return <NTag type={status[row.status - 1]}>{text[row.status - 1]}</NTag>;
      }
    },
    {
      title: $t('page.article.type'),
      key: 'type',
      width: 60,
      render: row => {
        const text = ['原创', '转载', '翻译'];
        return <span>{text[row.type - 1]}</span>;
      }
    },
    {
      title: $t('page.article.createdAt'),
      key: 'createdAt',
      render: row => {
        return <span>{row.createdAt}</span>;
      }
    },
    {
      title: $t('page.article.updatedAt'),
      key: 'updatedAt',
      render: row => {
        return <span>{row.updatedAt}</span>;
      }
    },
    {
      key: 'is_top',
      title: $t('page.article.is_top'),
      align: 'center',
      width: 100,
      render: row => {
        return <NSwitch value={row.is_top} checkedValue={1} uncheckedValue={0} />;
      }
    }
  ]
});

const {
  handleAdd,
  checkedRowKeys
  // closeDrawer
} = useTableOperate(data, getData, async () => {
  return '';
});

async function handleBatchDelete() {
  // request
  console.log(checkedRowKeys.value);
}
</script>

<template>
  <div>
    <NCard :title="$t('page.article.manage.title')" :bordered="false" size="small">
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
        :columns="columns"
        :data="data"
        :loading="loading"
        size="small"
        :pagination="mobilePagination"
        :row-key="row => row.id"
      />
    </NCard>
  </div>
</template>

<style scoped>
:deep(.n-image img) {
  object-fit: cover !important;
  width: 100%;
  height: 100%;
}
</style>
