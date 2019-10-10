import config from "@/config";

import { GET_REPOSITORIES, SET_PROJECTS } from "./types";

export const state = () => ({
  projects: [],
  stack: [
    { name: "JavaScript", img: "./img/logo-javascript.svg" },
    { name: "TypeScript", img: "./img/typescript.svg" },
    { name: "React.js", img: "./img/react.svg" },
    { name: "Redux.js", img: "./img/redux.svg" },
    { name: "RxJS", img: "./img/rxjs-1.svg" },
    { name: "Vue.js", img: "./img/vue-9.svg" },
    { name: "Nuxt.js", img: "./img/nuxt.svg" },
    { name: "Node.js", img: "./img/nodejs-icon.svg" },
    { name: "Express.js", img: "./img/express.svg" },
    { name: "Sequelize", img: "./img/sequelize.svg" },
    { name: "MySQL", img: "./img/mysql.svg" },
    { name: "Mongo DB", img: "./img/mongodb.svg" },
    { name: "Redis", img: "./img/redis.svg" },
    { name: "Webpack.js", img: "./img/webpack-icon.svg" },
    { name: "Sass", img: "./img/sass-1.svg" },
    { name: "HTML5", img: "./img/html5.svg" },
    { name: "Git", img: "./img/git-icon.svg" },
    { name: "Figma", img: "./img/figma-1.svg" },
    { name: "Avocode", img: "./img/avocode-inc-1.svg" },
    { name: "Photoshop", img: "./img/photoshop-cc.svg" }
  ]
});

export const mutations = {
  [SET_PROJECTS](state, payload) {
    state.projects = payload;
  }
};

export const actions = {
  async [GET_REPOSITORIES](ctx) {
    const errorPayload = [{ name: `couldn't fetch repositories` }];
    const hasAPIErrored = resp =>
      !Array.isArray(resp) && Array.isArray(resp.errors);

    try {
      const { url: URL, token } = config.github;
      const oauth = { Authorization: `bearer ${token}` };
      const query = `
        {
          viewer {
            repositories(last: 20) {
              nodes {
                name
                url
            }
          }
        }
      }`;

      const response = await this.$axios.$post(
        URL,
        { query },
        { headers: oauth }
      );

      if (hasAPIErrored(response)) ctx.commit(SET_PROJECTS, errorPayload);
      else {
        const repos = response.data.viewer.repositories.nodes;
        ctx.commit(SET_PROJECTS, repos);
      }
    } catch (err) {
      ctx.commit(SET_PROJECTS, errorPayload);
    }
  }
};
