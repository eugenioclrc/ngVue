<template>
  <div id="app">
    <img src="./assets/logo.png">
    <div class="container" style="padding-top:50px;">
      <autocomplete
      :query="query"
      :selected="value"></autocomplete>
    </div>
    <div class="preview">
		<h1>Data Selected</h1>
{{value }}
	</div>






  <div class="container-fluid tc-yellow-form" style="width:485px;text-align:left">
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
                  <a v-on:click="setValue2">dsada</a>
                  <div class="col-xs-12">
                    <autocomplete
                    :query="query"
                    :selected="value2"></autocomplete>
									</div>
								</div>
              </div>
            </fieldset>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Hello from './components/Hello';
import autocomplete from './Autocomplete';
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
    query(q, callback) {
      const url = `https://api.turismocity.com/flights/location?cc=AR&departure=&q=${q}`;
      this.getWithCancel(url);
      this.ajax.promise
      .then((data) => {
        callback(null, formatResults(data));
      })
      .catch((err) => {
        callback(err);
      });
    },
    setValue2() {
      console.log(this.value2);
      this.value2 = { hola: 'mundo' };
    },
  },
  data() {
    return {
      value: { value: '' },
      value2: { def: 44 },
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
