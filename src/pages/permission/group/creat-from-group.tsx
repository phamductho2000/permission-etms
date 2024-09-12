import {DatePicker, DatePickerProps, Flex, Form, Input, Modal, notification, Select, Space, TreeSelect} from "antd";
import dayjs from "dayjs";
import React, {useImperativeHandle, useState} from "react";
import {useModel} from "@@/exports";
import HcmaSelect from "@/components/HcmaSelect";
import Search from "antd/es/input/Search";
import {SelectProps} from "antd/es/select";

export type RefTypeAdminRole = {
    create: () => void,
    update: (pRecord: API.AdminRoleDTO, isView: boolean) => void,
}

const CreatFromgroup = React.forwardRef<RefTypeAdminRole, any>((props, ref) => {
    const [record, setRecord] = useState<[]>();
    const [form] = Form.useForm();
    const [isview, setisview] = useState<boolean>(false);
    const [open, setOpen] = useState<boolean>(false);
    const {createadminrole,updateadminrole} = useModel('admin-role');
    const {loadData} = useModel('admin-role');
    const [api, contextHolder] = notification.useNotification();
    const [inputSearch, setInputSearch] = useState<string>();


    const handleLoadData = (formValue?: API.TblUsersDTO|null) => {
        if (formValue) {
            loadData(paginationQuery, formValue);
        } else {
            form.validateFields().then((formValue: API.TblUsersDTO) => {
                loadData(paginationQuery, formValue);
                console.log('formvalue', formValue)
            })
        }
    };

    // @ts-ignore
    const options1 = [
        {
            label: 'China',
            value: 'china',
        },
        {
            label: 'USA',
            value: 'usa',
        },
        {
            label: 'Japan',
            value: 'japan',
        },
        {
            label: 'Korea',
            value: 'korea',
        },
    ];

    // option Value Domain
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

    const handleClose = () => {
        setOpen(false);
        setRecord(undefined);
        setisview(false);
        form.resetFields();
    }

    useImperativeHandle(ref, () => {
            return {
                create(isChild: boolean, pRecord?: API.AdminRoleDTO) {
                    setOpen(true);
                    if (isChild && pRecord) {
                        form.setFieldsValue(pRecord);
                    } else {
                        form.setFieldsValue(pRecord);
                    }
                },
                update(pRecord: API.AdminRoleDTO, isView) {
                    setOpen(true);
                    form.setFieldsValue({
                        ...pRecord,
                        // updatedDate: dayjs(pRecord.updatedDate),
                    });
                    setRecord(pRecord);
                    setOpen(true);
                    setisview(isView);

                },
            };
        }, []
    );


    // change time thay đôi
    const onChangedate: DatePickerProps['onChange'] = (date, dateString) => {
        console.log(date, dateString);
    };
    const onFinish = () => {
        form.validateFields().then((formValue: API.AdminRoleDTO) => {
            if (record) {
                const newRecord = {...record, ...formValue};
                updateadminrole(newRecord, (success: boolean) => {
                    if (success) {
                        props.onReLoadList();
                        handleClose();
                        api['success']({message: 'Cập nhật thành công'});
                    }
                });
            } else {
                createadminrole(formValue, (success: boolean) => {
                    if (success) {
                        props.onReLoadList();
                        handleClose();
                        api['success']({message: 'Thêm mới thành công'});
                    }
                });
            }
        });
    }
    return (<>
        {contextHolder}
        <Modal open={open} onCancel={handleClose} onOk={onFinish} title={record ? isview ? 'Thông tin chi tiết' : 'Cập nhật' : 'Tạo mới'}
               footer={(_, {OkBtn}) => (
                   isview ? <></> :
                       <Flex justify="flex-end">
                           <OkBtn/>
                       </Flex>
               )}
        >
            <Form
                name="form-group-create"
                labelCol={{ span: 8 }}
                wrapperCol={{ span: 16 }}
                style={{ maxWidth: 600 }}
                form={form}
                disabled={isview}
            >
                <Form.Item<API.AdminRoleDTO>
                    label="UserName"
                    name="roleId"
                >
                    <Search placeholder=""
                            onSearch={(e) => handleLoadData({username: e})}
                            onChange={(e) => setInputSearch(e.target.value)}
                            enterButton />
                </Form.Item>

                <Form.Item<API.AdminRoleDTO>
                    label="Tên nhóm quyền "
                    name="roleName"
                    rules={[{ required: true }]}
                >
                    <Select
                        mode={"multiple"}
                        optionLabelProp="label"
                        options={options1}
                    />
                </Form.Item>

                <Form.Item<API.AdminRoleDTO>
                    label="Ghi chú"
                    name="note"
                    rules={[{ required: true }]}
                >
                    <Input />
                </Form.Item>

                {/*<Form.Item<API.AdminRoleDTO>*/}
                {/*    label="Ngày cập nhật"*/}
                {/*    name="updatedDate"*/}
                {/*    rules={[{ required: true }]}*/}
                {/*>*/}
                {/*    <DatePicker*/}
                {/*        onChange={onChangedate}/>*/}
                {/*</Form.Item>*/}

                <Form.Item
                    label="Domain"
                    name="doMain"
                    rules={[{ required: true }]}
                >
                    <HcmaSelect size={"large"} hcmaOptions={options} hcmaKey={'value'} hcmaLabel={'label'}/>
                </Form.Item>
            </Form>
        </Modal>
    </>);
});

export default CreatFromgroup;
