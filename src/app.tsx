import {AvatarDropdown, AvatarName, Question, SelectLang} from '@/components';
import {BookOutlined, LinkOutlined} from '@ant-design/icons';
import type {Settings as LayoutSettings} from '@ant-design/pro-components';
import {SettingDrawer} from "@ant-design/pro-components";
import type {RunTimeLayoutConfig} from '@umijs/max';
import {Link} from '@umijs/max';
import defaultSettings from '../config/defaultSettings';
import {errorConfig} from './requestErrorConfig';
import React from 'react';
import {getGlobalState, GlobalStateType} from './core/global.state';
import {LOGIN_PATH} from './core/constant';
import ForbiddenPage from './components/Pages/403';
import {getPathname} from "@/utils";
import Connect from "@/components/Connect";
import CustomFooter from "@/components/Footer";

const isDev = process.env.NODE_ENV === 'development';
const Wrapper = ({children, routes}: { children: React.ReactElement, routes: any }) => {
    // const intl = useIntl();
    // setIntl(intl);
    // console.log('intl', intl)
    return <Connect>
        {React.cloneElement(children, {
            ...children.props,
            routes
        })}
    </Connect>
}

export function rootContainer(container: React.ReactElement) {
    return React.createElement(Wrapper, null, container);
}


/**
 * @see  https://umijs.org/zh-CN/plugins/plugin-initial-state
 * */
export async function getInitialState(): Promise<{
    settings?: Partial<LayoutSettings>;
    currentUser?: API.CurrentUser;
    loading?: boolean;
    globalState?: GlobalStateType;
}> {
    // const u = useIntl();
    // console.log('u', u)
    const pathname = getPathname();
    if (pathname !== LOGIN_PATH) {
        try {
            const {currentUser, globalState} = await getGlobalState();
            return {
                currentUser,
                globalState,
                settings: defaultSettings as Partial<LayoutSettings>,
            };
        } catch (error) {
            console.log('error init global state ' + error);
        }
    }
    return {
        settings: defaultSettings as Partial<LayoutSettings>,
    };
}

export const layout: RunTimeLayoutConfig = ({initialState, setInitialState}) => {
    return {
        actionsRender: () => [<Question key="doc"/>, <SelectLang key="SelectLang"/>],
        avatarProps: {
            src: '',
            title: <AvatarName/>,
            render: (_, avatarChildren) => {
                return <AvatarDropdown menu={true}>{avatarChildren}</AvatarDropdown>;
            },
        },
        footerRender: () => <CustomFooter/>,
        onPageChange: () => {
            const pathname = getPathname();
            const {search} = window.location;
            // if (!pathname.startsWith(PUBLIC_PATH)) {
            //     if (
            //         !initialState?.currentUser // chưa đăng nhập
            //     ) {
            //         history.replace({
            //             pathname: LOGIN_PATH,
            //             search: stringify({
            //                 redirect: pathname + search,
            //             }),
            //         });
            //     }
            // }
        },
        bgLayoutImgList: [
            {
                src: 'https://mdn.alipayobjects.com/yuyan_qk0oxh/afts/img/D2LWSqNny4sAAAAAAAAAAAAAFl94AQBr',
                left: 85,
                bottom: 100,
                height: '303px',
            },
            {
                src: 'https://mdn.alipayobjects.com/yuyan_qk0oxh/afts/img/C2TWRpJpiC0AAAAAAAAAAAAAFl94AQBr',
                bottom: -68,
                right: -45,
                height: '303px',
            },
            {
                src: 'https://mdn.alipayobjects.com/yuyan_qk0oxh/afts/img/F6vSTbj8KpYAAAAAAAAAAAAAFl94AQBr',
                bottom: 0,
                left: 0,
                width: '331px',
            },
        ],
        links: isDev
            ? [
                <Link key="openapi" to="/umi/plugin/openapi" target="_blank">
                    <LinkOutlined/>
                    <span>OpenAPI</span>
                </Link>,
                <a key={"doc"} href="https://ant.design/components/overview/" target="_blank" rel='noreferrer'>
                    <BookOutlined/>
                    <span>Doc AntD</span>
                </a>,
            ]
            : [],
        menuHeaderRender: undefined,
        unAccessible: <ForbiddenPage/>,

        childrenRender: (children) => {
            // if (initialState?.loading) return <PageLoading />;
            return (
                <>
                    {children}
                    {isDev && (
                        <SettingDrawer
                            disableUrlParams
                            enableDarkTheme
                            settings={initialState?.settings}
                            onSettingChange={(settings) => {
                                setInitialState((preInitialState) => ({
                                    ...preInitialState,
                                    settings,
                                }));
                            }}
                        />
                    )}
                </>
            );
        },
        ...initialState?.settings,
    };
};

/**
 * @doc https://umijs.org/docs/max/request
 */
export const request = {
    ...errorConfig,
};
