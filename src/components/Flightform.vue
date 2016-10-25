<template lang="jade">
#flights-tab-container
  form(method="get" action="/vuelos/resultados")
    fieldset
      div.JScommonflights
        div.row(style="margin-top:10px;")
          div.col-xs-12
            autocomplete(
              v-on:select-val="dataflight.departure = arguments[0]"
              v-bind:query="queryDeparture"
              v-bind:placeholder="'Origen'"
              v-bind:selected="departure")
        div.row(style="margin-top:10px;")
          div.col-xs-12
            autocomplete(
              v-on:select-val="dataflight.arrival = arguments[0]"
              v-bind:query="queryArrival"
              v-bind:placeholder="'Destino'"
              v-bind:selected="arrival"
            )
</template>

<script>
import Autocomplete from './Autocomplete';
import ajax from '../ajax';
import formatResults from '../format-sort-airports';

export default {
  name: 'flight-form',
  components: {
    Autocomplete,
  },
  props: {
    dataflight: {
      required: true,
      type: Object,
    },
  },
  methods: {
    queryDeparture(q, callback) {
      const url = `https://api.turismocity.com/flights/location?cc=AR&q=${q}`;
      this.fetch(url, callback);
    },
    queryArrival(q, callback) {
      let d = '';
      if (this.departure) {
        d = (this.departure.value && this.departure.value.value) || 'none';
      }
      const url = `https://api.turismocity.com/flights/location?cc=AR&departure=${d}&q=${q}`;
      this.fetch(url, callback);
    },
    getWithCancel(url) {
      if (this.ajax) {
        this.ajax.cancel();
      }
      this.ajax = ajax('GET', url);
    },
    fetch(url, callback) {
      this.getWithCancel(url);
      this.ajax.promise
      .then((data) => {
        callback(null, formatResults(data));
      })
      .catch((err) => {
        callback(err);
      });
    },
  },
  data() {
    return {
      departure: {
        value: {
          value: 'EZE',
          text: 'Buenos Aires Ministro Pistarini, Argentina',
        },
      },
      arrival: { },
    };
  },
};
</script>
