<template>
<div id="app" style="text-align:left">
  <div style="text-align: center">
    <img src="./assets/logo.png">
  </div>
  <br />
  <div class="container-fluid tc-yellow-form" style="width:485px;">
  	<div class="row-fluid">
  		<a class="col-xs-6 tc-tab active">
  			<i class="icon-airplane"></i>Vuelos
  		</a>
  		<a class="col-xs-6 tc-tab">
  			<i class="icon-suitcase"></i>Hoteles
  		</a>
  		<div class="col-xs-12" style="padding-bottom: 20px">
  			<div id="flights-tab-container" ng-show="tab.getTab() === 1">
  				<form method="get" action="/vuelos/resultados" class="JSflight-search-form ng-pristine ng-valid">
						<fieldset>
							<div class="JScommonflights">
                <div class="row" style="margin-top:10px;">
                  <div class="col-xs-12">
                    <autocomplete
                    :query="queryDeparture"
                    :placeholder="'Origen'"
                    :selected="departure"></autocomplete>
									</div>
								</div>
                <div class="row" style="margin-top:10px;">
                  <div class="col-xs-12">
                    <autocomplete
                    :query="queryArrival"
                    :placeholder="'Destino'"
                    :selected="arrival"></autocomplete>
									</div>
								</div>
              </div>
            </fieldset>
          </form>
        </div>
      </div>
    </div>
  </div>
  <h1>Seleccion</h1>
  <pre>
    {{ [departure, arrival] }}
  </pre>

    <div class="container" style="padding-top:50px;">
      <autocomplete
      :query="queryDeparture"
      :placeholder="'Origen'"
      :selected="value"></autocomplete>
    </div>
    <div class="preview">
    <h1>Data Selected</h1>
    <pre>
      {{value }}
    </pre>
</div>
</template>

<script>
import Hello from './components/Hello';
import autocomplete from './components/Autocomplete';
import ajax from './ajax';
import formatResults from './format-sort-airports';

export default {
  name: 'app',
  components: {
    Hello, autocomplete,
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
      value: { value: '' },
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

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
