import React, {useEffect, useImperativeHandle, useState} from "react";
import {usePagination} from "ahooks";
import {useModel} from "@umijs/max";
import {Button, Drawer, Flex, Form, notification, Row, Table} from "antd";
import Search from "antd/es/input/Search";
import {getAllUserRole} from "@/services/apis/userRoleController";

export type RefType = {
    create: (pRecord: API.UserRoleDTO, isView: boolean) => void,
    update: (pRecord: API.UserRoleDTO, isView: boolean) => void
}
const SidebarPhanQuyenUseData = React.forwardRef<RefType, any>((props, ref) => {
    const [open, setOpen] = useState(false);
    const [form] = Form.useForm();
    const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
    const [applicationList, setApplicationList] = useState<API.ZtbMapCqtDTO[]>([]);
    const [record, setRecord] = useState<API.UserRoleDTO>();
    const {listZtpMapCqt, loadData, loadDataBySearch} = useModel('ztp-map-cqt');
    const {updateUserRoles} = useModel('user-role');
    const [api, contextHolder] = notification.useNotification();
    const {paginationQuery, paginationProps, onChangePagination} = usePagination({sort: 'taiKhoan,ASC'});
    const [listUser, setListUser] = useState<API.UserRoleDTO[]>();
    const [listUserRole, setUserRole] = useState<API.UserRoleDTO[]>();
    const [total, setTotal] = useState<any>();
    const [inputSearch, setInputSearch] = useState<string>();

    const showDrawer = () => {
        setOpen(true);
    };
    const handleLoadData = (formValue?: API.ZtbMapCqtDTO|null) => {
        if (formValue) {
            loadDataBySearch(paginationQuery, formValue);
        } else {
            form.validateFields().then((formValue: API.ZtbMapCqtDTO) => {
                loadDataBySearch(paginationQuery, formValue);
                console.log('formvalue', formValue)
            })
        }
    };

    useEffect(() => {
        loadData(applicationList)
    }, [open]);
    const onClose = () => {
        setOpen(false);
    };
    const handleFindAllUser = (body?: any) => {
        getAllUserRole(paginationQuery, body).then(resp => {
            setUserRole(resp as API.UserRoleDTO[]);
            setTotal(resp?.total);
        })
    }
    const handleFindAllUserBygroupId = (body: API.UserRoleDTO) => {
        // lấy ra findbyid của userrole
        findAllUserRolegroupId(body).then((resp: any) => {
            setListUser(resp);
        })
    }

    useEffect(() => {
        if (open) {
            handleFindAllUser({});
            handleFindAllUserBygroupId(record as API.UserRoleDTO);
        }
    }, [open, record])

    useEffect(() => {
        // set lại nút checkbox theo funcID
        if (listUser) {
            const keys = listUser.map(item => item?.areaCode);
            const arrayOfStrings = keys[0]?.split(',');
            setSelectedRowKeys(arrayOfStrings as React.Key[]);
            console.log('ListUser', listUser);
        }
    }, [listUser])

    const pagination = {
        ...paginationProps,
        total,
        onChange: onChangePagination
    }

    // tìm kiếm
    useEffect(() => {
        setInputSearch("");
        form.resetFields();
    }, [open])


    useImperativeHandle(ref, () => {
        return {
            create(pRecord: API.UserRoleDTO) {
                showDrawer();
                setRecord(pRecord);
            },
            update(pRecord: API.UserRoleDTO, isView: boolean) {
                setRecord(pRecord);
                form.setFieldsValue(pRecord);
                setOpen(true);
                // setIsView(isView);
            },
        };
    }, []);
    const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
        console.log('selectedRowKeys changed: ', newSelectedRowKeys);
        setSelectedRowKeys(newSelectedRowKeys);
    };

    const rowSelection = {
        selectedRowKeys,
        onChange: onSelectChange,
    };

    const columns = [
        {
            title: "STT",
            dataIndex: 'orderNo',
            key: 'orderNo',
            render: (text: string, row: API.ZtbMapCqtDTO, index: number) => index + 1,
        },
        {
            title: "Mã CQT",
            dataIndex: 'maCqt',
            key: 'maCqt',
        },
        // {
        //     title: "Tên CQT",
        //     dataIndex: 'tenCqtNgan',
        //     key: 'tenCqtNgan',
        // },
    ]

    function onSave() {
        console.log('listSelected', selectedRowKeys);
        if (selectedRowKeys.length > 0) {
            // const newdata =[]
            // selectedRowKeys.forEach(e => {
            //     const data = {maCqt: e}
            //     console.log('e', data);
            //     newdata.push(data)
            //
            //     console.log('newdata', newdata);
            // })
            let concatenatedString = '';
            selectedRowKeys.forEach(e => {
                const data = e;
                // Nối chuỗi con từ đối tượng data vào chuỗi lớn
                concatenatedString += JSON.stringify(data) + ',';
            });
            const trimmedString = concatenatedString.replace(/"/g, ''); // Loại bỏ tất cả dấu nháy đôi từ chuỗi
            const body: API.ReqTblUserDTO = {
                userId: record?.userId,
                areaCode:  trimmedString
            }
            updateUserRoles(body, (success: boolean) => {
                if (success) {
                    // props.onReLoadList();
                    api['success']({message: 'Cập nhật  thành công'});

                }
            });
        } else {
            api['error']({message: 'Vui lòng chọn ít nhất một người dùng'});
        }
    }

    return (
        <>
            {contextHolder}
            <Drawer
                title="Phân quyền sử dụng dữ liệu"
                width={"40%"}
                onClose={onClose}
                open={open}
                styles={{
                    body: {
                        paddingBottom: 80,
                    },
                }}
                // extra={
                //     <Space>
                //         <Button onClick={onClose}>Làm mới</Button>
                //         <Button onClick={onFinish} type="primary">
                //             Lưu
                //         </Button>
                //     </Space>
                // }
            >

                <Form
                    name="form-group-create"
                    form={form}
                    labelWrap
                    labelCol={{flex: "150px"}}
                >

                    <Row>
                        <Flex justify={"space-between"} gap={"large"}>
                            <Search placeholder="Mã CQT"
                                    onSearch={(e) => handleLoadData({maCqt: e})}
                                    onChange={(e) => setInputSearch(e.target.value)}
                                    enterButton style={{width: "630px"}}/>
                            <Button type="primary" onClick={onSave} >Lưu</Button>
                        </Flex>
                    </Row>
                </Form>

                <Table
                    rowSelection={rowSelection}
                    dataSource={listZtpMapCqt}
                    columns={columns}
                    style={{marginTop: 14}}
                    // pagination={pagination}
                    rowKey="maCqt"
                />
            </Drawer>
        </>
    );
})

export default SidebarPhanQuyenUseData;
