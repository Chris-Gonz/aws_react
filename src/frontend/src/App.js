import {useState, useEffect} from 'react';
import {deleteStudent, getAllStudents, updateStudent} from "./client.js";
import {Layout, Menu, Breadcrumb, Table, Button, Badge, Tag, Radio, Popconfirm, Spin, Empty} from "antd";
import {
    PlusOutlined,
    FileOutlined,
    UserOutlined,
    LoadingOutlined,
} from "@ant-design/icons";

import StudentDrawerForm from "./StudentDrawerForm.js"
import { errorNotification, successNotification } from "./Notification";
import "./App.css";
import Avatar from "antd/lib/avatar/avatar";

const {Header, Content, Footer, Sider} = Layout;
const {SubMenu} = Menu;
const antIcon = <LoadingOutlined style={{fontSize: 24}} spin/>;


const TheAvatar = ({name}) => {

    let trimmedName = name.trim();
    if (trimmedName === 0) {
        return <Avatar icon={UserOutlined}/>
    }
    const split1 = trimmedName.split(" ");
    if (split1.length === 1) {
        // Display first char of name as Avatar
        return <Avatar>{name.charAt(0)}</Avatar>
    }
    return <Avatar >
        {`${name.charAt(0)}${name.charAt(name.length - 1)}`}
    </Avatar>;
}


const removeStudent  = (studentId, callback) => {
    return deleteStudent(studentId, callback);
}

const columns = fetchStudents =>  [
    {
        title: '',
        dataIndex: 'avatar',
        key: 'avatar',
        render: (text, student) => <TheAvatar name={student.name}/>
    },
    {
        title: 'Id',
        dataIndex: 'id',
        key: 'id',
    },
    {
        title: 'Name',
        dataIndex: 'name',
        key: 'name',
    },
    {
        title: 'Email',
        dataIndex: 'email',
        key: 'email',
    },
    {
        title: 'GENDER',
        dataIndex: 'gender',
        key: 'gender'
    },
    {
        title: 'ACTIONS',
        key: 'actions',
        render: (text, student) =>
            <Radio.Group>
                <Popconfirm
                    placement='topRight'
                    title={`Are you sure to delete ${student.name}`}
                    onConfirm={() => {removeStudent(student.id)
                        .then(fetchStudents)}}
                    okText='Yes'
                    cancelText='No'>
                    <Radio.Button value="small">Delete</Radio.Button>
                </Popconfirm>
            </Radio.Group>
    }
];


function App() {
    const [students, setStudents] = useState([]);
    const [collapsed, setCollapsed] = useState(false);
    const [fetching, setFetching] = useState(true);
    const [showDrawer, setShowDrawer] = useState(false);

    const fetchStudents = () =>
        getAllStudents()
            .then(res => res.json())
            .then(data => {
                console.log(data);
                setStudents(data);
            }).catch(err => {
            console.log(err.response.data);
            err.response.json().then(res => {
                console.log(res);
                errorNotification(
                    "There was an error.",
                        `${res.message} [${res.status}] [${res.errorCode}]`
                );
            });
        }).finally(() => setFetching(false))

    useEffect(() => {
        console.log("component is mounted");
        fetchStudents();
    }, []);


    const renderStudents = () => {
        if (fetching) {
            return <Spin indicator={antIcon}/>
        }
        if (students.length <= 0) {
            return <>
                <Button
                    onClick={() => setShowDrawer(!showDrawer)}
                    type="primary" shape="round" icon={<PlusOutlined/>} size="small">
                    Add New Student
                </Button>
                <StudentDrawerForm
                    showDrawer={showDrawer}
                    setShowDrawer={setShowDrawer}
                    fetchStudents={fetchStudents}
                />
                <Empty/>
            </>
        }
        return <>
            <StudentDrawerForm
                showDrawer={showDrawer}
                setShowDrawer={setShowDrawer}
                fetchStudents={fetchStudents}
            />
            <Table
                className={"main-table"}
                dataSource={students || []}
                columns={columns(fetchStudents)}
                bordered
                title ={() =>
                    <>
                        <Badge count={students.length} className="site-badge-student-count"/>
                        <Tag className="student-number-tag">students</Tag>
                        <Button
                            onClick={() => setShowDrawer(!showDrawer)}
                            id="addStudentButton" className="leftAlignButton" type="primary" size="small"
                            icon={<PlusOutlined/>}>
                                Add student
                            </Button>
                    </>
                }
                pagination={{pageSize: 10}}
                scroll={{y: 600}}
                rowKey={student => student.id}
        />
        </>
    }

    return <Layout style={{minHeight: '100vh'}}>
        <Sider collapsible collapsed={collapsed}
               onCollapse={setCollapsed}>
            <div className="logo"/>
            <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
                <Menu.Item key="1" icon={<UserOutlined/>}>
                   Christian Gonzalez
                </Menu.Item>
                <SubMenu key="sub1" icon={<FileOutlined/>} title="Projects">
                    <Menu.Item key="4">APP1</Menu.Item>
                    <Menu.Item key="5" >APP2</Menu.Item>
                </SubMenu>
            </Menu>
        </Sider>
        <Layout className="site-layout">
            <Header className="site-layout-background" style={{padding: 0}}/>
            <Content style={{margin: '0 16px'}}>
                <Breadcrumb style={{margin: '16px 0'}}>
                    <Breadcrumb.Item>Projects</Breadcrumb.Item>

                </Breadcrumb>
                <div className="site-layout-background" style={{padding: 24, minHeight: 360}}>
                    {renderStudents()}
                </div>
            </Content>
            <Footer style={{textAlign: 'center'}}> CVG </Footer>
        </Layout>
    </Layout>
}

export default App;
