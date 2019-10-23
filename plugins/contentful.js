const contentful = require("contentful");

import config from "@/config";

export default contentful.createClient({
  space: config.contentful.spaceId,
  accessToken: config.contentful.token
});
