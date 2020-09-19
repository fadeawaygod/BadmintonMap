<template>
  <div id="app">
    <div id="map" ref="map"></div>
  </div>
</template>

<script>
const MAP_CENTER_COORIDINATE = { lat: 25.039, lng: 121.512 };
const DEFULAT_MAP_ZOOM = 14;

export default {
  name: "App",
  data() {
    return {
      map: {},
      markers: [{ cooridinate: { lat: 25.039, lng: 121.512 } }]
    };
  },
  async mounted() {
    this.map = new window.google.maps.Map(this.$refs["map"], {
      zoom: DEFULAT_MAP_ZOOM,
      center: MAP_CENTER_COORIDINATE
    });
    // The marker, positioned at Uluru
    for (let mark of this.markers) {
      new window.google.maps.Marker({
        position: mark.cooridinate,
        map: this.map
      });
    }
  }
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
body {
  height: 100%;
}
#map {
  height: 90vh;
}
</style>
