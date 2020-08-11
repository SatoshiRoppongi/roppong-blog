<template>
  <b-jumbotron class="wrap" fluid container-fluid text-variant="white">
    <template v-slot:header>roppong.com</template>
    <template v-slot:lead>
      Wanna check my blog? Go to here below
    </template>
    <b-button variant="primary" href="blog">roppong blog</b-button>
    <video
      id="bg-video"
      src="landing.mp4"
      poster="landing_page_img.png"
      autoplay
      loop
      muted
    ></video>
    <b-img-lazy
      id="bg-img-for-mobile"
      src="landing_page_img.png"
      fluid
      alt="background image"
    >
    </b-img-lazy>
    <p id="copyright">(c)2020 Satoshi Roppongi</p>
  </b-jumbotron>
</template>

<script></script>
<style>
#bg-video {
  position: fixed;
  right: 0;
  top: 0;
  bottom: 0;
  min-width: 100%;
  min-height: 100%;
  width: auto;
  height: auto;
  z-index: -100;
}
.wrap {
  min-width: 100%;
  min-height: 100vh;
  background: linear-gradient(
    -45deg,
    rgba(4, 114, 124, 0.4),
    rgba(17, 66, 99, 0.6)
  );
  display: flex;
  justify-content: center;
  align-items: center;
}
#bg-img-for-mobile {
  display: none;
}

#copyright {
  position: absolute;
  bottom: 0;
  padding: 30px 30px;
  text-align: center;
  width: 80%;
  color: aliceblue;
}

@media screen and (max-device-width: 420px) {
  #bg-video {
    display: none;
  }
  #bg-img-for-mobile {
    position: fixed;
    right: 0;
    top: 0;
    bottom: 0;
    min-width: 500%;
    width: auto;
    height: auto;
    z-index: -100;
    display: block;
  }
}
</style>
