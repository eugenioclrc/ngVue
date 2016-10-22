<template>

<div>
  <pre>{{$data }}</pre>

  <span class="select2-container select2-container--default select2-container--open"
   v-show="open" style="top: 4px;position:relative; float:left;"
   v-bind:style="{width: elwidth+'px'}"
  >
  	<span class="select2-dropdown select2-dropdown--below" dir="ltr"
    >
  		<span class="select2-search select2-search--dropdown">
  			<input class="select2-search__field" type="search"
        @keydown.enter="enter"
        @keydown.down="down"
        @keydown.up="up"
        @input="change"
        @blur="hide"
      v-model="selection">
  		</span>
			<span class="select2-results">
				<ul class="select2-results__options" role="tree" id="select2-10u1-results" aria-expanded="true" aria-hidden="false">
          <li v-for="(suggestion, index) in matches"
              v-bind:class="{'select2-results__option select2-results__option--highlighted': isActive(index)}"
              class="select2-results__option"
              @click="suggestionClick(index)"
          >
              {{ suggestion }}
          </li>
				</ul>
			</span>
		</span>
	</span>


    <div class="select2-container big half-bottom select2-custom-container select2-allowclear
    el-autocomplete-box"
    @click = 'openSearchInput'
    style="width: 100%;height:35px;">
      <a href="javascript:void(0)" class="select2-choice" tabindex="-1">
        <span class="select2-chosen">Buenos Aires, Argentina - Todos los aeropuert, Argentina</span>
        <abbr class="select2-search-choice-close"></abbr>
        <span class="select2-arrow" role="presentation">
          <b role="presentation"></b>
        </span>
      </a>
      <label for="s2id_autogen8" class="select2-offscreen"></label>
      <input class="select2-focusser select2-offscreen" type="text" aria-haspopup="true" role="button" aria-labelledby="select2-chosen-8" />
    </div>
</div>
</template>
<script>
/* global window */

export default {
  /* elwidth: () => this.$el.querySelector('.el-autocomplete-box').offsetWidth */
  data() {
    return {
      open: false,
      current: 0,
      selection: this.selection,
      top: 0,
      elwidth: 0,
    };
  },

  props: {
    suggestions: {
      type: Array,
      required: true,
    },

    /*selection: {
      type: String,
      required: true,
      twoWay: true,
    },*/
  },

  computed: {
    matches() {
      if (this.selection) {
        return this.suggestions.filter(str => str.indexOf(this.selection) >= 0);
      }
      return this.suggestions;
    },

    openSuggestion() {
      return this.selection !== '' &&
         this.matches.length !== 0 &&
         this.open === true;
    },
  },

  methods: {
    resize() {
      this.elwidth = this.$el.querySelector('.el-autocomplete-box').offsetWidth;
      console.log('resize');
    },
    hide() {
      this.open = false;
      window.removeEventListener('resize', this.resize);
    },
    openSearchInput() {
      window.addEventListener('resize', this.resize);
      this.resize();
      // this.top = this.$el.offsetTop;
      if (this.open === false) {
        this.open = true;
      }

      // en el primer tick hace el show
      this.$nextTick(() => {
        // en el segundo tick hace el focus
        this.$nextTick(() => this.$el.querySelector('.select2-search__field').focus());
      });
    },
    enter() {
      this.selection = this.matches[this.current];
      this.open = false;
    },

    up() {
      if (this.current > 0) {
        this.current -= 1;
      }
    },

    down() {
      if (this.current < this.suggestions.length - 1) {
        this.current += 1;
      }
    },

    isActive(index) {
      return index === this.current;
    },

    change() {
      if (this.open === false) {
        this.open = true;
        this.current = 0;
      }
    },

    suggestionClick(index) {
      this.open = false;
      this.selection = this.matches[index];
    },
  },
};
</script>
