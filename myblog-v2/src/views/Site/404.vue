<template>
  <div class="not-found">
    <div id="scene" class="scene" data-hover-only="false">
        <div class="circle" data-depth="1.2"></div>
        <div class="one" data-depth="0.9">
            <div class="content">
                <span class="piece"></span>
                <span class="piece"></span>
                <span class="piece"></span>
            </div>
        </div>

        <div class="two" data-depth="0.60">
            <div class="content">
                <span class="piece"></span>
                <span class="piece"></span>
                <span class="piece"></span>
            </div>
        </div>

        <div class="three" data-depth="0.40">
            <div class="content">
                <span class="piece"></span>
                <span class="piece"></span>
                <span class="piece"></span>
            </div>
        </div>

        <p class="p404" data-depth="0.50">404</p>
        <p class="p404" data-depth="0.10">404</p>

    </div>

    <div class="text">
        <article>
            <p>Uh oh! Looks like you got lost. <br>Go back to the homepage if you dare!</p>
            <router-link to="/">Back Home</router-link>
        </article>
    </div>
  </div>
</template>

<script>
export default {
  name: '',
  data () {
    return {

    }
  }
}
</script>

<style lang="scss" scoped>
.not-found {
  .scene {
    background: linear-gradient(213deg, #7c56ff, #ff8192);
    position: absolute;
    width: 100vw;
    height: 100vh;
    vertical-align: middle;
    .one, .two, .three {
      .content {
        width: 600px;
        height: 600px;
        display: flex;
        justify-content: center;
        align-items: center;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        animation: content 0.8s cubic-bezier(1, 0.06, 0.25, 1) backwards;
        .piece {
          position: absolute;
          display: inline-block;
          border-radius: 80px;
          z-index: 1;
          animation: pieceLeft 8s cubic-bezier(1, 0.06, 0.25, 1) infinite both;
        }
      }
    }
    .one .content {
      &::before {
        position: absolute;
        content: "";
        width: 60vh;
        height: 60vh;
        background-color: rgba(54, 24, 79, 0.2);
        border-radius: 100%;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        box-shadow: inset 5px 20px 40px rgb(54 24 79 / 25%),
                    inset 5px 0px 5px rgb(50 36 62 / 30%),
                    inset 5px 5px 20px rgb(50 36 62 / 25%),
                    2px 2px 5px rgb(255 255 255 / 20%);
            animation: circle 0.8s 0.4s cubic-bezier(1, 0.06, 0.25, 1) backwards;
      }
      .piece {
        background: linear-gradient(90deg, #8077EA 13.7%, #EB73FF 94.65%);
        &:nth-of-type(1) {
          right: 15%;
          top: 18%;
          height: 30px;
          width: 120px;
          animation-delay: 0.5s;
          animation-name: pieceRight;
        }
        &:nth-of-type(2) {
          left: 15%;
          top: 45%;
          width: 150px;
          height: 50px;
          animation-delay: 1s;
          animation-name: pieceLeft;
        }
        &:nth-of-type(3) {
          left: 10%;
          top: 75%;
          height: 20px;
          width: 70px;
          animation-delay: 1.5s;
          animation-name: pieceLeft;
        }
      }
    }
    .two .content {
      .piece {
        background: linear-gradient(91deg, #FE924A 0%, #EC099A);
        &:nth-of-type(1) {
          left: 0%;
          top: 25%;
          height: 40px;
          width: 120px;
          animation-delay: 2s;
          animation-name: pieceLeft;
        }
        &:nth-of-type(2) {
          right: 15%;
          top: 35%;
          height: 40px;
          width: 120px;
          animation-delay: 2.5s;
          animation-name: pieceRight;
        }
        &:nth-child(3) {
          right: 10%;
          top: 80%;
          width: 160px;
          height: 20px;
          animation-delay: 3s;
          animation-name: pieceRight;
        }
      }
    }
    .three .content {
      .piece {
        background: linear-gradient(91deg, #734AFE 0%, #FF1A7D);
        &:nth-child(1) {
          left: 25%;
          top: 35%;
          height: 20px;
          width: 80px;
          animation-name: pieceLeft;
          animation-delay: 3.5s;
        }
        &:nth-child(2) {
          right: 10%;
          top: 55%;
          width: 140px;
          height: 40px;
          animation-name: pieceRight;
          animation-delay: 4s;
        }
        &:nth-child(3) {
          left: 40%;
          top: 68%;
          height: 20px;
          width: 80px;
          animation-name: pieceLeft;
          animation-delay: 4.5s;
        }
      }
    }
    .p404 {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate3d(-50%, -50%, 0);
      font-size: 200px;
      font-weight: 700;
      letter-spacing: 4px;
      color: white;
      // display: flex !important;
      // justify-content: center;
      // align-items: center;
      z-index: 2;
      animation: anime404 0.6s cubic-bezier(0.3, 0.8, 1, 1.05) both;
      animation-delay: 1.2s;
    }
    .circle {
      &::before {
        position: absolute;
        content: "";
        width: 80vh;
        height: 80vh;
        background-color: rgba(54, 24, 79, 0.2);
        border-radius: 100%;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        box-shadow: inset 5px 20px 40px rgb(54 24 79 / 25%),
                    inset 5px 0px 5px rgb(50 36 62 / 30%),
                    inset 5px 5px 20px rgb(50 36 62 / 25%),
                    2px 2px 5px rgb(255 255 255 / 20%);
        animation: circle 0.8s cubic-bezier(1, 0.06, 0.25, 1) backwards;
      }
    }
  }
  .text {
    position: absolute;
    top: 50%;
    width: 100%;
    height: 40%;
    min-width: 400px;
    min-height: 500px;
    margin: 40px 0;
    animation: text .6s 1.8s ease backwards;
    article {
      position: absolute;
      width: 400px;
      z-index: 4;
      display: flex;
      flex-direction: column;
      align-items: center;
      text-align: center;
      justify-content: center;
      bottom: 0;
      left: 50%;
      transform: translateX(-50%);
      p {
        color: white;
        font-size: 18px;
        letter-spacing: 0.6px;
        margin-bottom: 40px;
        text-shadow: 6px 6px 10px #32243e;
      }
      a {
        display: block;
        height: 40px;
        line-height: 40px;
        padding: 0 30px;
        border-radius: 50px;
        cursor: pointer;
        box-shadow: 0px 15px 20px rgb(54 24 79 / 50%);
        z-index: 3;
        color: #695681;
        background-color: white;
        text-transform: uppercase;
        font-weight: 600;
        font-size: 12px;
        transition: all 0.3s ease;
        &:hover {
          background-color: #695681;
          color: #fff;
          transform: translateY(5px);
        }
      }
    }
  }
}
@keyframes circle {
  0% {
      width: 0;
      height: 0;
  }
}
@keyframes pieceLeft {
  0% {}
  50% {
      left: 80%;
      width: 10%;
  }
  100% {}
}
@keyframes pieceRight {
  0% {}

  50% {
      right: 80%;
      width: 10%;
  }
  100% {}
}
@keyframes content {
  0% {
    width: 0;
  }
}
@keyframes anime404 {
  0% {
    opacity: 0;
    transform: scale(10) skew(20deg, 20deg);
  }
}
@keyframes text {
  0% {
    opacity: 0;
    transform: translateY(40px);
  }
}
</style>
