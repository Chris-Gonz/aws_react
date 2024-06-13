import {useState, useEffect} from 'react';
import {deleteStudent, getAllStudents} from "./client.js";
import {Layout, Menu, Breadcrumb, Table, Button, Badge, Tag, Popconfirm} from "antd";
import {
    PlusOutlined,
    DesktopOutlined,
    PieChartOutlined,
    FileOutlined,
    TeamOutlined,
    UserOutlined
} from "@ant-design/icons";

import StudentDrawerForm from "./StudentDrawerForm.js"
import {errorNotification} from "./Notification";
import "./App.css";
import Avatar from "antd/lib/avatar/avatar";

const {Header, Content, Footer, Sider} = Layout;
const {SubMenu} = Menu;
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
    return <Avatar>
        {`${name.charAt(0)}${name.charAt(name.length - 1)}`}
    </Avatar>;
}

const removeStudent  = (studentId, callback) => {
    deleteStudent(studentId, callback);
}

const columns =  [
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
                    onConfirm={() => removeStudent(student.id, fetchStudents)}
                    okText='Yes'
                    cancelText='No'>
                    <Radio.Button value="small">Delete</Radio.Button>
                </Popconfirm>
                <Radio.Button onClick={() => alert("TODO: Implement edit student")} value="small">Edit</Radio.Button>
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
            console.log(err.response)
            err.response.json().then(res => {
                console.log(res);
                errorNotification(
                    "There was an issue",
                    `${res.message} [${res.status}] [${res.error}]`
                )
            });
        }).finally(() => setFetching(false))

    useEffect(() => {
        console.log("component is mounted");
        fetchStudents();
    }, []);

    const renderStudents = () => {
        if (students.length < 0) {
            return "no data available!";}
        return <>
            <StudentDrawerForm
                showDrawer={showDrawer}
                setShowDrawer={setShowDrawer}
                fetchStudents={fetchStudents}
            />


        <Table
            className={"main-table"}
            dataSource={students || []}
            columns={columns}
            bordered
            title={() =>
                <>
                    <Badge count={students.length} className="site-badge-student-count"/>
                    <Tag  className="student-number-tag">students</Tag>
                    <Button
                        onClick={() => setShowDrawer(!showDrawer)}
                        id="addStudentButton" className="leftAlignButton" type="primary" size="small" icon={<PlusOutlined />}>Add student</Button>
                </>
            }
        />
    </>
    }

    return <Layout style={{minHeight: '100vh'}}>
        <Sider collapsible collapsed={collapsed}
               onCollapse={setCollapsed}>
            <div className="logo"/>
            <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
                <Menu.Item key="1" icon={<PieChartOutlined/>}>
                   Main
                </Menu.Item>
                <SubMenu key="sub1" icon={<UserOutlined/>} title="User">
                    <Menu.Item key="4">Bill</Menu.Item>
                    <Menu.Item key="5">Alex</Menu.Item>
                </SubMenu>
                <Menu.Item key="9" icon={<FileOutlined/>}>
                    Files
                </Menu.Item>
            </Menu>
        </Sider>
        <Layout className="site-layout">
            <Header className="site-layout-background" style={{padding: 0}}/>
            <Content style={{margin: '0 16px'}}>
                <Breadcrumb style={{margin: '16px 0'}}>
                    <Breadcrumb.Item>User</Breadcrumb.Item>
                    <Breadcrumb.Item>Bill</Breadcrumb.Item>
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
