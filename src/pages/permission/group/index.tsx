import {Button, Card, Form, Popconfirm, Space, Table, Tooltip} from "antd";
import {DeleteOutlined, EditOutlined, EyeOutlined, UserAddOutlined} from "@ant-design/icons";
import {PageContainer} from "@ant-design/pro-layout";
import {useEffect, useRef} from "react";
import SidebarPhanQuyenGroup, {RefType} from "@/pages/permission/group/sidebar-phan-quyen-group";
import CreatFromgroup, {RefTypeAdminRole} from "@/pages/permission/group/creat-from-group";
import {useModel} from "@umijs/max";
import {usePagination} from "ahooks";

export default function ManageGroup() {
    const createSideBarRef = useRef<RefType>();
    const createForm = useRef<RefTypeAdminRole>();
    const [form] = Form.useForm();
    const {listgroupMember, loadData, total} = useModel('group-member');
    const {loadData1, listgroup, total1} = useModel('group');
    const { paginationQuery, paginationProps } = usePagination({ sort: 'ten,ASC' });

    const handleLoadData = (formValue?: API.AUserRoleDTO) => {
        if (formValue) {
            loadData(paginationQuery, formValue);
            loadData1(paginationQuery, formValue);
        } else {
            form.validateFields().then((formValue: API.AdminRoleDTO) => {
                loadData(paginationQuery, formValue);
                loadData1(paginationQuery, formValue);
                console.log('formvalue', formValue)
            })
        }
    };
    // useEffect(() => {
    //     loadData1(paginationQuery)
    // }, []);

    useEffect(() => {
        console.log('loadData', loadData)

        handleLoadData();
    }, [paginationQuery])
    // column table
    const columns = [
        {
            title: "STT",
            dataIndex: 'stt',
            key: 'stt',
            render: (text: string, row: API.AUserRoleDTO, index: number) => index + 1,
        },
        {
            title: "Tài khoản",
            dataIndex: 'gmember',
            key: 'gmember',
        },
        {
            title: "Tên miền",
            dataIndex: 'domain',
            key: 'domain',
        },
        {
            title: "Cơ quan thuế",
            dataIndex: 'taxo',
            key: 'taxo',
        },
        {
            title: "Thao tác",
            dataIndex: 'roleId',
            key: 'roleId',
            render: (id: string, record: API.AUserRoleDTO) =>
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
                        // deleteadminrole(id)
                    }}
                    >
                        <Tooltip title={"xóa bản ghi"}><Button danger icon={<DeleteOutlined/>}></Button></Tooltip>
                    </Popconfirm>
                </Space>
        },
    ]

    const columnsgroup = [
        {
            title: "STT",
            dataIndex: 'stt',
            key: 'stt',
            render: (text: string, row: API.AUserRoleDTO, index: number) => index + 1,
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
        {
            title: "Thao tác",
            dataIndex: 'roleId',
            key: 'roleId',
            render: (id: string, record: API.AGroupsDTO) =>
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
                    {/*<Popconfirm*/}
                    {/*    placement="top"*/}
                    {/*    title={"Xóa"}*/}
                    {/*    description={"Bạn có chắc chắn muốn xóa bản ghi này?"}*/}
                    {/*    okText="Đồng ý"*/}
                    {/*    cancelText="Hủy" onConfirm={() => {*/}
                    {/*    // deleteadminrole(id)*/}
                    {/*}}*/}
                    {/*>*/}
                    {/*    <Tooltip title={"xóa bản ghi"}><Button danger icon={<DeleteOutlined/>}></Button></Tooltip>*/}
                    {/*</Popconfirm>*/}
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
                        <div>
                            <Table
                                dataSource={listgroupMember}
                                columns={columns}
                                style={{marginTop: 14}}
                                pagination={{...paginationProps, total: total}}
                                rowKey={"ma"}
                            />
                        </div>
                    </Card>
                </div>

                <div style={{marginTop: "20px"}}>
                    <Card>
                        <Space>
                        </Space>
                        <div>
                            <Table
                                dataSource={listgroup}
                                columns={columnsgroup}
                                style={{marginTop: 14}}
                                pagination={{...paginationProps, total: total}}
                                rowKey={"ma"}
                            />
                        </div>
                    </Card>
                </div>
            </PageContainer>
            <SidebarPhanQuyenGroup ref={createSideBarRef}/>
            <CreatFromgroup ref={createForm} onReLoadList={handleLoadData}/>

        </>
    )
}
