<template>
  <div class="form">
    <form
      class="form__content"
      :class="{ 'is-submitted': isSubmitted }"
      name="contact"
      method="post"
      @submit.prevent="onSubmit"
      data-netlify="true"
      data-netlify-honeypot="bot-field"
    >
      <input type="hidden" name="form-name" value="contact" />
      <div class="form__row">
        <label for="topic" class="form__label">Topic</label>
        <input
          @keyup="onChange"
          @invalid="onInvalid"
          ref="topic"
          name="topic"
          v-model.trim="fields.topic"
          type="text"
          required
          class="form__input"
        />
      </div>
      <div class="form__row">
        <label for="content" class="form__label">Content</label>
        <textarea
          @keyup="onChange"
          @invalid="onInvalid"
          ref="content"
          name="content"
          v-model="fields.content"
          cols="30"
          rows="10"
          required
          class="form__textarea"
        ></textarea>
      </div>
      <div class="form__row">
        <label for="email" class="form__label">Email</label>
        <input
          @keyup="onChange"
          @invalid="onInvalid"
          ref="email"
          name="email"
          v-model.trim="fields.email"
          type="email"
          class="form__input"
          required
        />
        <Button class="form__button">Send</Button>
      </div>
    </form>
    <div ref="formSubmitted" class="form__submitted" :class="{ 'is-submitted': isSubmitted }">
      <svg width="24" height="24" viewBox="0 0 24 24">
        <path d="M0 0h24v24H0z" fill="none" />
        <path
          d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"
        />
      </svg>
      <h3 class="t-heading">Congratulations!</h3>
      <p class="t-subtitle">Message succesfully sent.</p>
    </div>
  </div>
</template>

<script>
import Button from "./button.vue";

export default {
  components: {
    Button
  },
  data: () => ({
    fields: {
      topic: "",
      content: "",
      email: ""
    },
    isSubmitted: false
  }),
  methods: {
    onChange(e) {
      const methods = ["add", "remove"];
      const isValid = e.target.checkValidity();

      e.target.classList[methods[+isValid]]("form__error");
    },
    onInvalid(e) {
      e.target.classList.add("form__error");
    },
    encode(data) {
      return Object.keys(data)
        .map(
          key => `${encodeURIComponent(key)}=${encodeURIComponent(data[key])}`
        )
        .join("&");
    },
    async handleSubmit() {
      const { formSubmitted } = this.$refs;

      const config = {
        header: { "Content-Type": "application/x-www-form-urlencoded" }
      };

      const data = { "form-name": "contact", ...this.fields };
      await this.$axios.$post("/", this.encode(data), config);

      this.isSubmitted = true;

      formSubmitted.addEventListener(
        "transitionend",
        () => formSubmitted.classList.add("h-scale-up-down"),
        { once: true }
      );
    },
    onSubmit(e) {
      this.handleSubmit();
    }
  }
};
</script>

<style lang="scss">
@keyframes scale-up-down-anim {
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(0.97);
  }
  100% {
    transform: scale(1);
  }
}

.h-scale-up-down {
  animation: scale-up-down-anim 1600ms ease-in-out 10;
}

.form {
  position: relative;

  &__content {
    display: grid;
    grid-gap: 1.3rem;
    transition: all 360ms ease-in-out 200ms;
  }

  &__row {
    display: grid;
    grid-gap: 3.9rem;
    position: relative;

    &:nth-of-type(3) {
      grid-template-columns: 3fr 1fr;
    }
  }

  @-webkit-keyframes autofill {
    to {
      color: $color-white;
      background: rgba(0, 0, 0, 0.25);
    }
  }

  &__input:-webkit-autofill {
    -webkit-animation-name: autofill;
    -webkit-animation-fill-mode: both;
  }

  &__input {
    @include item-text;

    display: block;
    background-color: rgba(0, 0, 0, 0.25);
    border-radius: 7px;
    border: none;
    padding: 0.9rem;
    border: 1px solid transparent;

    &.form__error {
      border: 1px solid red;
    }
  }

  &__textarea {
    @include item-text;

    background-color: rgba(0, 0, 0, 0.25);
    border-radius: 7px;
    border: none;
    padding: 0.9rem;
    resize: none;
    border: 1px solid transparent;

    &.form__error {
      border: 1px solid red;
    }
  }

  &__label {
    position: absolute;
    top: -16px;
    left: 5px;
  }

  &__button {
    background-color: $color-secondary;
  }

  &__submitted {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    opacity: 0;
    transform: scale(0.1);
    transition: all 360ms ease-in-out 600ms;
    pointer-events: none;

    & svg {
      fill: $color-white;
      height: 50%;
      width: 100%;
    }
  }

  .is-submitted {
    &.form__content {
      opacity: 0;
      transform: scale(0.1);
    }
    &.form__submitted {
      opacity: 1;
      transform: scale(1);
      pointer-events: all;
    }
  }
}
</style>