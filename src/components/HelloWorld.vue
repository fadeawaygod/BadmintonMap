<template>
  <div class="hello">
    <GmapMap
      :center="{lat:25.04, lng:121.52}"
      :zoom="13"
      map-type-id="roadmap"
      style="width:100%; height: 100%"
    >
      <GmapMarker
        label="🎾"
        :position="{lat:25.04, lng:121.52}"
        :clickable="true"
        :draggable="true"
      />
    </GmapMap>
  </div>
</template>

<script>
export default {
  name: "MapPage"
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
.hello {
  height: 60vh;
}
</style>
