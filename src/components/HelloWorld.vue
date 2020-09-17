<template>
  <div class="hello">
    <b-button v-b-modal.post-window>揪團!</b-button>
    <b-modal id="post-window" title="來揪團吧">
      <label>日期</label>
      <b-form-input :type="date"></b-form-input>
      <label>起始時間</label>
      <b-form-input :type="time"></b-form-input>
      <label>結束時間</label>
      <b-form-input :type="time"></b-form-input>
      <label>場地數</label>
      <b-form-input :type="number"></b-form-input>
      <label>人數</label>
      <b-form-input :type="number"></b-form-input>
      <label>價格</label>
      <b-form-input :type="number"></b-form-input>
    </b-modal>
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
