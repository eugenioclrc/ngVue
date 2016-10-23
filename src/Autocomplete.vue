<template>

<div>
  <span class="select2-container select2-container--default select2-container--open"
   v-show="open" style="top: 4px;position:relative; float:left;"
   v-bind:style="{width: elwidth+'px'}"
  >
  	<span class="select2-dropdown select2-dropdown--below" dir="ltr"
    >
  		<span class="select2-search select2-search--dropdown">
  			<input class="select2-search__field select2-input"
        v-bind:class="{'select2-focused': open, 'select2-active': loading}"
        type="search"
        v-on:keydown.enter="enter"
        v-on:keydown.down="down"
        v-on:keydown.up="up"
        v-on:keydown.esc="hide"
        v-on:input="change"
      v-model="selection">
  		</span>
			<span class="select2-results">
				<ul class="select2-results__options" v-if="!error">
          <li v-for="(suggestion, index) in results"
              v-bind:class="{'select2-results__option select2-highlighted': isActive(index)}"
              class="select2-results__option"
              v-on:mouseover="current = index"
              v-on:click="enter"
              v-html="suggestion.selformat">
          </li>
          <ul v-if="loading">
            <li class="select2-results__option select2-results__message">
              Cargando...
            </li>
          </ul>
          <ul v-if="!loading && (!results || results.length === 0)">
            <li class="select2-results__option select2-results__message">
              No se encontraron resultados
            </li>
          </ul>
          <ul v-if="error">
            <li class="select2-results__option select2-results__message">
              The results could not be loaded.
            </li>
          </ul>
				</ul>
			</span>
		</span>
	</span>


    <div class="select2-container big half-bottom select2-custom-container select2-allowclear
    el-autocomplete-box"
    v-on:click="openSearchInput"
    style="width: 100%;height:35px;">
      <a href="javascript:void(0)" class="select2-choice">
        <span class="select2-chosen">Buenos Aires, Argentina - Todos los aeropuert, Argentina</span>
      </a>
    </div>
    <pre>{{selected }}</pre>
  </div>
</template>
<script>
/* global window */
/* global document */

export default {
  /* elwidth: () => this.$el.querySelector('.el-autocomplete-box').offsetWidth */
  data() {
    return {
      open: false,
      current: 0,
      elwidth: 0,
      loading: false,
      error: false,
      selection: (this.selected && this.selected.text) || '',
      results: [],
    };
  },
  props: {
    matches: {
      type: Function,
      required: true,
    },
    selected: {
      required: true,
      twoWay: true,
    },
  },
  computed: {
    url() {
      return `https://api.turismocity.com/flights/location?cc=AR&departure=&q=${this.selection}`;
    },
  },

  methods: {
    clickEvt(e) {
      // outside click
      if (!this.$el.contains(e.target)) {
        this.hide();
      }
    },
    resize() {
      this.elwidth = this.$el.querySelector('.el-autocomplete-box').offsetWidth;
    },
    hide() {
      this.open = false;
      window.removeEventListener('resize', this.resize);
      document.body.removeEventListener('click', this.clickEvt, false);
    },
    openSearchInput() {
      window.addEventListener('resize', this.resize);
      document.body.addEventListener('click', this.clickEvt, false);
      this.resize();
      if (this.open === false) {
        this.open = true;
      }

      // en el primer tick hace el show
      this.$nextTick(() => {
        // en el segundo tick hace el focus
        this.$nextTick(() => this.$el.querySelector('.select2-search__field').focus());
      });
      this.change();
    },
    enter(ev) {
      if (ev) {
        ev.preventDefault();
      }

      this.selected.value = this.results[this.current];
      this.open = false;
    },
    down() {
      this.current = Math.min(this.results.length - 1, this.current + 1);
    },
    up() {
      this.current = Math.max(0, this.current - 1);
    },
    isActive(index) {
      return index === this.current;
    },
    change() {
      this.getWithCancel();
      this.ajax.promise
      .then((data) => {
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

        this.results = gresults;
      });
      if (this.open === false) {
        this.open = true;
        this.current = 0;
      }
    },
    cancelAjax() {
      if (this.ajax) {
        this.ajax.cancel();
      }
    },
    getWithCancel() {
      this.cancelAjax();
      const xhr = new window.XMLHttpRequest();
      xhr.open('GET', this.url, true);
      let cancelPromise = () => {};
      const ret = {
        promise: new Promise((resolve, reject) => {
          xhr.onload = () => {
            if (xhr.status >= 200 && xhr.status < 400) {
              resolve(JSON.parse(xhr.responseText));
            } else {
              reject(new Error(xhr.status));
            }
          };
          cancelPromise = () => {  // SPECIFY CANCELLATION
            xhr.abort(); // abort request
            reject(new Error('Cancelled')); // reject the promise
          };
          xhr.onerror = reject;
        }),
      };
      ret.cancel = cancelPromise;
      this.loading = true;
      ret.promise
      .then(() => {
        this.loading = false;
      })
      .catch((err) => {
        this.loading = false;
        this.error = (err !== 'Cancelled');
      });
      this.ajax = ret;
      xhr.send();
    },
  },
};
</script>
