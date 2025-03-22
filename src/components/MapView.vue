<template>
  <div class="h-screen w-full flex flex-col p-4">
    <div class="flex items-center gap-2 bg-white">
      <div class="text-xl mb-5 font-semibold text-gray-700">
        CloudCities Device Map
      </div>
    </div>

    <div class="flex flex-1 overflow-hidden">
      <div class="w-90 bg-white shadow-md overflow-y-auto">
        <div v-if="visibleDevices.length">
          <DeviceItem
            v-for="device in visibleDevices"
            :key="device.id"
            :device="device"
          />
        </div>
        <div v-else class="text-gray-500">
          <h3 class="text-lg font-medium">No Visible Devices :(</h3>
        </div>
      </div>

      <div ref="mapContainer" id="map" />
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import {
  capitalizeFirstLetter,
  deviceIcons,
  generateRandomDevices,
} from "@/helpers.js";
import DeviceItem from "./DeviceItem.vue";

const mapContainer = ref(null);
const map = ref(null);
const devices = ref([]);
const visibleDevices = ref([]);
const markers = ref([]);

function updateDevices() {
  if (!map.value) {
    return;
  }
  const bounds = map.value.getBounds();
  visibleDevices.value = devices.value.filter((device) =>
    bounds.contains([device.lat, device.lon]),
  );
}

function initMap() {
  map.value = L.map(mapContainer.value).setView([51.505, -0.09], 14);
}

function setupTiles() {
  L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
    maxZoom: 19,
  }).addTo(map.value);
}

function loadDevices() {
  devices.value = generateRandomDevices(15);
}

function addMarkers() {
  markers.value = devices.value.map((device) => {
    const marker = L.marker([device.lat, device.lon], {
      icon: deviceIcons[device.type],
    }).addTo(map.value);

    marker.bindPopup(getDevicePopup(device), { closeButton: false });
    marker.on("mouseover", () => marker.openPopup());

    return marker;
  });
}
function getDevicePopup(device) {
  const speed = device.speed ? `<div>Speed: ${device.speed}</div>` : "";
  const temp = device.temperature
    ? `<div>Temperature: ${device.temperature}</div>`
    : "";

  return `
    <div class="flex flex-col gap-2 w-40">
      <div><img class="w-full rounded" src="${device.image}" /></div>
      <div>
        <strong>${capitalizeFirstLetter(device.type)}</strong>
        ${speed}
        ${temp}
      </div>
    </div>`;
}

onMounted(() => {
  initMap();
  setupTiles();
  loadDevices();
  addMarkers();
  map.value.on("moveend", updateDevices);
  updateDevices();
});
</script>

<style scoped>
#map {
  width: 100%;
}
</style>
