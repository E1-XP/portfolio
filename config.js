export default {
  github: {
    url: "https://api.github.com/graphql",
    token: process.env.GITHUB_KEY
  },
  contentful: {
    spaceId: process.env.CONTENTFUL_SPACE_ID,
    token: process.env.CONTENTFUL_ACCESS_TOKEN
  }
};
