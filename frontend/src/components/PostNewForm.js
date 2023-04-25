import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import Axios from 'axios';
import { Form, Input, Button, Upload, Modal, notification } from 'antd';
import { PlusOutlined, FrownOutlined } from '@ant-design/icons';
import { useAppContext } from 'store';
import { getBase64FromFile } from 'utils/base64';
import { parseErrorMessages } from 'utils/forms';

function PostNewForm() {
    const navigate = useNavigate();

    const { store: { accessToken } } = useAppContext();
    
    const [fileList, setFileList] = useState([]);
    const [previewPhoto, setPreviewPhote] = useState({
        visible: false,
        base64: null
    });
    const [fieldErrors, setFieldErrors] = useState({});

    const handleUpladChange = ({ fileList }) => {
        setFileList(fileList);
    }

    const handlePreviewPhoto = async (file) => {
        if (!file.url && !file.preview) {
            file.preview = await getBase64FromFile(file.originFileObj);
        }

        setPreviewPhote({
            visible: true,
            base64: file.url || file.preview
        });
    };

    const handleFinish = async (fieldValues) => {
        const headers = { Authorization: `Bearer ${accessToken}` }
        const { caption, location, photo: { fileList } } = fieldValues;
        const formData = new FormData();

        formData.append('caption', caption);
        formData.append('location', location);

        fileList.forEach(file => {
            formData.append('photo', file.originFileObj);
        })

        try {
            const response = await Axios.post('http://127.0.0.1:8000/api/posts/', formData, { headers });
            console.log('success response: ', response);
            navigate('/');

        } catch(error) {
            if (error.response) {
                const { status, data: fieldsErrorMessages } = error.response;

                if (typeof fieldsErrorMessages === 'string') {
                    notification.open({
                        message: '서버 오류',
                        description: `에러) ${status} 응답을 받았습니다. 서버 에러를 확인해주세요.`,
                        icon: <FrownOutlined style={{ color: '#ff3333' }} />
                    });
                } else {
                    setFieldErrors(parseErrorMessages(fieldsErrorMessages));
                }
            }
        }
    };

    const layout = {
        labelCol: { span: 8 },
        wrapperCol: { span: 16 }
    };
      
    const tailLayout = {
        wrapperCol: { offset: 8, span: 16 }
    };

    return (
        <Form
            {...layout}
            onFinish={handleFinish}
            autoComplete={"false"}
        >
            <Form.Item
                label="Caption"
                name="caption"
                rules={[{ 
                    required: true, 
                    message: "Caption을 입력해주세요." 
                }]}
                hasFeedback
                {...fieldErrors.caption}
                {...fieldErrors.non_field_errors}
            >
                <Input.TextArea />
            </Form.Item>

            <Form.Item
                label="Location"
                name="location"
                rules={[{ 
                    required: true, 
                    message: "Location을 입력해주세요." 
                }]}
                hasFeedback
                {...fieldErrors.location}
                {...fieldErrors.non_field_errors}
            >
                <Input />
            </Form.Item>
    
            <Form.Item 
                label='photo' 
                name='photo' 
                rules={[{
                    required: true, 
                    message: '사진을 입력해주세요.'
                }]}
                hasFeedback
                {...fieldErrors.photo}
            >
                <Upload 
                    listType='picture-card' 
                    fileList={fileList}
                    beforeUpload={() => { 
                        return false; 
                    }}
                    onChange={handleUpladChange}
                    onPreview={handlePreviewPhoto}
                >
                    {fileList.length > 0 ? null : (
                        <div>
                            <PlusOutlined />
                            <div className="ant-upload-text">
                                Upload
                            </div>
                        </div>
                    )}
                    
                </Upload>
            </Form.Item>
    
            <Form.Item {...tailLayout}>
                <Button type="primary" htmlType="submit">
                    Submit
                </Button>
            </Form.Item>

            <Modal 
                open={previewPhoto.visible}
                footer={null}
                onCancel={() => setPreviewPhote({
                    visible: false
                })}
            >
                <img
                    src={previewPhoto.base64} 
                    alt='preview' 
                    style={{ width: '100%' }}
                />
            </Modal>
        </Form>
    );
}

export default PostNewForm;