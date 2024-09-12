import React, {useEffect, useImperativeHandle, useState} from "react";
import {Button, Drawer, Flex, Form, notification, Row, Table} from "antd";
import Search from "antd/es/input/Search";
import {useModel} from "@@/exports";
import {findAllUserBygroupId, getAllAdminRoleFunction} from "@/services/apis/adminRoleFunctionController";
import {findAllTblUsergroupId, getAllTblUsers} from "@/services/apis/tblUsersController";
import {usePagination} from "ahooks";

export type RefType = {
    create: (pRecord: API.TblUsersDTO, isView: boolean) => void,
    update: (pRecord: API.TblUsersDTO, isView: boolean) => void
}
const SidebarPhanQuyenUser = React.forwardRef<RefType, any>((props, ref) => {
    const [open, setOpen] = useState(false);
    const [form] = Form.useForm();
    const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
    const [applicationList, setApplicationList] = useState<API.ZtbMapCqtDTO[]>([]);
    const [record, setRecord] = useState<API.TblUsersDTO>();
    const {listZtpMapCqt, loadData} = useModel('ztp-map-cqt');
    const {updateTblUsers} = useModel('tbl-user');
    const [api, contextHolder] = notification.useNotification();
    const {paginationQuery, paginationProps, onChangePagination} = usePagination({sort: 'taiKhoan,ASC'});
    const [listUser, setListUser] = useState<API.TblUsersDTO[]>();
    const [listAdminRoleFunction, setTblUser] = useState<API.TblUsersDTO[]>();
    const [total, setTotal] = useState<any>();

    const showDrawer = () => {
        setOpen(true);
    };

    useEffect(() => {
        loadData(applicationList)
    }, [open]);

    const handleFindAllUser = (body?: any) => {
        getAllTblUsers(paginationQuery, body).then(resp => {
            setTblUser(resp as API.TblUsersDTO[]);
            setTotal(resp?.total);
        })
    }
    const handleFindAllUserBygroupId = (body: API.TblUsersDTO) => {
        // lấy ra findbyid của userrole
        findAllTblUsergroupId(body).then((resp: any) => {
            setListUser(resp);
        })
    }

    useEffect(() => {
        if (open) {
            handleFindAllUser({});
            handleFindAllUserBygroupId(record as API.TblUsersDTO);
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
    const onClose = () => {
        setOpen(false);
    };

    useImperativeHandle(ref, () => {
        return {
            create(pRecord: API.TblUsersDTO) {
                showDrawer();
                setRecord(pRecord);
            },
            update(pRecord: API.TblUsersDTO, isView: boolean) {
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
            title: "ID",
            dataIndex: 'maCqt',
            key: 'maCqt',
        },
        {
            title: "Tên truy cập",
            dataIndex: 'tenCqtNgan',
            key: 'tenCqtNgan',
        },
        {
            title: "Họ Và Tên",
            dataIndex: 'tenKb',
            key: 'tenKb',
        },
        {
            title: "Cơ quan thuế",
            dataIndex: 'tenCqtDai',
            key: 'tenCqtDai',
        },
    ]

    function onSave() {
        console.log('listSelected', selectedRowKeys);
        if (selectedRowKeys.length > 0) {
            const newdata =[]
            selectedRowKeys.forEach(e => {
                const data = {maCqt: e}
                console.log('e', data);
                newdata.push(data)

                console.log('newdata', newdata);
            })
            const body: API.ReqTblUserDTO = {
                userId: record?.userId,
                tblUsersDTOS: newdata
            }
            updateTblUsers(body, (success: boolean) => {
                if (success) {
                    // props.onReLoadList();
                    onClose();
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
                title="Phân quyền Gán cơ quan thuế quản lý cho NSD"
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
                            <Search placeholder="Nhập tên người dùng"  enterButton style={{width: "630px"}}/>
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
export default SidebarPhanQuyenUser;
