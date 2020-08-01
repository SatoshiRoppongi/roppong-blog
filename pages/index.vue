<template>
  <div class="wrap">
    <video
      id="bg-video"
      src="landing.mp4"
      poster="https://picsum.photos/900/300/?random"
      autoplay
      loop
      muted
    ></video>
    <div class="header-title">
      <b-jumbotron header="roppong.com" lead="Inside my brain">
        <p>Wanna check my blog? Go to here below</p>
        <b-button variant="primary" href="blog">roppong blog</b-button>
      </b-jumbotron>
    </div>
    <p id="copyright">(c)2020 Satoshi Roppongi</p>
  </div>
</template>

<script></script>
<style>
#bg-video {
  position: fixed;
  right: 0;
  bottom: 0;
  min-width: 100%;
  min-height: 100%;
  width: auto;
  height: auto;
  z-index: -100;
  background: url('https://picsum.photos/900/300/?random') no-repeat;
  background-size: cover;
}
.header-title {
  position: relative;
  z-index: 2;
  display: flex;
  width: 50%;
  justify-content: center;
  align-items: center;
  text-align: center;
  margin: auto;
}
.wrap {
  height: 100vh;
  background: linear-gradient(
    -45deg,
    rgba(4, 114, 124, 0.4),
    rgba(17, 66, 99, 0.6)
  );
  display: flex;
  justify-content: center;
  align-items: center;
}

#copyright {
  position: absolute;
  bottom: 0;
  padding: 30px 30px;
  text-align: center;
  width: 80%;
  color: aliceblue;
}
</style>
