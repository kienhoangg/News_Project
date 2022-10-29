import documentApi from "apis/documentApi";
import classNames from "classnames/bind";
import { useEffect, useState, useRef } from "react";
import styles from "./DocumentSourcePage.module.scss";
import DocumentSourcePageSearch from "./DocumentSourcePageSearch/DocumentSourcePageSearch";
import DocumentSourceTableData from "./DocumentSourceTableData/DocumentSourceTableData";
import { Divider, Form, Button, Input, Modal, Select } from "antd";
import { Direction, NotificationType } from "common/enum";
import { openNotification } from "helpers/notification";
import { Option } from "antd/lib/mentions";
import { FileAddFilled } from "@ant-design/icons";
import { TypeUpdate } from "common/constant";

const { TextArea } = Input;
const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};
const cx = classNames.bind(styles);

DocumentSourcePage.propTypes = {};

DocumentSourcePage.defaultProps = {};

function DocumentSourcePage(props) {
  const [newsData, setNewsData] = useState({
    data: [],
    total: 0,
  });
  const isFirstCall = useRef(true);
  const [objFilter, setObjFilter] = useState({
    currentPage: 1,
    pageSize: 10,
    direction: Direction.DESC,
    orderBy: "CreatedDate",
    keyword: "",
  });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form] = Form.useForm();

  const MODAL_TYPE = {
    EDIT: 0,
    DETAIL: 1,
  };
  const [document, setDocument] = useState({
    content: null,
    type: null,
  });

  useEffect(() => {
    if (isFirstCall.current) {
      isFirstCall.current = false;
      // return;
    }
    fetchProductList();
  }, [objFilter]);

  const fetchProductList = async () => {
    try {
      const response = await documentApi.getDocumentSourceAll(objFilter);
      setNewsData({
        data: response?.PagedData?.Results ?? [],
        total: response?.PagedData?.RowCount ?? 0,
      });
    } catch (error) {
      openNotification(
        "Lấy cơ quan ban hành thất bại",
        "",
        NotificationType.ERROR
      );
    }
  };

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    form.resetFields();
    setIsModalOpen(false);
    setDocument({
      content: null,
      type: null,
    });
  };

  /**
   * Submit form tạo nguồn tin tức
   * @param {*} values Đối tượng submit form
   */
  const onFinish = (values) => {
    let parentID = null;
    if (values.parentId) {
      parentID = parseInt(values.parentId);
    }
    values = {
      Title: values?.title,
      Order: parseInt(values?.order ?? 0),
      Description: values?.description,
    };
    if (parentID) {
      values.ParentId = parentID;
    }
    if (document?.type === MODAL_TYPE.EDIT) updateCategoryNews(values);
    else insertCategoryNews(values);
    form.resetFields();
  };

  /**
   * Gọi api lấy dữ liệu danh sách nguồi tin tức
   */
  const updateCategoryNews = async (values) => {
    try {
      await documentApi.updateSourceDocument(document?.content?.Id, values);
      handleCancel();
      fetchProductList();
      openNotification("Sửa thành công");
    } catch (error) {
      openNotification("Sửa thất bại", "", NotificationType.ERROR);
    }
  };

  /**
   * Gọi api lấy dữ liệu danh sách nguồi tin tức
   */
  const insertCategoryNews = async (values) => {
    try {
      await documentApi.insertSourceDocument(values);
      handleCancel();
      fetchProductList();
      openNotification("Tạo mới cơ quan ban hành thành công");
    } catch (error) {
      openNotification(
        "Tạo mới cơ quan ban hành thất bại",
        "",
        NotificationType.ERROR
      );
    }
  };

  /**
   * Sử lý thay đổi text search
   * @param {*} textSearch Từ cần tìm
   */
  const handleChangeTextSearch = (textSearch) => {
    setObjFilter({ ...objFilter, keyword: textSearch });
  };

  /**
   * Thay đổi phân trang
   */
  const handleChangePagination = (
    currentPage,
    pageSize,
    orderBy,
    direction
  ) => {
    setObjFilter({ ...objFilter, currentPage, pageSize, orderBy, direction });
  };

  const handleDeleteSourceNew = async (id) => {
    try {
      await documentApi.deleteSourceDocument(id);
      openNotification("Xóa cơ quan ban hành thành công");
      fetchProductList();
    } catch (error) {
      openNotification(
        "Xóa cơ quan ban hành thất bại",
        "",
        NotificationType.ERROR
      );
    }
  };

  const handleUpdateStatusNew = async (values) => {
    try {
      await documentApi.updatStatusSourceDocument({
        Ids: [values.Id],
        Value: values.Status === 0 ? 1 : 0,
        Field: TypeUpdate.STATUS,
      });
      fetchProductList();
      openNotification("Cập nhật thành công");
    } catch (error) {
      openNotification("Cập nhật thất bại", "", NotificationType.ERROR);
    }
  };

  const renderOption = (
    <Select
      placeholder="Chọn cấp cha"
      style={{ width: "100%" }}
      allowClear={true}
    >
      {newsData?.data.map((x) => (
        <Option value={x.Id} key={x.Id}>
          {x.Title}
        </Option>
      ))}
    </Select>
  );

  return (
    <div className={cx("wrapper")}>
      {
        //#region popup thêm mới
      }
      <Modal
        className={cx("modal-category-news")}
        title={
          document?.type === MODAL_TYPE.DETAIL
            ? "Xem chi tiết"
            : document?.type === MODAL_TYPE.EDIT
            ? "Chỉnh sửa"
            : "Thêm mới"
        }
        open={isModalOpen}
        onCancel={handleCancel}
        footer={null}
      >
        <Form {...layout} form={form} name="control-hooks" onFinish={onFinish}>
          <Form.Item
            name="title"
            label="Tiêu đề"
            rules={[{ required: true, message: "Tiêu đề không được để trống" }]}
          >
            {document?.type === MODAL_TYPE.DETAIL ? (
              <div>{document?.content?.Title}</div>
            ) : (
              <Input />
            )}
          </Form.Item>
          <Form.Item name="parentId" label="Danh mục cấp cha">
            {document?.type === MODAL_TYPE.DETAIL ? (
              <div>
                {
                  newsData?.data?.find(
                    (item) => item?.Id === document?.content?.ParentId
                  )?.Title
                }
              </div>
            ) : (
              renderOption
            )}
          </Form.Item>
          <Form.Item name="order" label="Số thứ tự">
            {document?.type === MODAL_TYPE.DETAIL ? (
              <div>{document?.content?.Order}</div>
            ) : (
              <Input type="number" min={0} defaultValue={0} />
            )}
          </Form.Item>
          <Form.Item name="description" label="Mô tả">
            {document?.type === MODAL_TYPE.DETAIL ? (
              <div>{document?.content?.Description}</div>
            ) : (
              <TextArea />
            )}
          </Form.Item>

          <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            {document?.type === MODAL_TYPE.DETAIL ? null : (
              <Button
                type="primary"
                htmlType={
                  document?.type === MODAL_TYPE.EDIT ? "Lưu" : "Tạo mới"
                }
              >
                {document?.type === MODAL_TYPE.EDIT ? "Lưu" : "Tạo mới"}
              </Button>
            )}
          </Form.Item>
        </Form>
      </Modal>
      {
        //#endregion
      }
      <div className={cx("top")}>
        <DocumentSourcePageSearch setTextSearch={handleChangeTextSearch} />
        <div className={cx("btn-add-signer-document")}>
          <Button type="primary" icon={<FileAddFilled />} onClick={showModal}>
            Thêm mới
          </Button>
        </div>
      </div>
      <Divider style={{ margin: "0" }} />
      <div className={cx("table-data")}>
        <DocumentSourceTableData
          data={newsData}
          setPagination={handleChangePagination}
          deleteSourceNew={handleDeleteSourceNew}
          updateStatusNew={handleUpdateStatusNew}
          onEdit={(res) => {
            showModal();
            setDocument({
              content: res,
              type: MODAL_TYPE.EDIT,
            });
            form.setFieldsValue({
              title: res?.Title,
              parentId: res?.ParentId,
              order: res?.Order,
              description: res?.Description,
            });
          }}
          onClickRow={(res) => {
            console.log(res);
            showModal();
            setDocument({
              content: res,
              type: MODAL_TYPE.DETAIL,
            });
          }}
        />
      </div>
    </div>
  );
}

export default DocumentSourcePage;
