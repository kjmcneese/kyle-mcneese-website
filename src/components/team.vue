<template>
  <div>
    Here is the best team you could have.
    <div v-for="player in stats">
      {{ player.first_name }} {{ player.second_name }}
    </div>
  </div>
</template>

<script>
// Can't find module!!!! ???????
import { getStatistics } from "../services/statistics.js";

export default {
  name: 'team',
  data() {
    return {
      stats: []
    }
  },
  created() {
    getStatistics()
      .then(response => {
        if (response.status == 200) {
          this.stats = response.data.elements;
        }
      });
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
