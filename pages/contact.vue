<template>
  <section class="section-contact">
    <client-only>
      <BackgroundShape class="section-contact__background"></BackgroundShape>
    </client-only>
    <transition name="h-fade-anim" appear>
      <div class="l-page-content section-contact__content">
        <h1 class="t-heading t-heading--inverted section-contact__heading">{{data.heading}}</h1>
        <p class="t-subtitle section-contact__subtitle">{{data.subtitle}}</p>
        <ContactForm class="section-contact__form"></ContactForm>
      </div>
    </transition>
  </section>
</template>

<script>
import { mapState } from "vuex";

import BackgroundShape from "./../components/background-shape";
import ContactForm from "@/components/contact-form";

import { GET_CONTACT_CONTENT } from "@/store/types";

export default {
  components: {
    BackgroundShape,
    ContactForm
  },
  computed: {
    ...mapState({ data: state => state.contactData })
  },
  async fetch({ store }) {
    await store.dispatch(GET_CONTACT_CONTENT);
  }
};
</script>

<style lang="scss">
.section-contact {
  background-color: rgba($color-secondary-alt, 0.49);

  &__background {
    & > path {
      fill: $color-secondary-alt2;
    }
  }

  &__heading {
    text-align: center;
  }

  &__subtitle {
    text-align: center;
  }

  &__form {
    padding-top: 2.5rem;
  }
}
</style>