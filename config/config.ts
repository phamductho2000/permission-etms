// https://umijs.org/config/
import { defineConfig } from '@umijs/max';
import { join } from 'path';
import defaultSettings from './defaultSettings';
import proxy from './proxy';
import routes from './routes';

const { REACT_APP_ENV = 'dev' } = process.env;
// export const APPLICATION_CONTEXT = "/dmdc/";
export default defineConfig({
    define: {
        // APPLICATION_ID: 1,
        // APPLICATION_CODE: 'HTQT'
    },
    hash: true,
    fastRefresh: false,
    routes,
    /**
     * @doc https://ant.design/docs/react/customize-theme-cn
     * @doc umi https://umijs.org/docs/api/config#theme
     */
    theme: {
    },
    ignoreMomentLocale: true,
    proxy: proxy[REACT_APP_ENV as keyof typeof proxy],
    model: {},
    initialState: {

    },
    title: 'HTKCSDL',
    layout: {
        locale: true,
        ...defaultSettings,
    },
    moment2dayjs: {
        preset: 'antd',
        plugins: ['duration'],
    },
    locale: {
        default: 'vi-VN',
        antd: true,
        // default true, when it is true, will use `navigator.language` overwrite default
        baseNavigator: true,
    },
    /**
     * @doc https://umijs.org/docs/max/antd#antd
     */
    antd: {},
    /**
     * @doc https://umijs.org/docs/max/request
     */
    request: {
    },
    /**
     * @doc https://umijs.org/docs/max/access
     */
    access: {},
    headScripts: [
        { src: '/scripts/loading.js', async: true },
    ],
    //================ pro 插件配置 =================
    presets: ['umi-presets-pro'],
    /**
     * @doc https://pro.ant.design/zh-cn/docs/openapi/
     */
    openAPI: [
        {
            requestLibPath: "import { request } from '@umijs/max'",
            schemaPath: REACT_APP_ENV === 'dev' ? 'http://localhost:8082/v3/api-docs' : 'http://10.64.85.244:8082/v3/api-docs',
            projectName: 'apis',
            mock: false
        },
    ],
    mfsu: {
        strategy: 'normal',
    },
    esbuildMinifyIIFE: true,
    requestRecord: {},
    tailwindcss: {}
});
