<template>
  <div id="app">
    <img src="./assets/logo.png">
    <div class="container" style="padding-top:50px;">
      <autocomplete
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
                  <a v-on:click="setValue2">dsada</a>
                  <div class="col-xs-12">
                    <autocomplete
                    :matches="matches"
                    :selected.sync="value2"></autocomplete>
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
      return [];
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
