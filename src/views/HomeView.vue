<template>
  <div style="width:100%; height: 100%">
    <br>
    <br>
    <center>
      <h1>Premi sullo specchio e scopri se hai vinto</h1>
    </center>
    <br>
    <br>
    <VueFlip style="margin:0 auto;" v-model="state.isClicked" :height="'600px'" :width="'400px'">
      <template v-slot:front>
        <video @click="play()" class="video" autoplay id="source"></video>
      </template>
      <template v-slot:back>
        <div class="card" v-if="!state.hasWon">
          <img id="looser" class="loose" src="../assets/loose.jpg">
        </div>
        <div class="card" v-if="state.hasWon"> 
          <img id="winner" src="../assets/win.png">
        </div>
      </template>
    </VueFlip>
  </div>
</template>

<script setup>
import { VueFlip } from 'vue-flip'
import { reactive, onMounted } from 'vue'
import sound from '../assets/bling.mp3'
import router from '../router/index.js'


const state = reactive({
  isClicked: false,
  hasWon: false
})

const play = ()=>{
  let bling = document.createElement("audio");
  bling.src = sound;
  bling.play();
  state.isClicked = true;

  let el;

  if(!state.hasWon)
    el = document.getElementById('looser');

  if(state.hasWon)
    el = document.getElementById('winner');

  el.classList.add('anime');
}

onMounted(()=>{
  if(window.location.search === '?winner=true')
    state.hasWon = true;

  const video = document.getElementById('source');

  navigator.mediaDevices
  .getUserMedia({
    video: { width: 400, height: 600 },
  })
  .then((stream) => {
    console.log(stream);
    video.srcObject = stream;
  })
  .catch((err) => {
    console.log(err);
  });

})

</script>

<style>
  .video {
    cursor: pointer;
    border-top-right-radius: 20px;
    border-top-left-radius: 20px; 
    border: solid 3px black;
    -webkit-transform: scaleX(-1);
    transform: scaleX(-1);
  }

  .card {
    cursor:pointer;
    width: 100%; 
    height: 600px; 
    display:flex; 
    justify-content: center; 
    align-items:center;
    border-top-right-radius: 20px; 
    border-top-left-radius: 20px;  
    border:solid 3px black;
  }

  .loose {
    border-top-right-radius: 20px; 
    border-top-left-radius: 20px; 
  }

  .anime {
    animation: fadeInFromNone 1s ease-out;
  }



  @keyframes fadeInFromNone {
    0% {
        display: none;
        opacity: 0;
    }

    50% {
        display: block;
        opacity: 0;
    }

    100% {
        display: block;
        opacity: 1;
    }
}
</style>





