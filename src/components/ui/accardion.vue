<template>
  <div class="demo-collapse mt-[30px]">
    <el-collapse
      v-model="activeNames"
      @change="handleChange"
      v-for="(item, index) in data"
      :key="index"
    >
      <el-collapse-item :name="index">
        <template #title>
          <span class="text-[18px]">{{
            `${index + 1}. ${item?.student?.first_name} ${
              item?.student?.last_name
            }`
          }}</span>
        </template>
        <div class="w-full flex gap-2 flex-wrap">
          <div v-for="(attendance, index2) in item?.attendance" :key="index2">
            <el-popover
              placement="top-start"
              :title="formatDate(attendance?.date)"
              :width="200"
              trigger="hover"
              transition="100 linear"
              :content="attendance?.comment"
            >
              <template #reference>
                <div
                  class="w-[40px] h-[40px] cursor-pointer border-[1px] px-[5px] text-global1 border-global1 flex items-center"
                  :class="
                    attendance?.comment
                      ? 'bg-[gray] text-[#fff]'
                      : !attendance?.participated ? 'bg-[crimson] text-[#fff] border-none' : ''
                  "
                  @click="modal_value.openModal(attendance)"
                >
                  {{ formatDateAttendance(attendance?.date) }}
                </div>
              </template>
            </el-popover>
          </div>
        </div>
      </el-collapse-item>
    </el-collapse>
  </div>
</template>

<script setup>
  import { formatDate, formatDateAttendance } from "../../plugins/format";
  const props = defineProps({
    data: {
      type: Array,
    },
    modal_value: {
      type: String,
    },
  });
</script>

<style lang="scss" scoped></style>
