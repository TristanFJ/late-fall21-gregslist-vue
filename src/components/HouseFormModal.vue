<template>
  <Modal id="house-modal">
    <template #modal-title class="bg-success">
      <h4>{{ house.id ? "Edit" : "Create" }} House</h4>
    </template>
    <template #modal-body>
      <form @submit.prevent="handleSubmit">
        <div class="mb-3 d-flex justify-content-between">
          <div>
            <label for="year" class="form-label">Year</label>
            <input
              type="number"
              class="form-control"
              name="year"
              id="year"
              aria-describedby="year"
              placeholder="Year..."
              min="1950"
              max="2022"
              required
              v-model="editable.year"
            />
          </div>
          <div>
            <label for="price" class="form-label">Price</label>
            <input
              type="number"
              class="form-control"
              name="price"
              id="price"
              aria-describedby="price"
              placeholder="Price..."
              min="1"
              required
              v-model="editable.price"
            />
          </div>
        </div>
        <div class="mb-3">
          <div>
            <label for="imgUrl" class="form-label">Image Url</label>
            <input
              type="url"
              class="form-control"
              name="imgUrl"
              id="imgUrl"
              aria-describedby="imgUrl"
              placeholder="Image Url..."
              required
              v-model="editable.imgUrl"
            />
          </div>
        </div>
        <div class="mb-3">
          <div>
            <label for="sqFt" class="form-label">Square Feet</label>
            <textarea
              type="text"
              class="form-control"
              name="sqFt"
              id="sqFt"
              aria-describedby="sqFt"
              placeholder="sqFt..."
              min="5"
              max="250"
              required
              v-model="editable.sqFt"
            ></textarea>
          </div>
        </div>
        <div class="modal-footer">
          <button
            type="button"
            class="btn btn-secondary"
            data-bs-dismiss="modal"
          >
            Close
          </button>
          <button type="submit" class="btn btn-primary">
            {{ house.id ? "Save" : "Create" }}
          </button>
        </div>
      </form>
    </template>
  </Modal>
</template>


<script>
import { ref } from "@vue/reactivity";
import { logger } from "../utils/Logger";
import Pop from "../utils/Pop";
import { Modal } from "bootstrap";
import { useRouter } from "vue-router";
import { AppState } from "../AppState";
import { watchEffect } from "@vue/runtime-core";
import { House } from "../Models/House";
import { housesService } from "../services/HousesService";

export default {
  props: {
    house: {
      type: House,
      default: () => new House(),
    },
  },
  setup(props) {
    const router = useRouter();
    const editable = ref({});

    watchEffect(() => {
      editable.value = { ...props.house };
    });

    return {
      editable,
      async handleSubmit() {
        try {
          if (editable.value.id) {
            await housesService.edit(editable.value);
            Pop.toast("Edited!", "success");
          } else {
            await housesService.create(editable.value);
            Pop.toast("Created!", "success");
          }
          Modal.getOrCreateInstance(
            document.getElementById("house-modal")
          ).hide();
          router.push({
            name: "HouseDetails",
            params: { id: AppState.activeHouse.id },
          });
        } catch (error) {
          logger.error(error);
        }
      },
    };
  },
};
</script>


<style lang="scss" scoped>
</style>