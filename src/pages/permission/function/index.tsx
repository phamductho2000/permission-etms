// import {Button, Card, Form, Input, Popconfirm, Row, Space, Table, Tooltip} from "antd";
// import {DeleteOutlined, EditOutlined, EyeOutlined, SearchOutlined, UserAddOutlined} from "@ant-design/icons";
// import {PageContainer} from "@ant-design/pro-layout";
// import SidebarPhanQuyenFunction from "@/pages/permission/function/sidebar-phan-quyen-function";
// import {useEffect, useRef, useState} from "react";
// import {RefType} from "@/pages/permission/function/sidebar-phan-quyen-function";
// import {useModel} from "@@/exports";
//
// export default function ManageFunction() {
//     const createSideBarRef = useRef<RefType>();
//     const [form] = Form.useForm();
//     const {listAdminFunc,loadData, total} = useModel('admin-funciton');
//     const [applicationList, setApplicationList] = useState<API.AdminFuncDTO[]>([]);
//
//     useEffect(() => {
//         loadData(applicationList)
//     }, [open]);
//
//     // column table
//     const columns = [
//         {
//             title: "STT",
//             dataIndex: 'stt',
//             key: 'stt',
//             render: (text: string, row: API.AdminFuncDTO, index: number) => index + 1,
//         },
//         {
//             title: "ID",
//             dataIndex: 'funcId',
//             key: 'funcId',
//         },
//         {
//             title: "Tên truy cập",
//             dataIndex: 'funcName',
//             key: 'funcName',
//         },
//         {
//             title: "Họ Và Tên",
//             dataIndex: 'hoVaTen',
//             key: 'hoVaTen',
//         },
//         {
//             title: "Cơ quan thuế",
//             dataIndex: 'funcCode',
//             key: 'funcCode',
//         },
//         {
//             title: "Thao tác",
//             dataIndex: 'id',
//             key: 'id',
//             render: (id: string, record: API.AdminFuncDTO) =>
//                 <Space>
//                     <Tooltip placement="top" title='Phân quyền'>
//                         <Button onClick={() => createSideBarRef.current?.create(record)}
//                                 icon={<UserAddOutlined/>}>
//                         </Button>
//                     </Tooltip>
//                 </Space>
//         },
//     ]
//     return (<>
//             <PageContainer title={"Phân quyền sử dụng chức năng"}>
//                 <div style={{marginTop: "10px"}}>
//                     <Form
//                         name="form-group-create"
//                         form={form}
//                         labelWrap
//                         labelCol={{span: 4}}
//                         wrapperCol={{span: 16}}
//                     >
//                         <Row>
//                             <Form.Item label={""} style={{width: "350px"}} >
//                                 <Input placeholder="ID or Họ và Tên"/>
//                             </Form.Item>
//                             <Button type="primary" style={{marginLeft: "-80px"}} icon={<SearchOutlined />} >Tìm Kiếm</Button>
//                         </Row>
//                     </Form>
//                 </div>
//                 <div>
//                     <Card>
//                         <Space>
//                             {/*<Button type='primary' onClick={() => createFormRef.current?.create(false)}>Thêm mới</Button>*/}
//                             {/*<Button icon={<ReloadOutlined/>} onClick={handleLoadData}></Button>*/}
//                         </Space>
//                         <Table
//                             dataSource={listAdminFunc}
//                             columns={columns}
//                             style={{marginTop: 14}}
//                             // pagination={{...paginationProps, total: total}}
//                             rowKey={"ma"}
//                         />
//                     </Card>
//                 </div>
//             </PageContainer>
//
//             <SidebarPhanQuyenFunction ref={createSideBarRef}/>
//
//         </>
//     )
// }
