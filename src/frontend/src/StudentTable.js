
import { Button, Spin, Empty, Table } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import StudentDrawerForm  from "./StudentDrawerForm";

function StudentTable({columns, students, showDrawer, setShowDrawer,fetching, fetchStudents, antIcon}) {


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
                className="student-table"
                dataSource={students}
                style={{margin: '10px'}}
                columns={columns(fetchStudents)}
                rowKey={(student) => student._id}
                size="small"
                pagination={{pageSize: 50}}
            />
        </>
    }


}

export default StudentTable;