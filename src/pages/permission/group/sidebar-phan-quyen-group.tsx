import React, {useImperativeHandle, useState} from "react";
import {Drawer, Form, notification, Tabs, TabsProps} from "antd";
import TabChucNangChoNhomPhanQuyen from "@/pages/permission/group/tab-chuc-nang-cho-nhom-phan-quyen";
import TabQuyenNguoiDung from "@/pages/permission/group/tab-quyen-nguoi-dung";

export type RefType = {
    create: (pRecord: API.AdminRoleDTO) => void,
    update: (pRecord: API.AdminRoleDTO, isView: boolean) => void
}
const SidebarPhanQuyenGroup = React.forwardRef<RefType, any>((props, ref) => {
    const [open, setOpen] = useState(false);
    const [record, setRecord] = useState<API.AdminRoleDTO>();
    const [form] = Form.useForm();
    const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
    const [api, contextHolder] = notification.useNotification();

    const showDrawer = () => {
        setOpen(true);
    };

    const onClose = () => {
        setOpen(false);
    };

    useImperativeHandle(ref, () => {
        return {
            create(pRecord: API.AdminRoleDTO) {
                showDrawer();
                setRecord(pRecord);
            },
            update(pRecord: API.AdminRoleDTO, isView: boolean) {
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
    const items: TabsProps['items'] = [
        {
            key: 'users',
            label: 'Gán chức năng cho nhóm phân quyền',
            children: <TabChucNangChoNhomPhanQuyen open={open} record={record}/>,
        },
        {
            key: 'permissions',
            label: 'Gán quyền cho người dùng',
            children: <TabQuyenNguoiDung open={open} record={record}/>,
        },
    ];
    const onChange = (key: string) => {
        console.log(key);
    };


    const columns = [
        // {
        //     title: intl.formatMessage({id: 'pages.category.group.table.orderNo', defaultMessage: 'STT'}),
        //     dataIndex: 'orderNo',
        //     key: 'orderNo',
        //     render: (text: string, row: API.QthtTaikhoanDTO, index: number) => index + 1,
        // },
        {
            title: "ID",
            dataIndex: 'id',
            key: 'id',
        },
        {
            title: "Quyền",
            dataIndex: 'quyen',
            key: 'quyen',
        },
    ]

    return (
        <>
            {contextHolder}
            <Drawer
                title="Phân quyền quản lý nhóm quyền"
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
                <Tabs defaultActiveKey="1" items={items} onChange={onChange} />
            </Drawer>

        </>
    );
})


export default SidebarPhanQuyenGroup;
