<template>
  <div>
    <v-layout col wrap>
      <v-flex lg8 offset-lg2 md12>
        <h1 class="title header-1">HOT-SEMINAR</h1>
        <v-carousel>
          <v-carousel-item
            v-for="(image,i) in images"
            :key="i"
            :src="image.src"
          >
            <div class="image-title header-1">
              <h1> {{image.title}} </h1>
            </div>
          </v-carousel-item>
        </v-carousel>
      </v-flex>
    </v-layout>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  data() {
    return {
      images: [
        {
          title: 'Medical Weed',
          src: 'http://mjbusinessinsurance.com/wp-content/uploads/2017/06/Medical-weed-business-seminar1.jpg'
        },
        {
          title: 'St. John\'s College Seminar',
          src: 'https://www.sjc.edu/application/files/1914/7249/4659/Annapolis_Spring_2016_Seminar_Classroom_3822.jpg'
        },
        {
          title: 'Hngao Jung lei ka',
          src: 'https://media.weddingz.in/photologue/images/popular-banquet-halls-in-juhu-perfect-for-a-tropical-wedding.jpg',
        },
        {
          title: 'Image 4',
          src: 'https://images.pexels.com/photos/71859/spring-flowers-stroll-cherry-blossom-71859.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
        },
      ]
    }
  },
  computed: {
    ...mapState([
      'token'
    ])
  }
}
</script>

<style scoped>
.image-title {
  position: absolute;
  font-size: 2em;
  right: 0.5em;
  bottom: 1.5em;
  text-shadow:
    -3px -3px 0 #FFF,
    1px -1px 0 #FFF,
    -1px 1px 0 #FFF,
    3px 3px 0 #FFF; 
  font-family: cursive
}

.title {
  text-shadow:
    -3px -3px 0 #FFF,
    1px -1px 0 #FFF,
    -1px 1px 0 #FFF,
    3px 3px 0 #FFF; 
  font-family: cursive !important;
  font-size: 3em !important;
  font-weight: 1000;
  padding: 1em;
  padding-top: 0em;
}
</style>
