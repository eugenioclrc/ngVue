<style>
.item-transition-move, .item-transition-enter-active, .item-transition-leave-active{
  transition: all 1s;
}
.item-transition-move {
  opacity: 0.8;
}
.item-transition-enter{
  opacity: 0.3;
  transform: translate(-30px, 0);
}

.item-transition-leave-active{
  opacity: 0.3;
  position: absolute;
  /* width: 100%; */
  transform: translate(30px, 0);
}


.list-complete-item-move, .list-complete-item-enter-active, .list-complete-item-leave-active{
  transition: all 5s;
}

.list-complete-item-enter, .list-complete-item-leave-active {
  opacity: 0;
  transform: translate(30px, 0);
}
.list-complete-item-leave-active {
  opacity: 0;
  transform: translate(30px, 0);
}
</style>
<template lang="jade">
  div.demo.container-fluid(style="width:500px; background-color: #fff")
    h4 classic animations
    a.btn.btn-default(href="#", v-on:click.prevent="add") add
    a.btn.btn-default(href="#", v-on:click.prevent="remove") remove
    a.btn.btn-default(href="#", v-on:click.prevent="addRnd") addRnd
    a.btn.btn-default(href="#", v-on:click.prevent="removeRnd") removeRnd
    a.btn.btn-default(href="#", v-on:click.prevent="move") move
    a.btn.btn-default(href="#", v-on:click.prevent="shuffle") shuffle
    hr
    h4 complex animations
    a.btn.btn-default(href="#", v-on:click.prevent="addRemove") add remove
    a.btn.btn-default(href="#", v-on:click.prevent="addRemove2") add remove 2
    a.btn.btn-default(href="#", v-on:click.prevent="addRemoveRnd") add remove Rnd
    a.btn.btn-default(href="#", v-on:click.prevent="addRemoveBatchRnd") add remove batch Rnd
    hr


    transition-group(name="item-transition", tag="ul", class="list-item",
    v-on:before-leave="beforeLeave"
    v-on:before-enter="beforeEnter",
    )
      li.list-complete-item(v-for="item in items", v-bind:key="item") {{ item }}
</template>

<script>
import transitionListMixin from '../transitionlistmixin';

function shuffle(arr) {
  const a = arr;
  for (let i = a.length; i; i -= 1) {
    const j = Math.floor(Math.random() * i);
    [a[i - 1], a[j]] = [a[j], a[i - 1]];
  }
  return arr.map(e => e);
}

export default {
  mixins: [transitionListMixin],
  methods: {
    add() {
      this.items.push(Math.max(...this.items) + 1);
    },
    remove() {
      this.items.pop();
    },
    addRnd() {
      const item = Math.max(...this.items) + 1;
      const rndPos = Math.floor(Math.random() * this.items.length);
      this.items.splice(rndPos, 0, item);
    },
    removeRnd() {
      const rndPos = Math.floor(Math.random() * this.items.length);
      this.items.splice(rndPos, 1);
    },
    move() {
      const rndPos = Math.floor(Math.random() * this.items.length);
      const item = this.items.splice(rndPos, 1);
      const rndPos2 = Math.floor(Math.random() * this.items.length);
      this.items.splice(rndPos2, 0, item[0]);
    },
    shuffle() {
      this.items = shuffle(this.items);
    },
    addRemove() {
      const item = Math.max(...this.items) + 1;
      this.items.splice(0, 1);
      this.items.splice(0, 0, item);
    },
    addRemove2() {
      const item = Math.max(...this.items) + 1;
      const item2 = Math.max(...this.items) + 1;
      this.items.splice(0, 1);
      this.items.splice(0, 0, item);
      this.items.splice(2, 1);
      this.items.splice(2, 0, item2);
    },
    addRemoveRnd() {
      const item = Math.max(...this.items) + 1;
      const rndPos = Math.floor(Math.random() * this.items.length);
      this.items.splice(rndPos, 1);
      this.items.splice(rndPos, 0, item);
      const item2 = Math.max(...this.items) + 1;
      this.items.splice(rndPos + 2, 1);
      this.items.splice(rndPos + 2, 0, item2);
    },
    addRemoveBatchRnd() {
      for (let j = 0; j < 6; j += 1) {
        this.addRemoveRnd();
      }
    },
  },
  data() {
    return {
      items: [1, 2, 3, 4, 5, 6, 7, 8],
    };
  },
};
</script>
