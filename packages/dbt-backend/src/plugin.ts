import {
    coreServices,
    createBackendPlugin,
} from '@backstage/backend-plugin-api';
import { loggerToWinstonLogger } from '@backstage/backend-common';
import { createRouter } from './service/router';


export const dbtPlugin = createBackendPlugin({
    pluginId: 'dbt',
    register(env) {
        env.registerInit({
            deps: {
                http: coreServices.httpRouter,
                logger: coreServices.logger,
                config: coreServices.rootConfig
            },
            async init({ config, logger, http }) {
                const winstonLogger = loggerToWinstonLogger(logger);

                http.use(
                    await createRouter({
                        logger: winstonLogger,
                        config,
                    })
                );
            },
        });
    },
});