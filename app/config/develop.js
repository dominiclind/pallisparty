import defaultConfig from './default';

const config = {
  apiURI: 'http://localhost:9000',
  siteUrl: 'http://localhost:3000',
};

export default {
	...defaultConfig,
	...config
};
