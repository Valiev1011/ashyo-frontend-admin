<template>
  <div class="w-full my-[10px]">
    <table class="w-[95%]">
      <thead class="bg-global1 text-[white] h-[60px] uppercase">
        <tr>
          <td v-for="(item, index) in headers" :key="index" class="pl-[5px]">
            {{ item.title }}
          </td>
        </tr>
      </thead>
      <tbody class="bg-[#F6FBFF]" v-if="body.length > 0">
        <tr
          v-for="(item, index) in body"
          :key="index"
          :class="{
            'bg-slate-200': index % 2 != 0,
            'border-b-2 border-global1': index == body.length - 1,
          }"
        >
          <td
            v-for="(headerItem, headerIndex) in headers"
            :key="headerIndex"
            class="h-[40px] px-[5px] border-r-2 border-global1"
            :class="{
              'border-none': headerIndex == headers.length - 1,
            }"
          >
            <slot :name="`body_${headerItem.value}`" :item="item">
              {{
                // @ts-ignore
                item[headerItem.value]
              }}
            </slot>
          </td>
        </tr>
      </tbody>
      <div class="w-[100%] text-center text-[20px] text-global1 mt-10" v-else>
        <h2>No data</h2>
      </div>
    </table>
  </div>
</template>

<script setup lang="ts">
  import type { ICategory, IProduct } from "@/types/adminTypes";

  export interface IProps {
    headers: Array<{
      title: string;
      value: string;
    }>;
    body: Array<any>;
  }
  const props = defineProps<IProps>();
</script>

<style lang="scss" scoped></style>
