/* global window */
/*
function outerHeight(el) {
  let height = el.offsetHeight;
  const style = window.getComputedStyle(el);

  height += parseInt(style.marginTop, 10) + parseInt(style.marginBottom, 10);
  return height;
}*/

export default {
  methods: {

    beforeEnter() {
      console.log('bbb');
    },
      /*
      const el = elDom;
      debugger;
      el.style.top = '-20px';
      el.style.position = 'relative';
      el.style.height = '0';
      /*
        // `
      * /
      console.log('before enter');
    },
    afterEnter(elDom) {
      const el = elDom;
      el.style.top = 'initial';
      el.style.position = 'initial';
      el.style.height = 'initial';
      /* delete el.style.top;
      delete el.style.position;
      console.log('after enter'); * /
    },
    enter(elDom) {
      debugger;
      console.log(elDom.previousElementSibling && elDom.previousElementSibling.style.top);
    },*/
    leave(elDom) {
      // console.log(elDom.previousElementSibling && elDom.previousElementSibling.style.top);
      // const el = elDom;
      // let prev = 0;
      // const prev = el.parentElement.offsetTop;
      /*
      if (el.previousElementSibling && el.previousElementSibling.style.top) {
        parseFloat(el.previousElementSibling.style.top)
        if (el.previousElementSibling.dataset.offset) {
          prev = parseInt(el.previousElementSibling.dataset.offset, 10);
        } else {
          const els = [];
          let tempEl = el.previousElementSibling;
          while (tempEl) {
            els.unshift(tempEl);
            if (tempEl.dataset.offset) {
              break;
            }
            tempEl = tempEl.previousElementSibling;
          }

          for (let i = 0; i < els.length; i += 1) {
            if (i === 0) {
              if (!els[i].dataset.offset) {
                els[i].dataset.offset = els[i].offsetTop;
              }
            } else {
              els[i].dataset.offset = els[i - 1].dataset.offset + outerHeight(els[i - 1]);
            }
          }
          prev = els[els.length - 1].dataset.offset;
        }
      } else {
        prev = el.offsetTop;
      }*/
      // el.dataset.offset = prev + outerHeight(el);
      const el = elDom;

      if (!el.previousElementSibling) {
        return;
      }
      if (el.previousElementSibling.style.top) {
        const top = el.previousElementSibling.offsetTop + el.previousElementSibling.offsetHeight;
        el.style.top = `${top}px`;
      } else {
        const top = el.previousElementSibling.offsetTop + el.previousElementSibling.offsetHeight;
        el.style.top = `${top}px`;
      }
    },
    afterLeave() {
      /* const el = elDom;
      delete el.dataset.offset;
      delete el.style.top;
      delete el.style.position; */
    },
  },
};
