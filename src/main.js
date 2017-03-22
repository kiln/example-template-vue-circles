import Vue from 'vue'
import Circles from './Circles.vue'

let state = {
  numCircles: 25
}

let template = {
  data: {},
  state: state,
  update: function() {},
  draw: function() {

    new Vue({
      data: {
        state: state
      },
      components: {
        Circles
      },
      template: '<circles :state="state"></circles>',
      el: '#app'
    })
    
  }
}

window.template = template