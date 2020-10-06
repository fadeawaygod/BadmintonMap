<template>
  <div id="app">
    <div id="map" ref="map"></div>
    <button @click="this.$refs.newPostModal.show = true">post a party</button>
    <modal ref="newPostModal">
      <template v-slot:header>
        <h1>新增糾團</h1>
      </template>
      <template v-slot:body>
        <div class="row">
          <p class="label">開始時間</p>
          <input v-model="newPost.startTime" type="datetime-local" />
        </div>
        <div class="row">
          <p class="label">結束時間</p>
          <input v-model="newPost.endTime" type="datetime-local" />
        </div>
        <div class="row">
          <p class="label">地點名稱</p>
          <input v-model="newPost.location.name" type="text" />
        </div>
        <div class="row">
          <p class="label">地點經度</p>
          <input
            v-model.number="newPost.location.cooridinate.lng"
            type="number"
          />
        </div>
        <div class="row">
          <p class="label">地點緯度</p>
          <input
            v-model.number="newPost.location.cooridinate.lat"
            type="number"
          />
        </div>
        <div class="row">
          <p class="label">場地數</p>
          <input v-model.number="newPost.courtCount" type="number" />
        </div>
        <div class="row">
          <p class="label">用球</p>
          <input v-model="newPost.shuttlecock" type="text" />
        </div>
      </template>

      <template v-slot:footer>
        <div>
          <button @click="$refs.newPostModal.closeModal()">Cancel</button>
          <button @click="createPost">Save</button>
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
      googleMapMarkers: [],
      newPost: this.initEmptyPost(),
      db: undefined,
      displayPosts: []
    };
  },
  async mounted() {
    this.map = new window.google.maps.Map(this.$refs["map"], {
      zoom: DEFULAT_MAP_ZOOM,
      center: MAP_CENTER_COORIDINATE
    });
    this.removeGoogleAlertWindow();
    this.db = firebase.firestore();
    await this.getPosts();
  },
  methods: {
    async getPosts() {
      let querySnapshot = await this.db.collection("post").get();
      this.displayPosts = querySnapshot.docs.map(doc => doc.data());
      this.refreshMarkers();
    },
    refreshMarkers() {
      for (let post of this.displayPosts) {
        let googleMapMarker = new window.google.maps.Marker({
          position: post.location.cooridinate,
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
    },
    initEmptyPost() {
      return {
        startTime: undefined,
        endTime: undefined,
        location: {
          name: "",
          cooridinate: {
            lat: 25.039,
            lng: 121.512
          }
        },
        courtCount: 1,
        shuttlecock: "AS 50",
        requests: []
      };
    },
    async createPost() {
      await this.db.collection("post").add(this.newPost);
      await this.getPosts();

      this.newPost = this.initEmptyPost();
      this.$refs.newPostModal.closeModal();
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
