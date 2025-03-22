import L from "leaflet";

export function capitalizeFirstLetter(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}
export const deviceIcons = {
  mobile: L.divIcon({
    html: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512"><path fill="#1d87d7" d="M16 64C16 28.7 44.7 0 80 0L304 0c35.3 0 64 28.7 64 64l0 384c0 35.3-28.7 64-64 64L80 512c-35.3 0-64-28.7-64-64L16 64zM144 448c0 8.8 7.2 16 16 16l64 0c8.8 0 16-7.2 16-16s-7.2-16-16-16l-64 0c-8.8 0-16 7.2-16 16zM304 64L80 64l0 320 224 0 0-320z"/></svg>`,
    iconSize: [20, 20],
    className: "",
  }),
  vehicle: L.divIcon({
    html: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="#157ccb" d="M135.2 117.4L109.1 192l293.8 0-26.1-74.6C372.3 104.6 360.2 96 346.6 96L165.4 96c-13.6 0-25.7 8.6-30.2 21.4zM39.6 196.8L74.8 96.3C88.3 57.8 124.6 32 165.4 32l181.2 0c40.8 0 77.1 25.8 90.6 64.3l35.2 100.5c23.2 9.6 39.6 32.5 39.6 59.2l0 144 0 48c0 17.7-14.3 32-32 32l-32 0c-17.7 0-32-14.3-32-32l0-48L96 400l0 48c0 17.7-14.3 32-32 32l-32 0c-17.7 0-32-14.3-32-32l0-48L0 256c0-26.7 16.4-49.6 39.6-59.2zM128 288a32 32 0 1 0 -64 0 32 32 0 1 0 64 0zm288 32a32 32 0 1 0 0-64 32 32 0 1 0 0 64z"/></svg>`,
    iconSize: [20, 20],
    className: "",
  }),
  static: L.divIcon({
    html: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512"><path fill="#0f75c2" d="M16 144a144 144 0 1 1 288 0A144 144 0 1 1 16 144zM160 80c8.8 0 16-7.2 16-16s-7.2-16-16-16c-53 0-96 43-96 96c0 8.8 7.2 16 16 16s16-7.2 16-16c0-35.3 28.7-64 64-64zM128 480l0-162.9c10.4 1.9 21.1 2.9 32 2.9s21.6-1 32-2.9L192 480c0 17.7-14.3 32-32 32s-32-14.3-32-32z"/></svg>`,
    iconSize: [20, 20],
    className: "",
  }),
};

export function generateRandomDevices(count) {
  const types = ["mobile", "vehicle", "static"];
  return Array.from({ length: count }, (_, i) => {
    const type = types[Math.floor(Math.random() * types.length)];
    const keywords =
      type === "mobile" ? "phone" : type === "vehicle" ? "car" : "building";
    const imageUrl = `https://picsum.photos/70/50/?${keywords},${i}`;

    return {
      id: i,
      type,
      lat: 51.5 + Math.random() * 0.05 - 0.025,
      lon: -0.09 + Math.random() * 0.05 - 0.025,
      speed:
        type === "vehicle" ? `${(Math.random() * 80).toFixed(1)} km/h` : null,
      temperature:
        type !== "mobile" ? `${(20 + Math.random() * 10).toFixed(1)}°C` : null,
      image: imageUrl,
    };
  });
}
