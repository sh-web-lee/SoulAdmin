<script setup lang="ts">
interface Props {
  name: string;
  width: string | number;
  size: string | number;
  weight?: string | number;
  align: string;
  lineHeight?: number;
}
const props = defineProps<Props>();

const tooltipDisabled = ref(true);

const onMouseEnter = () => {
  const nameNode = document.querySelector(`[data-name="${props.name}"]`) as HTMLElement;
  if (nameNode) {
    // 当元素滚动宽度超过当前宽度的时候，就显示tooltip
    if (nameNode.offsetWidth < nameNode.scrollWidth) {
      tooltipDisabled.value = false;
    } else {
      tooltipDisabled.value = true;
    }
  }
};
</script>

<template>
  <ElTooltip :content="name" placement="top" effect="light" :disabled="tooltipDisabled">
    <span
      class="tooltip-text-overflow"
      :style="`width: ${width};font-size:${size};font-weight: ${weight};text-align: ${align};line-height: ${lineHeight}`"
      :data-name="name"
      @mouseenter="onMouseEnter"
    >
      {{ name }}
    </span>
  </ElTooltip>
</template>

<style lang="scss">
.tooltip-text-overflow {
  display: inline-block;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  cursor: pointer;
  color: #fff;
}
</style>
