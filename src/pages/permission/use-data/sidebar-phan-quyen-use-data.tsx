import React, {useEffect, useImperativeHandle, useState} from "react";
import {usePagination} from "ahooks";
import {useModel} from "@umijs/max";
import {Button, Drawer, Flex, Form, notification, Row, Table} from "antd";
import Search from "antd/es/input/Search";
import {getAllUserRole} from "@/services/apis/userRoleController";
import {findAllByUsername} from "@/services/apis/aUserRoleController";

export type RefType = {
    create: (pRecord: API.UserRoleDTO, isView: boolean) => void,
    update: (pRecord: API.UserRoleDTO, isView: boolean) => void
}
const SidebarPhanQuyenUseData = React.forwardRef<RefType, any>((props, ref) => {
    const [open, setOpen] = useState(false);
    const [form] = Form.useForm();
    const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
    const [applicationList, setApplicationList] = useState<API.AUserPayLoad[]>([]);
    const [record, setRecord] = useState<API.UserRoleDTO>();
    const {listZtpMapCqt, loadData, loadDataBySearch} = useModel('ztp-map-cqt');
    const {updateTblUsers} = useModel('tbl-user');
    const {updateUserRoles} = useModel('user-role');
    const [api, contextHolder] = notification.useNotification();
    const {paginationQuery, paginationProps, onChangePagination} = usePagination({sort: 'taiKhoan,ASC'});
    const [listUser, setListUser] = useState<API.AUserPayLoad[]>();
    const [listUserRole, setUserRole] = useState<API.AUserPayLoad[]>();
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
    // const handleFindAllUser = (body?: any) => {
    //     getAllUserRole(paginationQuery, body).then(resp => {
    //         setUserRole(resp as API.UserRoleDTO[]);
    //         setTotal(resp?.total);
    //     })
    // }
    const handleFindAllUserBygroupId = (body: API.AUserPayLoad) => {
        // lấy ra findbyid của userrole
        findAllByUsername(body).then((resp: any) => {
            setListUser(resp);
        })
    }

    useEffect(() => {
        if (open) {
            // handleFindAllUser({});
            handleFindAllUserBygroupId(record as API.AUserPayLoad);
        }
    }, [open, record])

    useEffect(() => {
        // set lại nút checkbox theo funcID
        if (listUser) {
            const keys = listUser.map(item => item?.maCqt);
            setSelectedRowKeys(keys as React.Key[]);
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
            const body: API.AUserPayLoad = {
                usr: record?.username,
                list: selectedRowKeys,
                taxo: record?.taxo,
                domain: record.domain,
                name: record?.name,
                descr: record?.descr,
            }
            updateTblUsers(body, (success: boolean) => {
                if (success) {
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
