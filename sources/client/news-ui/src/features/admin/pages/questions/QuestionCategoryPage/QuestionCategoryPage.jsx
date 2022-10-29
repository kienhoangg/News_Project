import { Button, Col, Divider, Form, Input, Modal, Row, Select } from 'antd';
import documentApi from 'apis/documentApi';
import classNames from 'classnames/bind';
import { useEffect, useRef, useState } from 'react';
import styles from './QuestionCategoryPage.module.scss';
import QuestionCategoryPageSearch from './QuestionCategoryPageSearch/QuestionCategoryPageSearch';
import questionApi from 'apis/questionApi';
import QuestionCategoryTableData from './QuestionCategoryTableData/QuestionCategoryTableData';
import { Direction, NotificationType } from 'common/enum';
import stringHelper from 'helpers/stringHelper';
import TextArea from 'antd/lib/input/TextArea';
import { Option } from 'antd/lib/mentions';
import { openNotification } from 'helpers/notification';
import { TypeUpdate } from 'common/constant';
import datetimeHelper from 'helpers/datetimeHelper';

const cx = classNames.bind(styles);

QuestionCategoryPage.propTypes = {};

QuestionCategoryPage.defaultProps = {};

const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
};

const Mode = {
    Create: 1,
    Edit: 0,
};

function QuestionCategoryPage(props) {
    const [newsData, setNewsData] = useState({});
    const [parentData, setParentData] = useState([]);

    const [objFilter, setObjFilter] = useState({
        currentPage: 1,
        pageSize: 10,
        direction: Direction.DESC,
        orderBy: 'LastModifiedDate',
        keyword: '',
    });

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [form] = Form.useForm();

    const mode = useRef();
    const idEdit = useRef();

    const [isShowDetail, setIsShowDetail] = useState(false);
    const detail = useRef({});

    const fetchList = async () => {
        try {
            const response = await questionApi.getCategoryFilter(objFilter);
            setNewsData(response?.PagedData);
        } catch (error) {
            console.log('Failed to fetch list: ', error);
        }
    };

    const fetchProductListAll = async () => {
        try {
            const response = await questionApi.getCategoryFilter({
                currentPage: 1,
                pageSize: 9999,
            });
            setParentData(response?.PagedData?.Results);
        } catch (error) {
            console.log('Failed to fetch list: ', error);
        }
    };

    useEffect(() => {
        fetchList();
    }, [objFilter]);

    function handleChangeSearch(text) {
        let newFilter = { ...objFilter, keyword: text };
        console.log('newFilter', newFilter);
        setObjFilter(newFilter);
    }

    const handleChangePagination = (currentPage, pageSize, orderBy, direction) => {
        setObjFilter({ ...objFilter, currentPage, pageSize, orderBy, direction });
    };

    // MODEL tạo mới
    const renderOptionParentData = (
        <Select placeholder='Chọn cấp cha' style={{ width: '100%' }} allowClear={true} showSearch>
            {Array.isArray(parentData) &&
                parentData.map((x) => (
                    <Option value={x.Id} key={x.Id}>
                        {x.Title}
                    </Option>
                ))}
        </Select>
    );

    const handleCancel = () => {
        form.resetFields();
        setIsModalOpen(false);
    };

    const onFinish = async (values) => {
        setIsModalOpen(false);
        if (mode.current === Mode.Create) {
            await insertCategory(values);
        } else {
            await updateQuestionCategory(values);
        }
        form.resetFields();
        fetchList();
    };

    const insertCategory = async (values) => {
        try {
            await questionApi.insertQuestionCategory(values);
            openNotification('Tạo mới thành công');
        } catch (error) {
            openNotification('Tạo mới thất bại', '', NotificationType.ERROR);
        }
    };

    const updateQuestionCategory = async (values) => {
        try {
            await questionApi.updateQuestionCategory(idEdit.current, values);
            openNotification('Cập nhật thành công');
        } catch (error) {
            openNotification('Cập nhật thất bại', '', NotificationType.ERROR);
        }
    };

    //Update
    const handleUpdateStatus = async (values) => {
        try {
            await questionApi.updateStatusQuestionCategory({
                Ids: [values.Id],
                Value: values.Status === 0 ? 1 : 0,
                Field: TypeUpdate.STATUS,
            });
            fetchList();
            openNotification('Cập nhật thành công');
        } catch (error) {
            openNotification('Cập nhật thất bại', '', NotificationType.ERROR);
        }
    };

    async function handleDelete(values) {
        try {
            await questionApi.deleteStatusQuestionCategory(values?.Id);
            openNotification('Xóa thành công');
            fetchList();
        } catch (error) {
            openNotification('Xóa thất bại', '', NotificationType.ERROR);
        }
    }

    async function handleUpdate(id) {
        const res = await getQuestionCategoryByID(id);
        idEdit.current = id;
        mode.current = Mode.Edit;

        await fetchProductListAll();
        let valuesForm = { title: res?.Title, description: res?.Description, order: res?.Order };
        if (res?.ParentId) {
            valuesForm.parentId = res.ParentId;
        }
        form?.setFieldsValue(valuesForm);
        setIsModalOpen(true);
    }

    async function getQuestionCategoryByID(id) {
        try {
            const res = await questionApi.getQuestionCategoryByID(id);
            return res;
        } catch (err) {
            openNotification('Lấy chi tiết dữ liệu thất bại', '', NotificationType.ERROR);
            return null;
        }
    }

    async function handleShowDetail(Id) {
        const res = await getQuestionCategoryByID(Id);
        detail.current = res;
        setIsShowDetail(true);
    }

    return (
        <div className={cx('wrapper')}>
            <div className={cx('top')}>
                <QuestionCategoryPageSearch
                    setTextSearch={handleChangeSearch}
                    handleOnClickCreate={async () => {
                        mode.current = Mode.Create;
                        await fetchProductListAll();
                        setIsModalOpen(true);
                    }}
                />
            </div>
            <Divider style={{ margin: '0' }} />
            <div className={cx('table-data')}>
                <QuestionCategoryTableData
                    data={newsData}
                    setPagination={handleChangePagination}
                    toggleStatus={handleUpdateStatus}
                    handleDelete={handleDelete}
                    handleUpdate={handleUpdate}
                    showDetail={handleShowDetail}
                />
            </div>

            {/* MODEL */}
            <Modal className={cx('modal-insert-source-news')} title='Thêm mới danh mục' open={isModalOpen} onCancel={handleCancel} footer={null}>
                <Form {...layout} form={form} name='control-hooks' onFinish={onFinish}>
                    <Form.Item name='title' label='Tiêu đề' rules={[{ required: true, message: 'Tiêu đề không được để trống' }]}>
                        <Input />
                    </Form.Item>
                    <Form.Item name='parentId' label='Danh mục cấp cha'>
                        {renderOptionParentData}
                    </Form.Item>
                    <Form.Item name='order' label='Số thứ tự'>
                        <Input type='number' min={0} />
                    </Form.Item>

                    <Form.Item name='description' label='Mô tả'>
                        <TextArea />
                    </Form.Item>

                    <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                        <Button type='primary' htmlType={mode.current === Mode.Edit ? 'Cập nhật' : 'Tạo mới'}>
                            {mode.current === Mode.Edit ? 'Cập nhật' : 'Tạo mới'}
                        </Button>
                    </Form.Item>
                </Form>
            </Modal>

            <Modal
                open={isShowDetail}
                title='Hiển thị thông tin'
                okButtonProps={{
                    style: {
                        display: 'none',
                    },
                }}
                cancelText='Thoát'
                onCancel={() => {
                    setIsShowDetail(false);
                }}
            >
                <Row gutter={8}>
                    <Col span={16}>
                        <Row gutter={16} className={cx('row-item')}>
                            <Col span={8}>
                                <div className={cx('row-item-label')}>Tiêu đề</div>
                            </Col>
                            <Col span={16}>
                                <div>{detail.current?.Title}</div>
                            </Col>
                        </Row>

                        {/* {detail.current?.ParentId && (
                            <Row gutter={16} className={cx('row-item')}>
                                <Col span={8}>
                                    <div className={cx('row-item-label')}>Danh mục cấp cha</div>
                                </Col>
                                <Col span={16}>
                                    <div>{detail.current?.ParentId}</div>
                                </Col>
                            </Row>
                        )} */}

                        <Row gutter={16} className={cx('row-item')}>
                            <Col span={8}>
                                <div className={cx('row-item-label')}>Số thứ tự</div>
                            </Col>
                            <Col span={16}>
                                <div>{detail.current?.Order}</div>
                            </Col>
                        </Row>
                        <Row gutter={16} className={cx('row-item')}>
                            <Col span={8}>
                                <div className={cx('row-item-label')}>Mô tả</div>
                            </Col>
                            <Col span={16}>
                                <div>{detail.current?.Description}</div>
                            </Col>
                        </Row>
                        <Row gutter={16} className={cx('row-item')}>
                            <Col span={8}>
                                <div className={cx('row-item-label')}>Ngày tạo</div>
                            </Col>
                            <Col span={16}>
                                <div>{datetimeHelper.formatDatetimeToDateVN(detail.current?.CreatedDate)}</div>
                            </Col>
                        </Row>
                        <Row gutter={16} className={cx('row-item')}>
                            <Col span={8}>
                                <div className={cx('row-item-label')}>Ngày sửa cuối</div>
                            </Col>
                            <Col span={16}>
                                <div>{datetimeHelper.formatDatetimeToDateVN(detail.current?.LastModifiedDate)}</div>
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </Modal>
        </div>
    );
}

export default QuestionCategoryPage;
