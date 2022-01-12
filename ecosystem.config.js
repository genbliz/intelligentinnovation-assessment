module.exports = {
    /**
     * Application configuration section
     * http://pm2.keymetrics.io/docs/usage/application-declaration/
     */
    apps: [
        {
            name: 'intelligentinnovation_assessment Service',
            script: './dist/app/index.js',
            source_map_support: true,
            exec_mode: 'cluster',
            instances: 'max',
        },
    ],
};
