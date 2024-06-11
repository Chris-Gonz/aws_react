import {Drawer, Input, Col, Select, Form, Row, Button, Spin} from 'antd';
import {addNewStudent} from "./client";
import {successNotification, errorNotification} from "./Notification";
import {useState} from "react";

const {Option} = Select;

const antIcon = () => <Spin />;


function StudentDrawerForm({showDrawer, setShowDrawer, fetchStudents}) {
    const onCLose = () => setShowDrawer(false);
    const [submitting, setSubmitting] = useState(false);

    const onFinish = student => {
        setSubmitting(true)
        console.log(JSON.stringify(student, null, 2))
        addNewStudent(student)
            .then(() => {
                console.log("Student Added.")
                onCLose();
                successNotification(
                    "Successfully added!",
                    `${student.name} was added to the system`
                )
                fetchStudents();
            }).catch(err => {
            console.log("Error adding student: ", err);
            try {
                const responseJson = err.response
                return responseJson.then(res => {
                    errorNotification(
                        "There was an issue",
                        `${res.message} [${res.status}] [${res.error}]`,
                        "bottomLeft"
                    )
                });
            } catch (error) {
                console.error("Failed to parse error response:", error);
            }
        }).finally(() => {
            setSubmitting(false);
        })
    };


    const onFinishFailed = errorInfo => {
        alert(JSON.stringify(errorInfo, null, 2));
    };

    return <Drawer
        title="Create new student"
        width={720}
        onClose={onCLose}
        visible={showDrawer}
        bodyStyle={{paddingBottom: 80}}
        footer={
            <div
                style={{
                    textAlign: 'right',
                }}
            >
                <Button onClick={onCLose} style={{marginRight: 8}}>
                    Cancel
                </Button>
            </div>
        }
    >
        <Form layout="vertical"
              onFinishFailed={onFinishFailed}
              onFinish={onFinish}
              hideRequiredMark>
            <Row gutter={16}>
                <Col span={12}>
                    <Form.Item
                        name="name"
                        label="Name"
                        rules={[{required: true, message: 'Please enter student name'}]}
                    >
                        <Input placeholder="Please enter student name"/>
                    </Form.Item>
                </Col>
                <Col span={12}>
                    <Form.Item
                        name="email"
                        label="Email"
                        rules={[{required: true, message: 'Please enter student email'}]}
                    >
                        <Input placeholder="Please enter student email"/>
                    </Form.Item>
                </Col>
            </Row>
            <Row gutter={16}>
                <Col span={12}>
                    <Form.Item
                        name="gender"
                        label="gender"
                        rules={[{required: true, message: 'Please select a gender'}]}
                    >
                        <Select placeholder="Please select a gender">
                            <Option value="MALE">MALE</Option>
                            <Option value="FEMALE">FEMALE</Option>
                            <Option value="OTHER">OTHER</Option>
                        </Select>
                    </Form.Item>
                </Col>
            </Row>
            <Row>
                <Col span={12}>
                    <Form.Item >
                        <Button type="primary" htmlType="submit">
                            Submit
                        </Button>
                    </Form.Item>
                </Col>
                <Col>{submitting && <Spin indicator={antIcon} />}</Col>
            </Row>
        </Form>
    </Drawer>
}

export default StudentDrawerForm;