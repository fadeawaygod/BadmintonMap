<template>
  <div id="app">
    <div id="map" ref="map"></div>
    <button @click="this.$refs.modalName.show = true">post a party</button>
    <modal ref="modalName">
      <template v-slot:header>
        <h1>新增糾團</h1>
      </template>

      <template v-slot:body>
        <div class="row">
          <p class="label">人數</p>
          <input type="text" />
        </div>
        <div class="row">
          <p class="label">時間</p>
          <input type="text" />
        </div>
        <div class="row">
          <p class="label">地點</p>
          <input type="text" />
        </div>
        <div class="row">
          <p class="label">場地數</p>
          <input type="text" />
        </div>
        <div class="row">
          <p class="label">費用</p>
          <input type="text" />
        </div>
        <div class="row">
          <p class="label">徵求人數</p>
          <input type="text" />
        </div>
        <div class="row">
          <p class="label">技術等級</p>
          <input type="text" />
        </div>
        <div class="row">
          <p class="label">性別</p>
          <input type="text" />
        </div>
        <div class="row">
          <p class="label">用球</p>
          <input type="text" />
        </div>
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
import firebase from "firebase/app";
import "firebase/firestore";
const MAP_CENTER_COORIDINATE = { lat: 25.039, lng: 121.512 };
const DEFULAT_MAP_ZOOM = 14;

export default {
  name: "App",
  setup() {},
  components: {
    Modal
  },
  data() {
    return {
      map: {},
      markers: [{ cooridinate: { lat: 25.039, lng: 121.512 } }],
      googleMapMarkers: [],
      newPost: {},
      db: undefined
    };
  },
  async mounted() {
    this.map = new window.google.maps.Map(this.$refs["map"], {
      zoom: DEFULAT_MAP_ZOOM,
      center: MAP_CENTER_COORIDINATE
    });
    this.refreshMarkers();
    this.removeGoogleAlertWindow();
    this.db = firebase.firestore();
    this.db
      .collection("post")
      .get()
      .then(querySnapshot => {
        querySnapshot.forEach(doc => {
          console.log(`${doc.id} => ${doc.data()}`);
        });
      });
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
