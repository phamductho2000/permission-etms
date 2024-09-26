import {Button, Card, Form, Input, Row, Space, Table, Tooltip} from "antd";
import {SearchOutlined, UserAddOutlined} from "@ant-design/icons";
import {PageContainer} from "@ant-design/pro-layout";
import SidebarPhanQuyenUser, {RefType} from "@/pages/permission/user/sidebar-phan-quyen-user";
import {useEffect, useRef, useState} from "react";
import HcmaSelect from "@/components/HcmaSelect";
import {useModel} from "@@/exports";
import {getAllZtbMapCqtDto} from "@/services/apis/ztbMapCqtController";
import {usePagination} from "ahooks";

export default function ManageUser() {
    const createSideBarRef = useRef<RefType>();
    const [form] = Form.useForm();
    const {listTblUsers, loadData, getAll} = useModel('tbl-user');
    const [dmAllcucthue, setdmAllcucThue] = useState<API.ZtbMapCqtDTO[]>([]);
    const [applicationList, setApplicationList] = useState<API.TblUsersDTO[]>([]);
    const {paginationQuery, paginationProps} = usePagination({sort: 'taiKhoan,ASC'});
    const [dataSelectTongCucThue , setDataSelectTongCucThue] = useState([]);
    const [dataSelectCucThue , setDataSelectCucThue] = useState([]);
    const [selectedCucThue , setSelectedCucThue] = useState();
    const [dataSelectChiCucThue , setDataSelectChiCucThue] = useState([]);
    const [selectedChiCucThue , setselectedChiCucThue] = useState();

    useEffect(() => {
        getAll(applicationList)
    }, [open])

    // // lọc ra danh sách tổng cục thuế
    const dataTongCucThue = dmAllcucthue.filter(item => item.maCqt === '0000')
    console.log('dataTongCucThue', dataTongCucThue)

    // // lọc ra danh sách cục thuế
    useEffect(() => {
        if (dataSelectTongCucThue && dmAllcucthue.length > 0) {
            const dataCucThue = dmAllcucthue.filter(item => item?.maCha4 === dataSelectTongCucThue)
            setDataSelectCucThue(dataCucThue);
            console.log('dataCucThue', dataCucThue)
        }
    }, [dataSelectTongCucThue, dmAllcucthue]);
    console.log('dataSelectCucThue', dataSelectCucThue)


    // lọc ra danh sách chi cục thuế
    useEffect(() => {
        if(selectedCucThue && dmAllcucthue.length > 0) {
            const dataChiCucThue = dmAllcucthue.filter(item => item?.maCha4 === selectedCucThue)
            setDataSelectChiCucThue(dataChiCucThue)
            console.log('dataChiCucThue', dataChiCucThue)
        }
    }, [selectedCucThue, dmAllcucthue]);

    console.log('dataSelectTongCucThue',dataSelectTongCucThue);
    console.log('dataSelectCucThue',dataSelectCucThue);
    console.log('dataSelectChiCucThue',dataSelectChiCucThue);

    const handleLoadData = (formValue?: API.TblUsersDTO|null) => { //formValue là giá trị bất kì được điền vào các ô tra cứu, được useForm quản lý
        if (formValue) {
            loadData(paginationQuery, formValue);
        } else {
            form.validateFields().then((formValue: API.TblUsersDTO) => {
                loadData(paginationQuery, formValue);
                console.log('formvalue', formValue)
            })
        }
    };
    useEffect(() => {
        getAllZtbMapCqtDto({page: 0, size: 0}, {}).then(resp => setdmAllcucThue(resp))
    }, [])
    // column table
    const columns = [
        {
            title: "STT",
            dataIndex: 'stt',
            key: 'stt',
            render: (text: string, row: API.TblUsersDTO, index: number) => index + 1,
        },
        {
            title: "ID",
            dataIndex: 'userId',
            key: 'userId',
        },
        {
            title: "Tài khoản",
            dataIndex: 'username',
            key: 'username',
        },
        {
            title: "Họ Và Tên",
            dataIndex: 'created',
            key: 'created',
        },
        {
            title: "Thao tác",
            dataIndex: 'id',
            key: 'id',
            render: (id: string, record: API.TblUsersDTO) =>
                <Space>
                    <Tooltip placement="top" title='Phân quyền'>
                        <Button onClick={() => createSideBarRef.current?.create(record)}
                                icon={<UserAddOutlined/>}>
                        </Button>
                    </Tooltip>
                </Space>
        },
    ]
    return (<>
            <PageContainer title={"Gán cơ quan thuế quản lý cho NSD"}>
                <div style={{marginTop: "10px"}}>
                    <Form
                        name="form-group-create"
                        form={form}
                        labelWrap
                        labelCol={{flex: '120px'}}
                        wrapperCol={{span: 16}}
                    >
                        <Row>
                            <Form.Item<API.ZtbMapCqtDTO> label={"Tổng cục thuế"} name={'maCqt'} style={{width: "350px"}} >
                                <HcmaSelect hcmaOptions={dataTongCucThue} hcmaKey={'maCqt'} hcmaLabel={'tenCqtDai'} onChange={e => setDataSelectTongCucThue(e)}/>
                            </Form.Item>
                            <Form.Item<API.ZtbMapCqtDTO> label={"Cục thuế"} name={'maCqt1'} style={{width: "350px"}} >
                                <HcmaSelect hcmaOptions={dataSelectCucThue} hcmaKey={'maCqt'} hcmaLabel={'tenCqtDai'} onChange={e => setSelectedCucThue(e)} />
                            </Form.Item>
                            <Form.Item<API.ZtbMapCqtDTO> label={"Chi cục thuế"} name={'maCqt2'} style={{width: "350px"}} >
                                <HcmaSelect hcmaOptions={dataSelectChiCucThue} hcmaKey={'maCqt'} hcmaLabel={'tenCqtDai'} onChange={e => setselectedChiCucThue(e)}/>
                            </Form.Item>
                            <Form.Item label={""} style={{width: "250px", marginLeft: "100px"}} >
                                <Input placeholder="Tên truy cập" />
                            </Form.Item>
                            <Button type="primary" style={{marginLeft: "10px"}} icon={<SearchOutlined />} onClick={() => handleLoadData()} >Tìm Kiếm</Button>
                        </Row>
                    </Form>
                </div>
                <div>
                    <Card>
                        <Space>
                        </Space>
                        <Table
                            dataSource={listTblUsers}
                            columns={columns}
                            style={{marginTop: 14}}
                            // pagination={{...paginationProps, total: total}}
                            rowKey={"ma"}
                        />
                    </Card>
                </div>
            </PageContainer>

            <SidebarPhanQuyenUser ref={createSideBarRef}/>

        </>
    )
}
