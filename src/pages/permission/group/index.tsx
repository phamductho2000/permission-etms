import {Button, Card, Form, Popconfirm, Space, Table, Tooltip} from "antd";
import {DeleteOutlined, EditOutlined, EyeOutlined, UserAddOutlined} from "@ant-design/icons";
import {PageContainer} from "@ant-design/pro-layout";
import {useEffect, useRef} from "react";
import SidebarPhanQuyenGroup, {RefType} from "@/pages/permission/group/sidebar-phan-quyen-group";
import CreatFromGroup, {RefTypeAdminRole} from "@/pages/permission/group/creat-from-group";
import {useModel} from "@umijs/max";
import {usePagination} from "ahooks";
import dayjs from "dayjs";
import {authenticate} from "@/services/apis/jwtApi";

export default function ManageGroup() {
    const createSideBarRef = useRef<RefType>();
    const createForm = useRef<RefTypeAdminRole>();
    const [form] = Form.useForm();
    const {listAdminRole,loadData, total, deleteadminrole} = useModel('admin-role');
    const { paginationQuery, paginationProps } = usePagination({ sort: 'ten,ASC' });

    const handleLoadData = (formValue?: API.UserRoleDTO) => {
        if (formValue) {
            loadData(paginationQuery, formValue);
        } else {
            form.validateFields().then((formValue: API.AdminRoleDTO) => {
                loadData(paginationQuery, formValue);
                console.log('formvalue', formValue)
            })
        }
    };

    useEffect(() => {
        console.log('listAdminRole', listAdminRole)
        console.log('loadData', loadData)

        handleLoadData();
    }, [paginationQuery])
    // column table
    const columns = [
        {
            title: "STT",
            dataIndex: 'stt',
            key: 'stt',
            render: (text: string, row: API.AdminRoleDTO, index: number) => index + 1,
        },
        {
            title: "ID",
            dataIndex: 'roleId',
            key: 'roleId',
        },
        {
            title: "Tên nhóm quyền",
            dataIndex: 'roleName',
            key: 'roleName',
        },
        {
            title: "Ghi chú",
            dataIndex: 'note',
            key: 'note',
        },
        {
            title: "Ngày cập nhật",
            dataIndex: 'updatedDate',
            key: 'updatedDate',
            render: (text: string, row: API.AdminRoleDTO) => row?.updatedDate ? dayjs(row?.updatedDate).format("DD/MM/YYYY hh:mm:ss") : '',
        },
        {
            title: "Thao tác",
            dataIndex: 'roleId',
            key: 'roleId',
            render: (id: string, record: API.AdminRoleDTO) =>
                <Space>
                    <Tooltip placement="top" title='Xem'>
                        <Button onClick={() => createForm.current?.update(record, true)}
                                icon={<EyeOutlined/>}>
                        </Button>
                    </Tooltip>

                    <Tooltip placement="top" title='Sửa'>
                        <Button onClick={() => createForm.current?.update(record, false)}
                                icon={<EditOutlined/>}></Button>
                    </Tooltip>
                    <Tooltip placement="top" title='Phân quyền'>
                        <Button onClick={() => createSideBarRef.current?.create(record)}
                                icon={<UserAddOutlined/>}>
                        </Button>
                    </Tooltip>
                    <Popconfirm
                        placement="top"
                        title={"Xóa"}
                        description={"Bạn có chắc chắn muốn xóa bản ghi này?"}
                        okText="Đồng ý"
                        cancelText="Hủy" onConfirm={() => {
                        deleteadminrole(id)
                    }}
                    >
                        <Tooltip title={"xóa bản ghi"}><Button danger icon={<DeleteOutlined/>}></Button></Tooltip>
                    </Popconfirm>
                </Space>
        },
    ]
    return (<>
            <PageContainer title={"Quản lý nhóm quyền"}>
                <div style={{marginTop: "10px"}}>
                    <Form
                        name="form-group-create"
                        form={form}
                        labelWrap
                        labelCol={{span: 4}}
                        wrapperCol={{span: 16}}
                    >
                        {/*<Row>*/}
                        {/*    <Form.Item label={""} style={{width: "350px"}} >*/}
                        {/*        <Input placeholder="ID or Họ và Tên"/>*/}
                        {/*    </Form.Item>*/}
                        {/*    <Button type="primary" style={{marginLeft: "-80px"}} icon={<SearchOutlined />} >Tìm Kiếm</Button>*/}
                        {/*</Row>*/}
                    </Form>
                </div>
                <div>
                    <Card>
                        <Space>
                            <Button type='primary' onClick={() => createForm.current?.create(false)}>Thêm mới</Button>
                            {/*<Button icon={<ReloadOutlined/>} onClick={handleLoadData}></Button>*/}
                        </Space>
                        <Table
                            dataSource={listAdminRole}
                            columns={columns}
                            style={{marginTop: 14}}
                            pagination={{...paginationProps, total: total}}
                            rowKey={"ma"}
                        />
                    </Card>
                </div>
            </PageContainer>
            <SidebarPhanQuyenGroup ref={createSideBarRef}/>
            <CreatFromGroup ref={createForm} onReLoadList={handleLoadData} />

        </>
    )
}
