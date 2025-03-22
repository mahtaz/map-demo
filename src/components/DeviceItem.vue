<template>
  <div
    class="flex items-center gap-3 mb-2 mr-4 p-2 bg-gray-100 hover:bg-gray-200 rounded-md transition"
  >
    <img :src="device.image" class="w-14 h-14 rounded-md object-cover border" />
    <div>
      <div class="text-sm font-semibold text-gray-700">
        {{ capitalizeFirstLetter(device.type) }}
      </div>
      <div class="text-sm text-gray-600">
        <div v-if="device.temperature">
          <font-awesome-icon
            class="text-gray-600 w-4"
            :icon="['fa', 'temperature-0']"
          />
          {{ device.temperature }}
        </div>
        <div v-if="device.speed">
          <font-awesome-icon
            :icon="['fa', 'gauge-simple']"
            class="text-gray-600 w-4"
          />
          {{ device.speed }}
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  device: {
    type: Object,
    required: true,
  },
});

function capitalizeFirstLetter(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}
</script>
