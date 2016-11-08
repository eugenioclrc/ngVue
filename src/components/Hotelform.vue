<template lang="jade">
#hotel-tab-container
  form(method="get" action="/hoteles/resultados")
    fieldset
      div.JScommonhotels
        div.row(style="margin-top:10px;")
          div.col-xs-12
            autocomplete(
              v-on:select-val="datahotel.arrival = arguments[0]"
              v-bind:query="queryHotel"
              v-bind:placeholder="'Destino'"
              v-bind:selected="arrival")
</template>

<script>
import Autocomplete from './Autocomplete';
import ajax from '../ajax';
import storageWithExpiration from '../storageWithExpiration';

function formatResults(data) {
  return data.map(d => ({
    selformat: d.searchname,
    count: d.count,
    country_code: d.country_code,
    id: d.slug,
    text: d.searchname,
  })).sort((a, b) => b.count - a.count);
}

export default {
  name: 'hotel-form',
  components: {
    Autocomplete,
  },
  props: {
    datahotel: {
      required: true,
      type: Object,
    },
  },
  methods: {
    queryHotel(q, callback) {
      const url = `https://api.turismocity.com/hotels/location?cc=AR&lang=es&q=${q}`;
      this.fetch(url, callback);
    },
    getWithCancel(url) {
      if (this.ajax) {
        this.ajax.cancel();
      }
      this.ajax = ajax('GET', url);
    },
    fetch(url, callback) {
      const savedData = storageWithExpiration.load(url);
      if (savedData) {
        callback(null, formatResults(savedData));
        return;
      }

      this.getWithCancel(url);
      this.ajax.promise
      .then((data) => {
        storageWithExpiration.save(url, data, 60 * 60 * 1000);
        callback(null, formatResults(data));
      })
      .catch((err) => {
        callback(err);
      });
    },
  },
  data() {
    return {
      arrival: {},
    };
  },
};
</script>
