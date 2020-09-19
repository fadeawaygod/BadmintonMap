<template>
  <div id="app">
    <div id="map" ref="map"></div>
  </div>
</template>

<script>
import simulate from "@/tools/simulate"
const MAP_CENTER_COORIDINATE = { lat: 25.039, lng: 121.512 };
const DEFULAT_MAP_ZOOM = 14;

export default {
  name: "App",
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
  methods:{
    refreshMarkers(){
      for (let marker of this.markers) {
        let googleMapMarker = new window.google.maps.Marker({
          position: marker.cooridinate,
          map: this.map,
          label:"🏸",
          animation: window.google.maps.Animation.DROP,
          title: 'Hello World!'
        });
        googleMapMarker.addListener('click', ()=>alert('test'));
        this.googleMapMarkers.push(googleMapMarker);
      } 
    

    },
    removeGoogleAlertWindow(){
      setTimeout(()=>{
      simulate(document.getElementsByClassName("dismissButton")[0], "click");  
    }, 800);
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
