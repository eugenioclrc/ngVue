<template>
  <div id="app">
    <img src="./assets/logo.png">
    <div class="container" style="padding-top:50px;">
      <autocomplete
      :suggestions="cities"
      :matches="matches"
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
									<div class="col-xs-12">
                    <autocomplete :suggestions="cities"
                    :matches="matches"
                    :selection="value"></autocomplete>
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

export default {
  name: 'app',
  components: {
    Hello, autocomplete,
  },
  methods: {
    matches() {
      return this.cities;
    },
  },
  data() {
    return {
      cities: [
        'Caballito', 'Palermo', 'Ezeiza',
        'Caballito', 'Palermo', 'Ezeiza',
        'Caballito', 'Palermo', 'Ezeiza',
        'Caballito', 'Palermo', 'Ezeiza',
        'Caballito', 'Palermo', 'Ezeiza',
        'Caballito', 'Palermo', 'Ezeiza',
        'Caballito', 'Palermo', 'Ezeiza',
        'Caballito', 'Palermo', 'Ezeiza',
      ],
      value: '',
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
