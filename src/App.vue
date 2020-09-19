<template>
  <div id="app">
    <div id="map" ref="map"></div>
    <button>post a party</button>
    <modal ref="modalName">
      <template v-slot:header>
        <h1>Modal title</h1>
      </template>

      <template v-slot:body>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Nunc sed velit dignissim sodales ut eu sem integer vitae. Id aliquet lectus proin nibh nisl condimentum. Fringilla urna porttitor rhoncus dolor purus. Nam aliquam sem et tortor. Nisl vel pretium lectus quam id. Cras pulvinar mattis nunc sed. Quis ipsum suspendisse ultrices gravida dictum fusce ut placerat orci. Tristique magna sit amet purus. Fermentum et sollicitudin ac orci phasellus egestas tellus. Erat pellentesque adipiscing commodo elit at imperdiet dui accumsan. Felis eget nunc lobortis mattis aliquam faucibus. Tincidunt eget nullam non nisi est sit amet facilisis. Mi in nulla posuere sollicitudin aliquam ultrices sagittis orci. Vitae proin sagittis nisl rhoncus mattis rhoncus urna neque. Eget nunc scelerisque viverra mauris in aliquam sem fringilla ut. Nec nam aliquam sem et tortor consequat id. Commodo nulla facilisi nullam vehicula ipsum a. Elementum tempus egestas sed sed. Faucibus purus in massa tempor nec feugiat nisl pretium fusce.</p>
        <p>Arcu cursus vitae congue mauris rhoncus aenean. Tempor id eu nisl nunc mi. Pharetra diam sit amet nisl suscipit adipiscing bibendum. Ut faucibus pulvinar elementum integer enim. Odio facilisis mauris sit amet massa vitae tortor condimentum lacinia. Eu non diam phasellus vestibulum lorem sed risus. Porttitor rhoncus dolor purus non enim praesent. Sit amet mauris commodo quis imperdiet. Lobortis feugiat vivamus at augue eget. Nibh tellus molestie nunc non blandit. Tellus mauris a diam maecenas sed enim ut. Tortor aliquam nulla facilisi cras fermentum odio eu feugiat pretium. Mattis aliquam faucibus purus in massa.</p>
      </template>

      <template v-slot:footer>
        <div>
          <button @click="$refs.modalName.closeModal()">Cancel</button>
          <button @click="$refs.modalName.closeModal()">Save</button>
        </div>
      </template>
    </modal>
  </div>
</template>

<script>
import simulate from "@/tools/simulate";
import Modal from "@/components/modal";
const MAP_CENTER_COORIDINATE = { lat: 25.039, lng: 121.512 };
const DEFULAT_MAP_ZOOM = 14;

export default {
  name: "App",
  components: {
    Modal
  },
  data() {
    return {
      map: {},
      markers: [{ cooridinate: { lat: 25.039, lng: 121.512 } }],
      googleMapMarkers: []
    };
  },
  async mounted() {
    this.map = new window.google.maps.Map(this.$refs["map"], {
      zoom: DEFULAT_MAP_ZOOM,
      center: MAP_CENTER_COORIDINATE
    });
    this.refreshMarkers();
    this.removeGoogleAlertWindow();
  },
  methods: {
    refreshMarkers() {
      for (let marker of this.markers) {
        let googleMapMarker = new window.google.maps.Marker({
          position: marker.cooridinate,
          map: this.map,
          label: "🏸",
          animation: window.google.maps.Animation.DROP,
          title: "Hello World!"
        });
        googleMapMarker.addListener("click", () => alert("test"));
        this.googleMapMarkers.push(googleMapMarker);
      }
    },
    removeGoogleAlertWindow(count = 0) {
      setTimeout(() => {
        if (
          document.getElementsByClassName("dismissButton").length === 0 &&
          count < 40
        ) {
          this.removeGoogleAlertWindow();
          return;
        }
        simulate(document.getElementsByClassName("dismissButton")[0], "click");
      }, 50);
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
