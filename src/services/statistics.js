import axios from "axios";

const baseHost = axios.create({
  baseURL: "https://fantasy.premierleague.com/api/bootstrap-static/"
});

function getStatistics() {
  return baseHost
    .get()
    .catch(e => {
      this.errors.push(e);
    });
}

export {
  getStatistics
};
