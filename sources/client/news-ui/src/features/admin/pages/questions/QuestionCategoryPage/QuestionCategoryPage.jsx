import { Button, Divider, Form, Input, Modal, Select } from 'antd';
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
        orderBy: 'CreatedDate',
        keyword: '',
    });

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [form] = Form.useForm();

    const mode = useRef();
    const idEdit = useRef();

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
    const renderOption = (
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
            await updateSounceNews(values);
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

    const updateSounceNews = async (values) => {
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
                <QuestionCategoryTableData data={newsData} setPagination={handleChangePagination} toggleStatus={handleUpdateStatus} />
            </div>

            {/* MODEL */}
            <Modal className={cx('modal-insert-source-news')} title='Thêm mới danh mục' open={isModalOpen} onCancel={handleCancel} footer={null}>
                <Form {...layout} form={form} name='control-hooks' onFinish={onFinish}>
                    <Form.Item name='title' label='Tiêu đề' rules={[{ required: true, message: 'Tiêu đề không được để trống' }]}>
                        <Input />
                    </Form.Item>
                    <Form.Item name='parentId' label='Danh mục cấp cha'>
                        {renderOption}
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
        </div>
    );
}

export default QuestionCategoryPage;
