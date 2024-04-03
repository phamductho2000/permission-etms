import {Button, Flex, Form, notification, Table} from "antd";
import Search from "antd/es/input/Search";
import {useEffect, useState} from "react";
import {useModel} from "@@/exports";
import {usePagination} from "ahooks";
import {findAllUserByGroupId, getAllAdminRoleFunction} from "@/services/apis/adminRoleFunctionController";

export default function TabChucNangChoNhomPhanQuyen({open, record}: any) {
    const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
    const {listAdminFunc, loadData, getAllBySearch} = useModel('admin-funciton');
    const {updateadRoleAdminFuncDto} = useModel('admin-role-funcition');
    const [listUser, setListUser] = useState<API.AdminRoleFunctionDTO[]>();
    const [applicationList, setApplicationList] = useState<API.AdminRoleFunctionDTO[]>([]);
    const [listAdminRoleFunction, setAdminRoleFunction] = useState<API.AdminRoleFunctionDTO[]>();
    const [total, setTotal] = useState<any>();
    const {paginationQuery, paginationProps, onChangePagination} = usePagination({sort: 'taiKhoan,ASC'});
    const [api, contextHolder] = notification.useNotification();
    const [close, setOpen] = useState<boolean>(false);
    const [form] = Form.useForm();
    const [inputSearch, setInputSearch] = useState<string>();


    const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
        console.log('selectedRowKeys changed: ', newSelectedRowKeys);
        setSelectedRowKeys(newSelectedRowKeys);
    };
    console.log('listAdminFunc', listAdminFunc);
    useEffect(() => {
        loadData(applicationList)
    }, [open])

    const handleLoadData = (formValue?: API.AdminFuncDTO|null) => {
        if (formValue) {
            getAllBySearch(paginationQuery, formValue);
        } else {
            form.validateFields().then((formValue: API.AdminFuncDTO) => {
                getAllBySearch(paginationQuery, formValue);
                console.log('formvalue', formValue)
            })
        }
    };

    const handleFindAllUserByGroupId = (body: API.AdminRoleDTO) => {
        // lấy ra findbyid của userrole
        findAllUserByGroupId(body).then((resp: any) => {
            setListUser(resp);
        })
    }

    useEffect(() => {
        if (open) {
            handleFindAllUser({});
            handleFindAllUserByGroupId(record as API.AdminRoleDTO);
        }
    }, [open, record])

    useEffect(() => {
        // set lại nút checkbox theo funcID
        if (listUser) {
            const keys = listUser.map(item => item?.funcId);
            setSelectedRowKeys(keys as React.Key[]);
            console.log('ListUser', listUser);
        }
    }, [listUser])

    const pagination = {
        ...paginationProps,
        total,
        onChange: onChangePagination
    }
    const rowSelection = {
        selectedRowKeys,
        onChange: onSelectChange,
    };

    function closeTab() {
        window.close();
    }

    const handleFindAllUser = (body?: any) => {
        // loadDataUser({...paginationQuery, page: 0}, {});
        getAllAdminRoleFunction(paginationQuery, body).then(resp => {
            setAdminRoleFunction(resp as API.AdminRoleFunctionDTO[]);
            setTotal(resp?.total);
        })
    }
    const onSave = () => {
        console.log('listSelected', selectedRowKeys);
        if (selectedRowKeys.length > 0) {
            const newdata =[]
            selectedRowKeys.forEach(e => {
                const data = {funcId: e}
                console.log('e', data);
                newdata.push(data)

                console.log('newdata', newdata);
            })
            const body: API.AdminRoleFunctionDTO = {
                roleId: record?.roleId,
                adminFuncDTOList: newdata
            }
            console.log('record', record);
            updateadRoleAdminFuncDto(body, (success: boolean) => {
                if (success) {
                    handleFindAllUser({});
                    api['success']({message: 'Cập nhật thành công'});
                    closeTab();


                }
            });
        } else {
            api['error']({message: 'Vui lòng chọn ít nhất một người dùng'});
        }
    }



    const columns = [
        {
            title: "STT",
            dataIndex: 'stt',
            key: 'stt',
            render: (text: string, row: API.AdminFuncDTO, index: number) => index + 1,
        },
        {
            title: "ID",
            dataIndex: 'funcId',
            key: 'funcId',
        },
        {
            title: "Chức năng",
            dataIndex: 'funcName',
            key: 'funcName',
        },
    ]

    return (
        <>
            {contextHolder}
            <Flex justify={"space-between"} gap={"large"}>
                <Search placeholder="Chức Năng"
                        onSearch={(e) => handleLoadData({funcName: e})}
                        onChange={(e) => setInputSearch(e.target.value)}
                        enterButton />
                <Button type="primary" onClick={onSave} >
                    Lưu
                </Button>
            </Flex>

            <Table
                rowSelection={rowSelection}
                dataSource={listAdminFunc}
                columns={columns}
                style={{marginTop: 14}}
                pagination={pagination}
                rowKey="funcId"
            />
        </>
    )

}
