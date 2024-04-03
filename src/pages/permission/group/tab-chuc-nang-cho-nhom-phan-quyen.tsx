import {Button, Flex, Form, notification, Table} from "antd";
import Search from "antd/es/input/Search";
import {useEffect, useState} from "react";
import {useModel} from "@@/exports";
import {usePagination} from "ahooks";
import {getAllGroups} from "@/services/apis/aGroupsController";
// import {findAllUserBygroupId, getAllAdminRoleFunction} from "@/services/apis/adminRoleFunctionController";

export default function TabChucNangChoNhomPhanQuyen({open, record}: any) {
    const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
    const {listgroup, total1, loadData1, updateGrantByUser} = useModel('group');
    const [listUser, setListUser] = useState<API.AUserPayLoad[]>();
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
    // console.log('listgroup', listgroup);
    // useEffect(() => {
    //     loadData1(applicationList)
    // }, [open])
    //
    // const handleLoadData = (formValue?: API.AdminFuncDTO|null) => {
    //     if (formValue) {
    //         getAllBySearch(paginationQuery, formValue);
    //     } else {
    //         form.validateFields().then((formValue: API.AdminFuncDTO) => {
    //             getAllBySearch(paginationQuery, formValue);
    //             console.log('formvalue', formValue)
    //         })
    //     }
    // };

    const handleFindAllUserBygroupId = (body: API.AUserPayLoad) => {
        // lấy ra findbyid của userrole
        getAllGroups(body).then((resp: any) => {
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
            const keys = listUser.map(item => item?.gname);
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

    // const handleFindAllUser = (body?: any) => {
    //     // loadDataUser({...paginationQuery, page: 0}, {});
    //     getAllAdminRoleFunction(paginationQuery, body).then(resp => {
    //         setAdminRoleFunction(resp as API.AdminRoleFunctionDTO[]);
    //         setTotal(resp?.total);
    //     })
    // }
    const onSave = () => {
        console.log('listSelected', selectedRowKeys);
        if (selectedRowKeys.length > 0) {
            const body: API.AUserPayLoad = {
                usr: record?.gmember,
                list: selectedRowKeys,
                taxo: record?.taxo,
                domain: record?.domain,
                name: record?.name,
                descr: record?.descr
            }
            console.log('record', record);
            updateGrantByUser(body, (success: boolean) => {
                if (success) {
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
            render: (text: string, row: API.AUserPayLoad, index: number) => index + 1,
        },
        {
            title: "Tên nhóm",
            dataIndex: 'gname',
            key: 'gname',
        },
        {
            title: "Mô tả",
            dataIndex: 'descr',
            key: 'descr',
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
                dataSource={listgroup}
                columns={columns}
                style={{marginTop: 14}}
                pagination={pagination}
                rowKey="gname"
            />
        </>
    )

}
