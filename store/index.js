import client from "@/plugins/contentful";
import omit from "lodash.omit";

import config from "@/config";

import {
  GET_REPOSITORIES,
  GET_HEADER_CONTENT,
  SET_HEADER_CONTENT,
  GET_ABOUT_TEXT,
  SET_ABOUT_TEXT,
  SET_PROJECTS,
  SET_REPOSITORIES,
  GET_PROJECTS
} from "./types";

export const state = () => ({
  headerData: {
    logo: "",
    heading: "",
    paragraph: ""
  },
  aboutParagraph: "",
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
  [SET_HEADER_CONTENT](state, payload) {
    state.headerData = payload;
  },
  [SET_ABOUT_TEXT](state, payload) {
    state.aboutParagraph = payload;
  },
  [SET_PROJECTS](state, payload) {
    state.projects = state.projects.map(repo => {
      const moreData = payload.find(entry => entry.name === repo.name);
      if (!moreData) return repo;

      if (moreData.visibleName.length) {
        moreData.name = moreData.visibleName;
        delete moreData.visibleName;
      }

      return { ...repo, ...moreData };
    });
  },
  [SET_REPOSITORIES](state, payload) {
    const blackList = ["GTxM-back", "draw-test"];

    state.projects = payload
      .filter(item => !blackList.includes(item.name))
      .map(repo => ({
        ...omit(repo),
        ...{ webpage: repo.homepageUrl }
      }));
  }
};

export const actions = {
  async [GET_HEADER_CONTENT](ctx) {
    const response = await client.getEntries({
      content_type: "header"
    });

    const headerData = response.items[0].fields;

    ctx.commit(SET_HEADER_CONTENT, headerData);
  },
  async [GET_ABOUT_TEXT](ctx) {
    const response = await client.getEntries({
      content_type: "about"
    });

    const data = response.items[0].fields.aboutText.content[0].content[0].value;

    ctx.commit(SET_ABOUT_TEXT, data);
  },
  async [GET_PROJECTS](ctx) {
    const expectedFields = [
      "description",
      "tech",
      "name",
      "visibleName",
      "img"
    ];

    const sanitize = data => {
      expectedFields.forEach(field => {
        if (data[field] === undefined) data[field] = "";
      });

      return data;
    };

    const response = await client.getEntries({
      content_type: "projects"
    });

    const data = response.items.map(item =>
      Object.entries(item.fields).reduce((acc, [key, val]) => {
        switch (key) {
          case "img": {
            acc[key] = val.fields.file.url;
            return acc;
          }
          case "name":
          case "visibleName": {
            acc[key] = val;
            return acc;
          }
          case "description":
          case "tech": {
            acc[key] = val.content[0].content[0].value;
            return acc;
          }
        }
      }, {})
    );

    ctx.commit(SET_PROJECTS, data.map(sanitize));
  },
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
            repositories(last: 20, privacy : PUBLIC) {
              nodes {
                name
                url,
                homepageUrl
            }
          }
        }
      }`;

      const response = await this.$axios.$post(
        URL,
        { query },
        { headers: oauth }
      );

      if (hasAPIErrored(response)) ctx.commit(SET_REPOSITORIES, errorPayload);
      else {
        const repos = response.data.viewer.repositories.nodes;
        ctx.commit(SET_REPOSITORIES, repos);
      }
    } catch (err) {
      ctx.commit(SET_REPOSITORIES, errorPayload);
    }
  }
};
