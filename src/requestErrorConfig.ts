import type {RequestOptions} from '@@/plugin-request/request';
import type {RequestConfig} from '@umijs/max';
import {message, notification} from 'antd';
import {createIntl, createIntlCache} from "@@/plugin-locale/localeExports";
import messages from '@/locales/vi-VN';
import proxy from "../config/proxy";
import {history} from "@/.umi-production/exports";

const cache = createIntlCache()

const intl = createIntl({
    locale: 'vi-VN',
    messages: messages as any
}, cache)

const redirectToLoginKeycloak = ({redirectUri, redirectToCurrentPage}: {
    redirectUri: string,
    redirectToCurrentPage: boolean
}): boolean => {
    if (redirectUri.toLowerCase().includes("auth")) {
        console.log('redirectUri', redirectUri)
        const nextUrl = new URL(redirectUri);
        // if (redirectToCurrentPage) {
        //     nextUrl.searchParams.set('redirect_uri', encodeURIComponent(window.location.href));
        //     nextUrl.searchParams.set('mode', "test")
        //     console.log(oldRedirectUri + " =====> " + nextUrl.href)
        // }
        window.location.assign(nextUrl);
        return true;
    }
    return false;
}

/**
 * @doc https://umijs.org/docs/max/request
 */
export const errorConfig: RequestConfig = {
    errorConfig: {
        errorThrower: (res) => {
            console.log('errorThrower', res);

            const {success, data, messageCode, message} = res;
            if (!success) {
                const error: any = new Error(messageCode);
                error.name = 'BusinessError';
                error.info = { ... res };
                throw error;
            }
        },
        errorHandler: (error: any, opts: any) => {
            if (opts?.skipErrorHandler) throw error;
            if (error.response) {
                const data: any = error.response.data;
                switch (error.response.status) {
                    case 400:
                        // eslint-disable-next-line no-case-declarations
                        let messageTxt = '';
                        if(data?.messageCode || data?.message) {
                            messageTxt = intl.formatMessage({id: data?.messageCode, defaultMessage: data?.message})
                        } else if(data.errors && data.errors.length) {
                            messageTxt = intl.formatMessage({id: `message.badRequest`})
                        } else {
                            messageTxt = intl.formatMessage({id: `message.http.400`})
                        }
                        message.error(messageTxt);
                        break;
                    case 401:
                        window.location = "/authenticate/login?redirect=%2Fwelcome"
                        break;
                    case 500:
                        message.error(intl.formatMessage({id: `message.http.500`}));
                        break
                    case 503:
                        message.error(intl.formatMessage({id: `message.http.503`}));
                        break;
                    default:
                        message.error(intl.formatMessage({id: `message.http.500`}) + ': ' + error.response.status);
                }
            } else if (error.request) {
                message.error('None response! Please retry.');
            } else {
                message.error('Request error, please retry.');
            }
        },
    },

    requestInterceptors: [
        (url, options) =>
        {
            console.log('options', options)
            // do something
            options.headers = {...options.headers, Authorization: 'Bearer ' + localStorage.getItem("Authorization")}
            return { url, options }
        },
        // a tuple, the first element is the request interceptor, the second is the error handler
        [(url, options) => {return { url, options }}, (error) => {return Promise.reject(error)}],
        // array, omitting error handler
        [(url, options) => {return { url, options }}]
    ],

    // requestInterceptors: [
    //     (config: RequestOptions) => {
    //         let url = config?.url;
    //         const currentProxy: any = proxy[REACT_APP_ENV as keyof typeof proxy];
    //         const domain = currentProxy?.['/api/']?.target;
    //         // if (url?.indexOf('/api') !== 0) {
    //         //     url = `/api${url}`;
    //         // }
    //         if (url?.indexOf('/api') === 0) {
    //             url = `${domain}${url}`;
    //         }
    //         return {...config, url};
    //     },
    // ],

    responseInterceptors: [
        (response: any) => {
            const {data} = response;

            if (data?.success === false) {
                message.error('Yêu cầu tới máy chủ không thành công!');
            }
            return response;
        },
    ],
};
