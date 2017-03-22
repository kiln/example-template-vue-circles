<template>
  <svg width="100%" height="100%">
    <transition-group name="pop" tag="g"
      v-bind:css="false"
      v-on:before-enter="beforeEnter"
      v-on:enter="enter"
      v-on:leave="leave">
      <circle v-for="(circle, index) in circles" :cx="circle.cx" :cy="circle.cy" :r="circle.r" :fill="circle.fill" :key="index" v-bind:data-index="index"></circle>
    </transition-group>
  </svg>
</template>

<script>
import _ from 'lodash'
import Velocity from 'velocity-animate'
  
export default {
  
  props: ['state'],
  
  name: 'app',
  
  data () {
    return {
      circles: [],
      msg: 'Welcome to Flourish and Vue.js'
    }
  },

  created: function() {
    let self = this
    
    _.times(this.state.numCircles, function(num) {
      setTimeout(function() { 
        self.addCircle()
      }, num*50)
    })
    
  },
  
  watch: {
    'state.numCircles': function(val) {
      let self = this
      if (val > this.circles.length) { 
        _.times(val-this.circles.length, function(num) {
          setTimeout(function() {
            self.addCircle()
          }, num*50)
        })
      } else {
        _.times(this.circles.length-val, function(num) {
          setTimeout(function() {
            self.circles.pop()
          }, num*10)
        })
      }
    }
  },
  
  methods: {
    addCircle: function() {
      this.circles.push({
        cx: Math.floor(Math.random()*100) + '%',
        cy: Math.floor(Math.random()*100) + '%',
        r: Math.floor(Math.random()*100),
        fill: 'hsl(' + Math.floor(Math.random()*360) + ', 100%, 50%)'
      })
    },
    
    beforeEnter: function (el, done) {
      Velocity(el,
        { scale: 0 },
        { 
          duration: 0,
          complete: done
        }
      )
    },
    
    enter: function (el, done) {
      Velocity(el,
        { scale: 1 },
        { 
          duration: 4000,
          complete: done
        }
      )
    },
    
    leave: function (el, done) {
      Velocity(el,
        { scale: 0 },
        { complete: done }
      )
    }
  }  
}
</script>

<style lang="scss">
  html, body {
    height: 100%;
    margin: 0;
  }

  svg {
    g {
      transform-origin: 400px 400px;
    }
  }
</style>
