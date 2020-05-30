<template>
  <!--
  <div>
    <nuxt-link to="blog">
      blog
    </nuxt-link>
    <b-jumbotron
      header="BootstrapVue"
      lead="Bootstrap v4 Components for Vue.js 2"
    >
      <p>For more information visit website</p>
      <b-button variant="primary" href="blog">More Info</b-button>
    </b-jumbotron>
    -->
  <div class="overlay">
    <p>
      roppong.com
      <b-button href="blog">blog</b-button>
    </p>
    <div class="video-wrap">
      <div class="pattern"></div>
      <video src="landing.mp4" autoplay loop width="100%" muted>
        <img src="https://picsum.photos/900/300/?random" alt="Placeholder" />
        <p>動画を再生するにはvideoタグをサポートしたブラウザが必要です。</p>
      </video>
    </div>
    <div class="fooger">
      <span id="copyright">(c)2020 Satoshi Roppongi</span>
    </div>
  </div>
</template>

<script></script>
<style>
.overlay {
  margin: 0;
  padding: 0;
  /*  IE8以下の代替の背景画像  */
  background-attachment: fixed;
  background-size: cover;
}
video {
  /*
  position: relative;
  z-index: -100;
  */
  position: fixed;
  right: 0;
  top: 0;
  z-index: 1;
}
.pattern {
  width: 100%;
  height: 100%;
  background-image: -webkit-gradient(
      linear,
      0 0,
      0 100%,
      color-stop(0.5, transparent),
      color-stop(0.5, #ffffff),
      to(#ffffff)
    ),
    -webkit-gradient(linear, 0 0, 100% 0, color-stop(0.5, transparent), color-stop(0.5, #ffffff), to(#ffffff));
  -webkit-background-size: 5px 5px;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 2;
  opacity: 0.1;
}
div p {
  color: #fff;
  font-size: calc(30px + 0.25vw); /* 500%; */
  margin: 20%;
  position: relative;
  z-index: 3;
  text-align: center;
}
div div span {
  z-index: 3;
  color: #fff;
  font-size: 100%;
  position: relative;
  text-align: right;
}
</style>
