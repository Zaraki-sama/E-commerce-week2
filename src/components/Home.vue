<script setup>
import Card from "./Card.vue";
import Header from "./Header.vue";
import { Swiper, SwiperSlide } from "swiper/vue";
import "swiper/css";
import { Navigation } from "swiper/modules";
import "swiper/css/navigation";

import slider1 from "../assets/slider1.jpg";
import slider2 from "../assets/slider2.jpg";
import slider3 from "../assets/slider3.jpg";
import slider4 from "../assets/slider4.jpg";
import mainhero from "../assets/mainhero.jpg";
import herobanner2 from "../assets/herobanner2.jpg";
import maybebanner from "../assets/maybebanner.jpg";

// Array of images for slides
const images = [maybebanner, slider2, slider3, slider4, slider2];

const modules = [Navigation];

const onSwiper = (swiper) => {
  console.log(swiper);
};

const onSlideChange = () => {
  console.log("slide change");
};
</script>

<template>
  <Header />

  <Swiper
    class="hero-swiper"
    :modules="modules"
    :slides-per-view="1"
    navigation
    @swiper="onSwiper"
    @slideChange="onSlideChange"
  >
    <SwiperSlide v-for="(img, index) in images" :key="index">
      <img
        :src="img"
        :alt="'Slide ' + (index + 1)"
        class="w-full h-full object-cover"
      />
    </SwiperSlide>
  </Swiper>

  <Card />
</template>

<style scoped>
.hero-swiper {
  width: 100%;
  height: 650px; /* Hero banner height */
  margin-bottom: 2rem;
  overflow: hidden;
}

.hero-swiper .swiper-button-next,
.hero-swiper .swiper-button-prev {
  color: white;
  transition: 0.3s ease;
}

.hero-swiper .swiper-button-next:hover,
.hero-swiper .swiper-button-prev:hover {
  color: #e5e5e5;
}

@media (max-width: 768px) {
  .hero-swiper {
    height: 50vh; /* smaller height on mobile */
  }
}
</style>
