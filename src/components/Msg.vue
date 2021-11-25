<script lang="ts" setup>
interface IProps {
  accountImgUrl: string;
  accountName: string;
  msg: string;
}
// eslint-disable-next-line no-undef
const props = defineProps<IProps>();
</script>

<template>
  <div class="bg-gray-50 p-4 my-1 rounded-md backdrop-blur-lg">
    <div class="flex flex-row items-center">
      <img
        :src="props.accountImgUrl"
        alt="account"
        width="36"
        height="36"
        style="width: 36px; height: 36px"
        class="rounded-full border-2 flex items-center justify-center"
      />
      <h3 class="font-bold ml-3">{{ props.accountName }}</h3>
    </div>
    <div class="text-left whitespace-pre-line">{{ props.msg }}</div>
  </div>
</template>
