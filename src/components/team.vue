<template>
  <div>
    Here is the best team you could have.
    <div v-for="player in orderedTeam">
      {{ player.web_name }}
    </div>
    <div> {{ costOfTeam }} </div>
  </div>
</template>

<script>
import { getStatistics } from "../services/statistics.js";

export default {
  name: 'team',
  data() {
    return {
      stats: [],
      team: [],
      costOfTeam: 0
    }
  },
  methods: {
    orderByPoints: function(a,b) {
      if (a.total_points > b.total_points)
        return -1;
      if (a.total_points < b.total_points)
        return 1;
      return 0;
    },
    orderByPosition: function(a,b) {
      if (a.element_type < b.element_type)
        return -1;
      if (a.element_type > b.element_type)
        return 1;
      return 0;
    },
    makeTeam: function() {
      var keeperCounter = 0;
      var defenderCounter = 0;
      var midfielderCounter = 0;
      var forwardCounter = 0;

      for (var i = 0; i < this.orderedStats.length; i++) {
        if (this.team.length == 15) {
          break;
        } else if (this.orderedStats[i].element_type == 1 && keeperCounter < 2) {
          this.team.push(this.orderedStats[i]);
          keeperCounter += 1;
        } else if (this.orderedStats[i].element_type == 2 && defenderCounter < 5) {
          this.team.push(this.orderedStats[i]);
          defenderCounter += 1;
        } else if (this.orderedStats[i].element_type == 3 && midfielderCounter < 5) {
          this.team.push(this.orderedStats[i]);
          midfielderCounter += 1;
        } else if (this.orderedStats[i].element_type == 4 && forwardCounter < 3) {
          this.team.push(this.orderedStats[i]);
          forwardCounter += 1;
        }
      }
    },
    calculateCostOfTeam: function() {
      for (var i = 0; i < this.team.length; i++) {
        this.costOfTeam += parseFloat(this.team[i].value_season);
      }
    }
  },
  created() {
    getStatistics()
      .then(response => {
        if (response.status == 200) {
          this.stats = response.data.elements;
          this.makeTeam();
          this.calculateCostOfTeam();
        }
      });
  },
  computed: {
    orderedStats: function() {
      return this.stats.sort(this.orderByPoints);
    },
    orderedTeam: function() {
      return this.team.sort(this.orderByPosition);
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
