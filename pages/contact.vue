<template>
  <main>
    <section class="l-page section-contact">
      <client-only>
        <BackgroundShape class="section-contact__background"></BackgroundShape>
      </client-only>
      <transition name="a-fade" appear>
        <div ref="content" class="l-page-content section-contact__content">
          <h1 class="t-heading t-heading--inverted section-contact__heading">{{data.heading}}</h1>
          <p class="t-subtitle section-contact__subtitle">{{data.subtitle}}</p>
          <ContactForm class="section-contact__form"></ContactForm>
          <footer class="section-contact__footer">
            <p
              class="t-text section-contact__copyright"
            >&copy; 2017 - {{new Date().getFullYear()}} {{data.copyright}}</p>
            <p class="t-text section-contact__copyright">
              <span class="icon">
                <img src="/img/photo.png" alt />
              </span> &copy; Markus Spiske / Unsplash,
              <span class="icon">
                <img src="/img/icons.png" alt />
              </span> by
              <a class="link" href="https://icons8.com/">icons8</a>
            </p>
          </footer>
          <Navigation></Navigation>
        </div>
      </transition>
    </section>
  </main>
</template>

<script>
import { mapState } from "vuex";

import BackgroundShape from "@/components/background-shape";
import ContactForm from "@/components/contact-form";
import Navigation from "@/components/navigation";

import { GET_CONTACT_CONTENT } from "@/store/types";

export default {
  components: {
    BackgroundShape,
    ContactForm,
    Navigation
  },
  computed: {
    ...mapState({ data: state => state.contactData })
  },
  async fetch({ store }) {
    await store.dispatch(GET_CONTACT_CONTENT);
  },
  beforeDestroy() {
    this.$refs.content.classList.add("a-move-off-screen-scale");
  }
};
</script>

<style lang="scss">
.section-contact {
  $self: &;
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

  &__copyright {
    text-align: center;
    margin: 0;
  }

  &__footer {
    margin-top: auto;
    padding-top: 1rem;

    & p:last-of-type {
      display: flex;
      justify-content: space-between;
      align-items: center;
      width: 24.7rem;
      margin: 0 auto;
      padding-bottom: 1rem;

      @include bp($bp-very-small) {
        width: 26rem;
        justify-content: space-around;
      }
    }
  }

  & .icon {
    display: inline-flex;
    pointer-events: none;

    & img {
      height: 2.2rem;
    }
  }

  & .link {
    color: $color-white;
    transition: color 300ms ease-out;

    &:hover {
      color: rgba($color-white, 0.7);
    }
  }
}
</style>