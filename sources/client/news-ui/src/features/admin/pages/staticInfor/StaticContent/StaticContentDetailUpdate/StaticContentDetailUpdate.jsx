import React from 'react';
import PropTypes from 'prop-types';
import styles from './StaticContentDetailUpdate.module.scss';
import classNames from 'classnames/bind';
import { Form, Modal, Input, TreeSelect, Row, Col, Upload, Button } from 'antd';
import { useState } from 'react';
import { useLayoutEffect } from 'react';
import inforStaticAPI from 'apis/inforStaticApi';
import { Direction, NotificationType } from 'common/enum';
import { openNotification } from 'helpers/notification';
import commonFunc from 'common/commonFunc';
import { Role, DEFAULT_COLUMN_ORDER_BY } from 'common/constant';
import convertHelper from 'helpers/convertHelper';
import TextArea from 'antd/lib/input/TextArea';
import { CKEditor } from 'ckeditor4-react';
import { TreeNode } from 'antd/lib/tree-select';
import { UploadOutlined } from '@ant-design/icons';
import imageHelper from 'helpers/imageHelper';

const LIMIT_UP_LOAD_FILE = 2_097_152; //2mb
const cx = classNames.bind(styles);
StaticContentDetailUpdate.propTypes = {};
function StaticContentDetailUpdate(props) {
    const [form] = Form.useForm();
    const [documentDetail, setDocumentDetail] = useState({});
    const [fileListAttachment, setFileListAttachment] = useState([]);
    const [fileList, setFileList] = useState([]);
    const [dataFilter, setDataFilter] = useState({
        categoryAll: [],
    });

    const handleChangeAttachment = ({ fileList: newFileList }) => {
        setFileListAttachment(newFileList);
    };

    useLayoutEffect(() => {
        getDataFilter();
    }, []);

    const callApiGetDetail = async (id, categoryAll = []) => {
        try {
            if (!id) return;

            const res = await inforStaticAPI.getNewsById(id);
            setDocumentDetail(res);
            res?.FilePath &&
                setFileListAttachment([
                    {
                        isFileFormServer: true,
                        uid: '1',
                        name: imageHelper.getNameFile(res?.FilePath),
                        status: 'done',
                        url: imageHelper.getLinkImageUrl(res?.FilePath),
                    },
                ]);
            res?.Avatar &&
                setFileList([
                    {
                        isFileFormServer: true,
                        uid: '1',
                        name: imageHelper.getNameFile(res?.Avatar),
                        status: 'done',
                        url: imageHelper.getLinkImageUrl(res?.Avatar),
                    },
                ]);

            form?.setFieldsValue({
                Title: res?.Title,
                Descritpion: res?.Descritpion,
                Content: res?.Content,
                StaticCategoryId: categoryAll.find((x) => x.Id === res?.StaticCategoryId)?.Title ?? '',
            });
        } catch (error) {
            openNotification('L???y d??? li???u th???t b???i', '', NotificationType.ERROR);
            return null;
        }
    };

    const getDataFilter = async () => {
        const filterAll = {
            currentPage: 1,
            pageSize: 9_999_999,
            direction: Direction.DESC,
            orderBy: DEFAULT_COLUMN_ORDER_BY,
        };
        const responseCategoryAll = inforStaticAPI.getStaticCategoryAll(filterAll);

        Promise.all([responseCategoryAll]).then((values) => {
            setDataFilter({
                categoryAll: values[0]?.PagedData?.Results ?? [],
            });

            callApiGetDetail(props?.Id, values[0]?.PagedData?.Results);
        });
    };

    const onUpdate = async (values) => {
        try {
            var formData = new FormData();
            formData.append('JsonString', convertHelper.Serialize(values.JsonString));
            if (values.Avatar) {
                formData.append('Avatar', values.Avatar);
            }
            if (values.FileAttachment) {
                formData.append('FileAttachment', values.FileAttachment);
            }
            await inforStaticAPI.updateContent(documentDetail?.Id, formData);
            openNotification('C???p nh???t t??i li???u th??nh c??ng');
            props?.onSuccess();
        } catch (error) {
            openNotification('C???p nh???t t??i li???u th???t b???i', '', NotificationType.ERROR);
        }
    };

    function onEditorChange(event) {
        setDocumentDetail({
            ...documentDetail,
            Content: event.editor.getData(),
        });
    }

    const handleChange = ({ fileList: newFileList }) => {
        setFileList(newFileList);
    };
    const uploadButton = <Button icon={<UploadOutlined />}>T???i l??n ???nh ?????i di???n</Button>;
    const generateTree = (arrNode) => {
        return arrNode.map((x) => (
            <TreeNode value={x.Title} title={x.Title} key={x.Id}>
                {x.children.length > 0 && generateTree(x.children)}
            </TreeNode>
        ));
    };
    const renderStaticCategoryId = (
        <TreeSelect
            showSearch
            style={{
                width: '100%',
            }}
            dropdownStyle={{
                maxHeight: 400,
                overflow: 'auto',
            }}
            placeholder='Ch???n lo???i tin t???c'
            allowClear
            treeDefaultExpandAll
        >
            {generateTree(commonFunc.list_to_tree(dataFilter?.categoryAll ?? []))}
        </TreeSelect>
    );

    return (
        <div>
            {documentDetail.Id && (
                <Modal
                    open={true}
                    title='T???o m???i n???i dung t??nh'
                    okText='Th??m m???i'
                    cancelText='Tho??t'
                    onCancel={() => {
                        props?.onCancel();
                    }}
                    width={1300}
                    centered
                    onOk={() => {
                        form.validateFields()
                            .then((values) => {
                                const { Title, Descritpion, StaticCategoryId } = values;
                                let bodyData = {
                                    Title,
                                    Descritpion,
                                    content: documentDetail?.Content,
                                };
                                if (StaticCategoryId) {
                                    bodyData.StaticCategoryId = parseInt(dataFilter?.categoryAll.find((x) => x.Title === StaticCategoryId)?.Id ?? undefined);
                                }

                                const role = commonFunc.getCookie('role');
                                bodyData.Status = role !== Role.ADMIN ? 0 : 1;
                                let body = { JsonString: bodyData };
                                if (fileList.length > 0 && !fileList?.[0]?.isFileFormServer) {
                                    const file = fileList[0].originFileObj;
                                    if (file.size > LIMIT_UP_LOAD_FILE) {
                                        openNotification('File ???nh ???? l???n h??n 2MB', '', NotificationType.ERROR);
                                        return;
                                    }
                                    body.Avatar = file;
                                } else if (fileList?.[0]?.isFileFormServer && fileList.length > 0) {
                                    bodyData = {
                                        ...bodyData,
                                        Avatar: documentDetail?.Avatar,
                                    };
                                }

                                if (fileListAttachment.length > 0 && !fileListAttachment?.[0]?.isFileFormServer) {
                                    const file = fileListAttachment[0].originFileObj;
                                    if (file.size > LIMIT_UP_LOAD_FILE) {
                                        openNotification('File ????nh k??m ???? l???n h??n 2MB', '', NotificationType.ERROR);
                                        return;
                                    }
                                    body.FileAttachment = file;
                                } else if (fileListAttachment?.[0]?.isFileFormServer && fileListAttachment.length > 0) {
                                    bodyData = {
                                        ...bodyData,
                                        FilePath: documentDetail?.FilePath,
                                    };
                                }
                                body = { ...body, JsonString: bodyData };

                                form.resetFields();
                                setFileList([]);
                                setFileListAttachment([]);
                                onUpdate(body);
                            })
                            .catch((info) => {
                                console.log('Validate Failed:', info);
                            });
                    }}
                >
                    <Form
                        form={form}
                        name='form_in_modal'
                        labelCol={{ span: 2 }}
                        initialValues={{
                            modifier: 'public',
                        }}
                    >
                        <Form.Item
                            label='Ti??u ?????'
                            name='Title'
                            rules={[
                                {
                                    required: true,
                                    message: 'S??? k?? hi???u kh??ng ???????c ????? tr???ng',
                                },
                            ]}
                        >
                            <Input />
                        </Form.Item>

                        <Form.Item name='Descritpion' label='M?? t???' style={{ marginBottom: 0 }}>
                            <TextArea
                                showCount
                                style={{
                                    height: 80,
                                }}
                            />
                        </Form.Item>
                        <Form.Item name='Content' label='N???i dung'>
                            <CKEditor
                                initData={documentDetail?.Content}
                                onChange={onEditorChange}
                                config={{
                                    language: 'vi',
                                    toolbarGroups: [
                                        {
                                            name: 'document',
                                            groups: ['mode', 'document', 'doctools'],
                                        },
                                        { name: 'clipboard', groups: ['clipboard', 'undo'] },
                                        {
                                            name: 'editing',
                                            groups: ['find', 'selection', 'spellchecker', 'editing'],
                                        },
                                        { name: 'forms', groups: ['forms'] },
                                        '/',
                                        '/',
                                        { name: 'basicstyles', groups: ['basicstyles', 'cleanup'] },
                                        {
                                            name: 'paragraph',
                                            groups: ['list', 'indent', 'blocks', 'align', 'bidi', 'paragraph'],
                                        },
                                        { name: 'links', groups: ['links'] },
                                        { name: 'insert', groups: ['insert'] },
                                        '/',
                                        { name: 'styles', groups: ['styles'] },
                                        { name: 'colors', groups: ['colors'] },
                                        { name: 'tools', groups: ['tools'] },
                                        { name: 'others', groups: ['others'] },
                                        { name: 'about', groups: ['about'] },
                                    ],
                                    extraPlugins: 'justify,font,colorbutton,forms,image2',
                                    removeButtons: 'Scayt,HiddenField,CopyFormatting,About',
                                    allowedContent: true,
                                }}
                            />
                        </Form.Item>
                        <Form.Item label='Danh m???c' name='StaticCategoryId'>
                            {renderStaticCategoryId}
                        </Form.Item>
                        <Form.Item name='lb-avatar' label='???nh ?????i di???n'>
                            <Row gutter={8} justify={'space-between'}>
                                <Col span={8}>
                                    <Upload
                                        listType='picture'
                                        maxCount={1}
                                        fileList={fileList}
                                        // onPreview={handlePreview}
                                        onChange={handleChange}
                                        accept='.jpg,.png,.jpeg'
                                        customRequest={commonFunc.dummyRequest}
                                    >
                                        {fileList.length < 1 ? uploadButton : null}
                                    </Upload>
                                </Col>
                                <Col span={8}>
                                    <Form.Item style={{ marginBottom: 0 }} name='lb-attachment' label='T???p ????nh k??m'>
                                        <Upload listType='picture' maxCount={1} fileList={fileListAttachment} onChange={handleChangeAttachment} customRequest={commonFunc.dummyRequest}>
                                            {fileListAttachment.length < 1 ? <Button icon={<UploadOutlined />}>T???i l??n T???p</Button> : null}
                                        </Upload>
                                    </Form.Item>
                                </Col>
                            </Row>
                        </Form.Item>
                    </Form>
                </Modal>
            )}
        </div>
    );
}

export default StaticContentDetailUpdate;
