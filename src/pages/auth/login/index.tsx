import {useModel} from '@umijs/max';
import React, {useEffect, useRef, useState} from 'react';
import {flushSync} from 'react-dom';
import {getGlobalState} from '@/core/global.state';
import LoadingPage from '@/components/LoadingPage';
import {history} from '@@/exports';
import {Button, Card, Col, Form, Input, Row, Select} from "antd";
import LogoLogin from "public/images/logo-login.jpg"
import HcmaSelect from "@/components/HcmaSelect";
import {authenticate} from "@/services/apis/jwtApi";

const options = [{
    value: 'vp.tct.vn',
    label: 'vp.tct.vn'
}, {
    value: 'mn.tct.vn',
    label: 'mn.tct.vn'
},
    {
        value: 'mb.tct.vn',
        label: 'mb.tct.vn'
    },
    {
        value: 'hcm.tct.vn',
        label: 'hcm.tct.vn'
    },
    {
        value: 'han.tct.vn',
        label: 'han.tct.vn'
    },
    {
        value: 'fiscg.local',
        label: 'fiscg.local'
    },
]

const Login: React.FC = () => {
    const {initialState, setInitialState} = useModel('@@initialState');
    const [form] = Form.useForm();
    const {loginAuthenticate} = useModel('jwt-api')
    const [loggingType, setLoggingType] = useState<'LOGGING' | 'CHOOSE_CSDT' | 'ERROR'>('LOGGING');
    const redirectUrl = () => {
        if (!history) return;
        const urlParams = new URL(window.location.href).searchParams;
        history.push(urlParams.get('redirect') || '/');
        return;
    }

    const fetchUserInfo = async () => {
        // setLoggingType("LOGGING");
        // getGlobalState().then(({currentUser, globalState}) => {
        //     if (currentUser) {
        //         flushSync(() => {
        //             setInitialState((s) => ({
        //                 ...s,
        //                 currentUser,
        //                 globalState
        //             }));
        //         });
        //     }
        //     if(globalState) {
        //         redirectUrl();
        //     } else {
        //         setLoggingType('CHOOSE_CSDT');
        //     }
        // }).catch(() => {
        //     setTimeout(() => {
        //         setLoggingType('ERROR')
        //     }, 2000);
        // });
    };

    useEffect(() => {
        // if (initialState?.currentUser) {
        //     // nếu đã đăng nhập thì chuyển hướng
        //     redirectUrl();
        // } else {
        //     // nếu chưa đăng nhập thì request đăng nhập
        //     fetchUserInfo();
        // }
    }, [initialState]);

    const onLogin = () => {
        form.validateFields().then((formValue: API.Login) => {
            const body = {...formValue}
            authenticate(body).then(res => {
                // @ts-ignore
                localStorage.setItem("Authorization", res?.token);
                // lưu tài khoải đăng nhập vào localStorage
                localStorage.setItem("Username", formValue?.username);
                setInitialState(body);
                redirectUrl();
            })

        })
    }



    return <>
        {/*{loggingType === 'LOGGING' && <LoadingPage message='Đăng nhập hệ thống...'/>}*/}
        {/*{loggingType === 'ERROR' && <LoadingPage loading={false} message='Có lỗi xảy ra trong quá trình đăng nhập'*/}
        {/*                                          action={<Button onClick={fetchUserInfo}>Thử lại</Button>}/>}*/}
        {/*<ChooseCSDT ref={chooseCSDTRef}/>*/}
{/*<Row className={"login"}>*/}
{/*    <Col>*/}
{/*        <div  className={"login"}>*/}
            <Card className={"login-form login"}>

                <h2 className={"text-center"}>Hệ thống Kho lưu trữ</h2>
                <Form form={form} layout={"vertical"} onFinish={onLogin}>
                    <Form.Item name={"username"} label={"Tên đăng nhập"} rules={[{required: true}]}>
                        <Input size={"large"}></Input>
                    </Form.Item>
                    <Form.Item name={"password"} label={"Mật khẩu"} rules={[{required: true}]}>
                        <Input size={"large"}></Input>
                    </Form.Item>
                    <Form.Item name={"domain"} label={"Domain"} rules={[{required: true}]}>
                        <HcmaSelect size={"large"} hcmaOptions={options} hcmaKey={'value'} hcmaLabel={'label'}/>
                    </Form.Item>
                    <Button type={'primary'} className={"w-full"} size={"large"} onClick={onLogin}>Đăng nhập</Button>
                </Form>
            </Card>
        {/*</div>*/}

    {/*</Col>*/}
{/*    <Col>*/}
{/*        <img src={'https://hocvien.tiki.vn/wp-content/uploads/2021/11/online-tax-payment-concept.jpg'} width={"80%"} height={500} alt={""}/>*/}
{/*    </Col>*/}
{/*</Row>*/}

    </>
};

export default Login;
