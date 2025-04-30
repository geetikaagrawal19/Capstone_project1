module.exports = function override(config, env) {
    config.module.rules.forEach((rule) => {
      if (rule.use) {
        rule.use = rule.use.map((useEntry) => {
          if (
            typeof useEntry === 'object' &&
            useEntry.loader &&
            useEntry.loader.includes('source-map-loader')
          ) {
            useEntry.options = {
              ...useEntry.options,
            };
            rule.exclude = [/node_modules\/@firebase\/auth/];
          }
          return useEntry;
        });
      }
    });
    return config;
  };
  