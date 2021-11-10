<template>
  <div class="mt-3 selectable">
    <router-link :to="{ name: 'HouseDetails', params: { id: house.id } }">
      <div class="bg-light elevation-1 rounded">
        <img :src="house.imgUrl" alt="" class="house-img rounded-top w-100" />
        <div class="p-1 text-center">
          <p class="m-0">
            <b>{{ house.sqFt }} Square Feet - ${{ house.price }}</b>
          </p>
        </div>
      </div>
    </router-link>
  </div>
</template>


<script>
export default {
  props: {
    house: {
      type: Object,
      required: true,
    },
  },

  setup() {
    return {};
  },
};
</script>


<style lang="scss" scoped>
</style>