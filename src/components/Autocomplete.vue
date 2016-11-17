<style>
  .select2-results__option{
    padding: 4px 7px;
    white-space: nowrap;
    overflow: hidden;
  }
  .select2-results__option.select2-results__message {
    background: #f4f4f4;
    display: list-item;
    padding-left: 5px;
  }
  .select2-chosen.select2-placeholder{
    color: #b2b2b2;
  }
</style>
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
        v-on:input="change(selection)"
      v-model="selection">
  		</span>
			<span class="select2-results">
				<ul class="select2-results__options select2-results__main" v-if="!error">
          <li v-for="(suggestion, index) in results"
              v-bind:class="{
                'select2-highlighted': isActive(index),
                'select2-selected': this.selectedIndex === index,
              }"
              class="select2-results__option"
              v-on:mouseover="current = index"
              v-on:click="enter"
              v-html="suggestion.selformat">
          </li>
        </ul>
        <ul class="select2-results__options" v-if="loading">
          <li class="select2-results__option select2-results__message">
            Cargando...
          </li>
        </ul>
        <ul class="select2-results__options" v-if="!loading && (!results || results.length === 0)">
          <li class="select2-results__option select2-results__message">
            No se encontraron resultados
          </li>
        </ul>
        <ul class="select2-results__options" v-if="error">
          <li class="select2-results__option select2-results__message">
            The results could not be loaded.
          </li>
        </ul>
			</span>
		</span>
	</span>


    <div class="select2-container big half-bottom select2-custom-container select2-allowclear
    el-autocomplete-box"
    v-on:click="openSearchInput"
    style="width: 100%;height:35px;">
      <a href="javascript:void(0)" class="select2-choice">
        <span class="select2-chosen" v-bind:class="{'select2-placeholder': textVal === placeholder}">
          {{textVal}}
        </span>
      </a>
    </div>
  </div>
</template>
<script>
/* global window */
/* global document */

/**
 * Shuffles array in place. ES6 version
 * @param {Array} a items The array containing the items.
 */
function shuffle(_a) {
  const a = _a;
  for (let i = a.length; i; i -= 1) {
    const j = Math.floor(Math.random() * i);
    [a[i - 1], a[j]] = [a[j], a[i - 1]];
  }
}
export default {
  data() {
    return {
      open: false,
      current: 0,
      selectedIndex: 0,
      elwidth: 0,
      loading: false,
      error: false,
      selection: (this.selected && this.selected.text) || '',
      textVal: (this.selected.value && this.selected.value.text) || this.placeholder || '',
      results: [],
      items: [1, 2, 3, 4, 5, 6, 7, 8, 9],
    };
  },
  props: {
    query: {
      type: Function,
      required: true,
    },
    placeholder: {
      type: String,
    },
    selected: {
      required: true,
      twoWay: true,
    },
  },
  methods: {
    add() {
      const r = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];
      shuffle(r);
      this.items = r.slice(0, 10);
    },
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
      this.selection = (this.selected.value && this.selected.value.text) || '';
      window.addEventListener('resize', this.resize);
      document.body.addEventListener('click', this.clickEvt, false);
      this.resize();
      if (this.open === false) {
        this.open = true;
      }

      // en el primer tick hace el show
      this.$nextTick(() => {
        // en el segundo tick hace el focus
        this.$nextTick(() => {
          const field = this.$el.querySelector('.select2-search__field');
          field.focus();
          field.select();
        });
      });
      if (this.results.length === 0) {
        this.change();
      }
    },
    enter(ev) {
      if (ev) {
        ev.preventDefault();
      }
      this.selectedIndex = this.current;
      const r = this.results[this.current];
      this.selected.value = {
        value: r.id,
        text: r.text,
      };
      this.textVal = r.text;
      this.selection = r.text;

      this.$emit('select-val', this.selected.value);
      this.open = false;
    },
    down() {
      this.current = Math.min(this.results.length - 1, this.current + 1);
      this.updateScroll();
    },
    up() {
      this.current = Math.max(0, this.current - 1);
      this.updateScroll();
    },
    updateScroll() {
      if (this.results.length === 0) {
        return;
      }
      const selectUl = this.$el.querySelector('.select2-results__main');
      if (!selectUl) {
        return;
      }
      const el = selectUl.querySelector('li');
      if (!el) {
        return;
      }
      const itemPos = el.offsetHeight * this.current;
      const itemPosBottom = itemPos + el.offsetHeight;
      if (itemPos <= selectUl.scrollTop) {
        selectUl.scrollTop -= el.offsetHeight;
      } else if (itemPosBottom >= (selectUl.scrollTop + selectUl.offsetHeight)) {
        selectUl.scrollTop += el.offsetHeight;
      }
    },
    isActive(index) {
      return index === this.current;
    },
    change(q = '') {
      this.current = 0;
      this.loading = true;
      // this.results = [];
      const callback = (err, results = []) => {
        this.loading = false;
        if (err) {
          this.error = (err !== 'Cancelled');
        }
        this.results = results;
      };

      this.query(q, callback);

      if (this.open === false) {
        this.open = true;
        this.current = 0;
      }
    },
  },
};
</script>
