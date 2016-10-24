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
                    :query="query"
                    :placeholder="'Origen'"
                    :selected="departure"></autocomplete>
									</div>
								</div>
                <div class="row" style="margin-top:10px;">
                  <div class="col-xs-12">
                    <autocomplete
                    :query="query"
                    :departure="departure"
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
      :query="query"
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

function formatResults(data) {
  const results = [];
  data.forEach((e) => {
    const textIcon = (e.type === 'Airport') ?
      '<i class="icon-airplane"></i> ' : '<i class="icon-building"></i> ';

    results.push({
      city: e.city,
      clase: 'airport-option',
      country: e.country,
      id: e.iata,
      ord: e.ord,
      selformat: `${textIcon}${e.name} <b>(${e.iata})</b> <small>${e.country}</small>`,
      text: `${e.name}, ${e.country}`,
      tipo: e.type,
    });
  });

  const cities = {};
  const gresults = [];

  /*
  if (term) {
    results.sort((a, b) => {
      return (a.ord > b.ord);
    });
  }
  */
  results.forEach((r) => {
    const k = `${r.country}-${r.city}`;
    if (!cities[k]) {
      cities[k] = {
        city: r.city,
        country: r.country,
        res: [],
      };
    }
    cities[k].res.push(r);
  });

  const firstCitySort = (a, b) => {
    if (b.tipo === 'City') {
      return 1;
    }
    return -1;
  };

  Object.keys(cities).forEach((i) => {
    if (cities[i].res.length > 1) {
      cities[i].res.sort(firstCitySort);

      cities[i].res.forEach((c) => {
        const clase = (c.tipo === 'City')
        ? 'select2-result-with-children'
        : 'select2-result-children';
        gresults.push(Object.assign(c, { clase }));
      });
    } else {
      cities[i].res[0].clase = 'select2-result-last';
      gresults.push(cities[i].res[0]);
    }
  });
  return gresults;
}


export default {
  name: 'app',
  components: {
    Hello, autocomplete,
  },
  methods: {
    cancelAjax() {
      if (this.ajax) {
        this.ajax.cancel();
      }
    },
    getWithCancel(url) {
      this.cancelAjax();
      this.ajax = ajax('GET', url);
    },
    query(q, departure, callback) {
      let d = '';
      if (departure) {
        d = (departure.value && departure.value.value) || 'none';
      }
      const url = `https://api.turismocity.com/flights/location?cc=AR&departure=${d}&q=${q}`;
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
