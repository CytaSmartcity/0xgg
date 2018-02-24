<template>
  <div id="app">
    <b-container>
      <b-jumbotron header="Bid & Tender Management using Blockchain" header-level="4" lead="an idea by 0xGG" class="intro-header">
      </b-jumbotron>
      <b-row>
      <b-col><b-card title="View Tenders"
            sub-title="List of all tenders available">
            <b-btn href="/tenders">View All</b-btn>
    </b-card></b-col>
      <b-col><b-card title="Create New Tender"
            sub-title="Offer a new tender of your own">
            <b-btn href="/create/tender">Create Tender</b-btn>
    </b-card></b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
export default {
  name: 'app',
  data () {
    var test = ""
    return {
      msg: test
    }
  }
}
</script>

<style lang="scss">
</style>
