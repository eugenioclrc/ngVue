<template lang="jade">
#app
  div(style="text-align: center")
    img(src="./assets/logo.png")
  br
  div.container-fluid.tc-yellow-form(style="width:485px;")
    div.row-fluid
      a.col-xs-6.tc-tab(
        v-bind:class="{ active: tab === 'flights' }"
        v-on:click="tab = 'flights'"
      )
        i.icon-airplane
        | Vuelos
      a.col-xs-6.tc-tab(
        v-bind:class="{ active: tab === 'hotels' }"
        v-on:click="tab = 'hotels'"
      )
        i.icon-suitcase
        | Hoteles
      div.col-xs-12(style="padding-bottom: 20px")
        flight-form(
          v-bind:dataflight="dataflight"
          v-show="tab === 'flights'"
        )
        hotel-form(
          v-bind:datahotel="datahotel"
          v-show="tab === 'hotels'"
        )
  h1 Seleccion vuelos
  pre {{ dataflight }}
  h1 Seleccion hoteles
  pre {{ datahotel }}
</template>

<script>
import FlightForm from './components/Flightform';
import HotelForm from './components/Hotelform';

export default {
  name: 'app',
  components: {
    FlightForm,
    HotelForm,
  },
  data() {
    return {
      tab: 'flights',
      dataflight: {
        departure: {},
        arrival: {},
      },
      datahotel: {
        arrival: {},
      },
    };
  },
};
</script>

<style>
a.tc-tab{
  cursor: pointer;
}

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: left;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
