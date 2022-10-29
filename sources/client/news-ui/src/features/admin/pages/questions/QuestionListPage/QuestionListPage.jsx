import { UploadOutlined } from "@ant-design/icons";
import {
  Button,
  Checkbox,
  Col,
  DatePicker,
  Divider,
  Form,
  Input,
  Modal,
  Row,
  Select,
  Upload,
} from "antd";
import { Option } from "antd/lib/mentions";
import axiosClient from "apis/axiosClient";
import questionApi from "apis/questionApi";
import { CKEditor } from "ckeditor4-react";
import classNames from "classnames/bind";
import commonFunc from "common/commonFunc";
import { TypeUpdate } from "common/constant";
import { Direction, NotificationType } from "common/enum";
import convertHelper from "helpers/convertHelper";
import datetimeHelper from "helpers/datetimeHelper";
import imageHelper from "helpers/imageHelper";
import { openNotification } from "helpers/notification";
import moment from "moment";
import { useEffect, useState } from "react";
import styles from "./QuestionListPage.module.scss";
import QuestionListPageSearch from "./QuestionListPageSearch/QuestionListPageSearch";
import QuestionListTableData from "./QuestionListTableData/QuestionListTableData";

const cx = classNames.bind(styles);

QuestionListPage.propTypes = {};

QuestionListPage.defaultProps = {};

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};

function QuestionListPage(props) {
  const [form] = Form.useForm();

  const QuestionStatus = [
    {
      id: 0,
      label: "Câu hỏi mới",
    },
    {
      id: 1,
      label: "Chờ câu trả lời",
    },
    {
      id: 2,
      label: "Chờ được phê duyệt",
    },
    {
      id: 3,
      label: "Câu hỏi được phê duyệt",
    },
  ];
  // const QuestionStatus = {
  //   NEW_QUESTION: 0,
  //   WAITING_ANSWER_QUESTION: 1,
  //   WAITING_APPROVED_QUESTION: 2,
  //   APPROVED_QUESTION: 3,
  // };
  const POPUP_TYPE = {
    CREATE: 0,
    UPDATE: 1,
  };
  const MODAL_TYPE = {
    EDIT: 1,
    CREATE: 0,
  };

  const [isModalOpen, setIsModalOpen] = useState({
    imageDetail: null,
    type: null,
    show: false,
  });

  const [newsData, setNewsData] = useState({
    data: [],
    total: 0,
  });
  const [fileListAttachment, setFileListAttachment] = useState([]);
  const [questionDetail, setQuestionDetail] = useState({});
  const [objFilter, setObjFilter] = useState({
    currentPage: 1,
    pageSize: 10,
    direction: Direction.DESC,
    orderBy: "CreatedDate",
    keyword: "",
  });

  const handleChangeAttachment = ({ fileList: newFileList }) => {
    setFileListAttachment(newFileList);
  };

  const callApiGetDetail = async (id) => {
    try {
      const res = await axiosClient.get("/questions/" + id);
      setQuestionDetail(res);
      form.setFieldsValue({
        QuestionCategoryId: res?.QuestionCategoryId,
        Title: res?.Title,
        AskedPersonName: res?.AskedPersonName,
        Department: res?.Department,
        Address: res?.Address,
        Phone: res?.Phone,
        Email: res?.Email,
        QuestionDate: moment(res?.QuestionDate),
        IsNoticed: res?.IsNoticed,
        QuestionContent: res?.QuestionContent,
        QuestionStatus: res?.QuestionStatus,
        AnswerPersonName: res?.AnswerPersonName,
        AnswerContent: res?.AnswerContent,
        AnswerDate: moment(res?.AnswerDate),
      });

      res?.FilePath &&
        setFileListAttachment([
          {
            isFileFormServer: true,
            uid: "1",
            name: imageHelper.getNameFile(res?.FilePath),
            status: "done",
            url: imageHelper.getLinkImageUrl(res?.FilePath),
          },
        ]);
    } catch (err) {}
  };

  useEffect(() => {
    fetchProductList();
  }, [objFilter]);

  const fetchProductList = async () => {
    try {
      const response = await questionApi.getAll(objFilter);
      setNewsData({
        data: response?.PagedData?.Results,
        total: response?.PagedData?.RowCount,
      });
    } catch (error) {
      console.log("Failed to fetch list: ", error);
    }
  };

  /**
   * Sử lý thay đổi text search
   * @param {*} textSearch Từ cần tìm
   */
  const handleChangeTextSearch = (
    textSearch,
    questionStatus,
    categoryQuestion
  ) => {
    setObjFilter({
      ...objFilter,
      keyword: textSearch,
      ...(questionStatus || questionStatus === 0
        ? { questionStatus: questionStatus }
        : {}),
      ...(categoryQuestion || categoryQuestion === 0
        ? { questionCategoryId: categoryQuestion }
        : {}),
    });
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

  const handleUpdateStatusNew = async (values) => {
    try {
      await questionApi.updateStatusQuestion({
        ids: [values.Id],
        value: values.Status === 0,
        field: TypeUpdate.STATUS,
      });
      fetchProductList();
      openNotification("Cập nhật thành công");
    } catch (error) {
      openNotification("Cập nhật thất bại", "", NotificationType.ERROR);
    }
  };

  const handleDeleteCategoryNew = async (id) => {
    try {
      await questionApi.deleteQuestion(id);
      openNotification("Xóa hình ảnh thành công");
      fetchProductList();
    } catch (error) {
      openNotification("Xóa hình ảnh thất bại", "", NotificationType.ERROR);
    }
  };

  const onCancel = () => {
    setIsModalOpen({
      imageDetail: null,
      type: null,
      show: false,
    });
    form.resetFields();
    setFileListAttachment([]);
    setQuestionDetail({});
  };

  useEffect(() => {
    getCategoryQuestion();
  }, []);

  const [dataCategoryQuestion, setDataCategoryQuestion] = useState([]);

  /**
   * Call API lấy danh mục câu hỏi
   */
  const getCategoryQuestion = async () => {
    try {
      const res = await axiosClient.post("/questioncategories/filter", {
        pageSize: 9999,
        currentPage: 1,
        direction: -1,
        orderBy: "CreatedDate",
      });

      setDataCategoryQuestion(res?.PagedData?.Results);
    } catch (err) {}
  };
  const LIMIT_UP_LOAD_FILE = 2_097_152; //2mb
  const onCreate = async (values = {}) => {
    try {
      var formData = new FormData();
      formData.append(
        "JsonString",
        convertHelper.Serialize(values?.JsonString)
      );

      if (values?.FileAttachment) {
        formData.append("FileAttachment", values?.FileAttachment);
      }

      if (isModalOpen?.type === MODAL_TYPE.CREATE) {
        await axiosClient.post("/questions", formData);
        openNotification("Tạo mới thành công");
      } else {
        await axiosClient.put("/questions/" + questionDetail?.Id, formData);
        openNotification("Cập nhật thành công");
      }

      onCancel();

      fetchProductList();
    } catch (error) {
      openNotification("Cập nhật tin tức thất bại", "", NotificationType.ERROR);
    }
  };

  return (
    <div className={cx("wrapper")}>
      {(
        isModalOpen?.type === MODAL_TYPE.CREATE
          ? isModalOpen?.show
          : questionDetail?.Id && isModalOpen?.show
      ) ? (
        <Modal
          open={true}
          title={
            isModalOpen?.type === MODAL_TYPE.CREATE
              ? "Tạo mới câu hỏi"
              : "Chỉnh sửa câu hỏi"
          }
          okText={isModalOpen?.type === MODAL_TYPE.CREATE ? "Tạo mới" : "Lưu"}
          cancelText="Thoát"
          onCancel={onCancel}
          width={"100vw"}
          style={{
            top: 20,
          }}
          centered
          onOk={() => {
            form
              .validateFields()
              .then((values) => {
                values.QuestionContent =
                  values.QuestionContent?.editor?.getData();

                values.AnswerContent = values.AnswerContent?.editor?.getData();

                const {
                  QuestionCategoryId,
                  Title,
                  AskedPersonName,
                  Department,
                  Address,
                  Phone,
                  Email,
                  QuestionDate,
                  IsNoticed,
                  QuestionContent,
                  QuestionStatus,
                  AnswerPersonName,
                  AnswerContent,
                  AnswerDate,
                } = values;
                let bodyData = {
                  QuestionCategoryId: parseInt(QuestionCategoryId),
                  Title: Title,
                  AskedPersonName: AskedPersonName,
                  Department: Department,
                  Address: Address,
                  Phone: Phone,
                  Email: Email,
                  QuestionDate: datetimeHelper.formatDatetimeToDateSerer(
                    QuestionDate?._d ?? null
                  ),
                  IsNoticed: IsNoticed,
                  QuestionContent: QuestionContent,
                  QuestionStatus: QuestionStatus,
                  AnswerPersonName: AnswerPersonName,
                  AnswerContent: AnswerContent,
                  AnswerDate: datetimeHelper.formatDatetimeToDateSerer(
                    AnswerDate?._d ?? null
                  ),
                };

                let body = { JsonString: bodyData };

                if (
                  fileListAttachment.length > 0 &&
                  !fileListAttachment?.[0]?.isFileFormServer
                ) {
                  const file = fileListAttachment[0].originFileObj;
                  if (file.size > LIMIT_UP_LOAD_FILE) {
                    openNotification(
                      "File đính kèm đã lớn hơn 2MB",
                      "",
                      NotificationType.ERROR
                    );
                    return;
                  }
                  body.FileAttachment = file;
                  delete bodyData?.FilePath;
                } else if (
                  fileListAttachment?.[0]?.isFileFormServer &&
                  fileListAttachment.length > 0
                ) {
                  bodyData = {
                    ...bodyData,
                    FilePath: questionDetail?.FilePath,
                  };
                }

                body = { ...body, JsonString: bodyData };

                onCreate(body);
              })
              .catch((info) => {
                console.log("Validate Failed:", info);
              });
          }}
        >
          <Form
            form={form}
            {...layout}
            name="form_in_modal"
            // onFinish={onFinish}
          >
            <Row>
              <div
                style={{
                  marginBottom: 20,
                }}
              >
                <b>Thông tin gửi câu hỏi</b>
              </div>
              <Col>
                <Form.Item label="Danh mục chủ đề" name="QuestionCategoryId">
                  <Select
                    placeholder="Danh mục chủ đề"
                    style={{ width: "100%" }}
                  >
                    {dataCategoryQuestion?.map((x) => (
                      <Option value={x.Id} key={x.Id}>
                        {x.Title}
                      </Option>
                    ))}
                  </Select>
                </Form.Item>
                <Form.Item
                  label="Tiêu đề"
                  name="Title"
                  rules={[
                    {
                      required: true,
                      message: "Tiêu đề không được để trống",
                    },
                  ]}
                >
                  <Input />
                </Form.Item>
                <Form.Item label="Người hỏi" name="AskedPersonName">
                  <Input />
                </Form.Item>
                <Form.Item label="Cơ quan" name="Department">
                  <Input />
                </Form.Item>
                <Form.Item label="Địa chỉ" name="Address">
                  <Input />
                </Form.Item>
                <Form.Item label="Điện thoại" name="Phone">
                  <Input />
                </Form.Item>
                <Form.Item label="Email" name="Email">
                  <Input />
                </Form.Item>
                <Form.Item label="Ngày gửi câu hỏi" name="QuestionDate">
                  <DatePicker
                    placeholder="Ngày gửi câu hỏi"
                    style={{ width: "100%" }}
                  />
                </Form.Item>
                <Form.Item
                  style={{ marginBottom: 0 }}
                  name="IsNoticed"
                  valuePropName="checked"
                  label={"Cẩu hỏi chú ý"}
                >
                  <Checkbox></Checkbox>
                </Form.Item>
                <Form.Item label="Nội dung văn bản" name="QuestionContent">
                  <CKEditor
                    initData={questionDetail?.QuestionContent}
                    // onChange={onEditorChange}
                    config={{
                      language: "vi",
                      toolbarGroups: [
                        {
                          name: "document",
                          groups: ["mode", "document", "doctools"],
                        },
                        { name: "clipboard", groups: ["clipboard", "undo"] },
                        {
                          name: "editing",
                          groups: [
                            "find",
                            "selection",
                            "spellchecker",
                            "editing",
                          ],
                        },
                        { name: "forms", groups: ["forms"] },
                        "/",
                        "/",
                        {
                          name: "basicstyles",
                          groups: ["basicstyles", "cleanup"],
                        },
                        {
                          name: "paragraph",
                          groups: [
                            "list",
                            "indent",
                            "blocks",
                            "align",
                            "bidi",
                            "paragraph",
                          ],
                        },
                        { name: "links", groups: ["links"] },
                        { name: "insert", groups: ["insert"] },
                        "/",
                        { name: "styles", groups: ["styles"] },
                        { name: "colors", groups: ["colors"] },
                        { name: "tools", groups: ["tools"] },
                        { name: "others", groups: ["others"] },
                        { name: "about", groups: ["about"] },
                      ],
                      extraPlugins: "justify,font,colorbutton,forms",
                      removeButtons: "Scayt,HiddenField,CopyFormatting,About",
                    }}
                  />
                </Form.Item>
              </Col>

              <Col>
                <div
                  style={{
                    marginBottom: 20,
                  }}
                >
                  <b>Thông tin trả lời</b>
                </div>
                <Form.Item label="Trạng thái" name="QuestionStatus">
                  <Select placeholder="Trạng thái" style={{ width: "100%" }}>
                    {QuestionStatus?.map((x) => (
                      <Option value={x.id} key={x.id}>
                        {x.label}
                      </Option>
                    ))}
                  </Select>
                </Form.Item>
                <Form.Item label="Người trả lời" name="AnswerPersonName">
                  <Input />
                </Form.Item>
                <Form.Item label="Nội dung trả lời" name="AnswerContent">
                  <CKEditor
                    initData={questionDetail?.AnswerContent}
                    // onChange={onEditorChange}
                    config={{
                      language: "vi",
                      toolbarGroups: [
                        {
                          name: "document",
                          groups: ["mode", "document", "doctools"],
                        },
                        { name: "clipboard", groups: ["clipboard", "undo"] },
                        {
                          name: "editing",
                          groups: [
                            "find",
                            "selection",
                            "spellchecker",
                            "editing",
                          ],
                        },
                        { name: "forms", groups: ["forms"] },
                        "/",
                        "/",
                        {
                          name: "basicstyles",
                          groups: ["basicstyles", "cleanup"],
                        },
                        {
                          name: "paragraph",
                          groups: [
                            "list",
                            "indent",
                            "blocks",
                            "align",
                            "bidi",
                            "paragraph",
                          ],
                        },
                        { name: "links", groups: ["links"] },
                        { name: "insert", groups: ["insert"] },
                        "/",
                        { name: "styles", groups: ["styles"] },
                        { name: "colors", groups: ["colors"] },
                        { name: "tools", groups: ["tools"] },
                        { name: "others", groups: ["others"] },
                        { name: "about", groups: ["about"] },
                      ],
                      extraPlugins: "justify,font,colorbutton,forms",
                      removeButtons: "Scayt,HiddenField,CopyFormatting,About",
                    }}
                  />
                </Form.Item>
                <Form.Item label="Ngày trả lời" name="AnswerDate">
                  <DatePicker
                    placeholder="NNgày trả lời"
                    style={{ width: "100%" }}
                  />
                </Form.Item>
                <Form.Item name="lb-attachment" label="Tệp đính kèm">
                  <Upload
                    listType="picture"
                    maxCount={1}
                    fileList={fileListAttachment}
                    onChange={handleChangeAttachment}
                    customRequest={commonFunc.dummyRequest}
                    style={{
                      left: 20,
                    }}
                  >
                    {fileListAttachment.length < 1 ? (
                      <Button icon={<UploadOutlined />}>Tải lên Tệp</Button>
                    ) : null}
                  </Upload>
                </Form.Item>
              </Col>
            </Row>
            {/* <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Button type="primary" htmlType="Tạo mới">
              {isModalOpen?.type === MODAL_TYPE.CREATE ? "Tạo mới" : "Lưu"}
            </Button>
          </Form.Item> */}
          </Form>
        </Modal>
      ) : null}
      <div className={cx("top")}>
        <QuestionListPageSearch
          setTextSearch={handleChangeTextSearch}
          onCreate={() => {
            setIsModalOpen({
              id: null,
              show: true,
              type: POPUP_TYPE.CREATE,
            });
          }}
          dataCategoryQuestion={dataCategoryQuestion}
        />
      </div>
      <Divider style={{ margin: "0" }} />
      <div className={cx("table-data")}>
        <QuestionListTableData
          data={newsData}
          setPagination={handleChangePagination}
          updateStatusNew={handleUpdateStatusNew}
          deleteCategoryNew={(res) => handleDeleteCategoryNew(res?.Id)}
          onEdit={(Id) => {
            setIsModalOpen({
              id: Id,
              show: true,
              type: POPUP_TYPE.UPDATE,
            });
            callApiGetDetail(Id);
          }}
        />
      </div>
    </div>
  );
}

export default QuestionListPage;
