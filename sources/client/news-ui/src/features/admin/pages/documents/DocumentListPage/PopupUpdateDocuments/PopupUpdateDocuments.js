import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { FileAddFilled, PlusOutlined, UploadOutlined } from "@ant-design/icons";
import {
  Button,
  Col,
  DatePicker,
  Divider,
  Form,
  Input,
  Modal,
  Row,
  Select,
  TreeSelect,
  Upload,
} from "antd";
import TextArea from "antd/lib/input/TextArea";
import { Option } from "antd/lib/mentions";
import { TreeNode } from "antd/lib/tree-select";
import documentApi from "apis/documentApi";
import { CKEditor } from "ckeditor4-react";
import classNames from "classnames/bind";
import commonFunc from "common/commonFunc";
import { Direction, NotificationType } from "common/enum";
import convertHelper from "helpers/convertHelper";
import datetimeHelper from "helpers/datetimeHelper";
import { openNotification } from "helpers/notification";
import { TypeUpdate } from "common/constant";
import axiosClient from "apis/axiosClient";
import moment from "moment";
const LIMIT_UP_LOAD_FILE = 2_097_152; //2mb

const PopupUpdateDocuments = (props) => {
  const [form] = Form.useForm();
  const [documentDetail, setDocumentDetail] = useState({});
  const [fileListAttachment, setFileListAttachment] = useState([]);
  const [dataFilter, setDataFilter] = useState({
    categoryAll: [],
    sourceAll: [],
    fieldAll: [],
    singerAll: [],
  });

  const handleChangeAttachment = ({ fileList: newFileList }) => {
    setFileListAttachment(newFileList);
  };

  useLayoutEffect(() => {
    getDataFilter();
  }, []);

  const callApiGetDetailDocument = async (id) => {
    try {
      if (!id) return;

      const res = await axiosClient.get("/documents/" + id);
      setDocumentDetail(res);
      res?.FilePath &&
        setFileListAttachment([
          {
            isFileFormServer: true,
            uid: "1",
            name: res?.FilePath,
            status: "done",
            url:
              res?.FilePath?.indexOf("https://") === 0 ||
              res?.FilePath?.indexOf("http://") === 0
                ? res?.FilePath
                : window.location.origin +
                  (res?.FilePath?.indexOf("/") === 0
                    ? res?.FilePath
                    : "/" + res?.FilePath),
          },
        ]);
      form?.setFieldsValue({
        Code: res?.Code,
        Name: res?.Name,
        DocumentDepartmentId: res?.DocumentDepartmentId,
        DocumentFieldId: res?.DocumentFieldId,
        DocumentSignPersonId: res?.DocumentSignPersonId,
        DocumentTypeId: res?.DocumentTypeId,
        PublishedDate: moment(res?.PublishedDate),
        Content: res?.Content,
      });
    } catch (err) {}
  };

  const getDataFilter = async () => {
    const filterAll = {
      currentPage: 1,
      pageSize: 9_999_999,
      direction: Direction.DESC,
      orderBy: "CreatedDate",
    };

    // loại văn bản
    const responseCategoryAll = documentApi.getDocumentCategoryAll(filterAll);
    //Cơ quan ban hành
    const responseSourceAll = documentApi.getDocumentSourceAll(filterAll);
    //Lĩnh vực
    const responseFieldAll = documentApi.getDocumentFieldAll(filterAll);
    // Người ký
    const responseSingerAll = documentApi.getDocumentSingerAll(filterAll);
    Promise.all([
      responseCategoryAll,
      responseSourceAll,
      responseFieldAll,
      responseSingerAll,
    ]).then((values) => {
      setDataFilter({
        categoryAll: values[0]?.PagedData?.Results ?? [],
        sourceAll: values[1]?.PagedData?.Results ?? [],
        fieldAll: values[2]?.PagedData?.Results ?? [],
        singerAll: values[3]?.PagedData?.Results ?? [],
      });

      callApiGetDetailDocument(props?.Id);
    });
  };

  const renderFieldNews = (
    <Select placeholder="Lĩnh vực" style={{ width: "100%" }} allowClear={true}>
      {dataFilter?.fieldAll?.map((x) => (
        <Option value={x.Id} key={x.Id}>
          {x.Title}
        </Option>
      ))}
    </Select>
  );

  const renderDepartments = (
    <Select
      placeholder="Cơ quan ban hành"
      style={{ width: "100%" }}
      allowClear={true}
    >
      {dataFilter?.sourceAll?.map((x) => (
        <Option value={x.Id} key={x.Id}>
          {x.Title}
        </Option>
      ))}
    </Select>
  );

  const renderSourceNews = (
    <Select
      placeholder="Loại văn bản"
      style={{ width: "100%" }}
      allowClear={true}
    >
      {dataFilter?.categoryAll?.map((x) => (
        <Option value={x.Id} key={x.Id}>
          {x.Title}
        </Option>
      ))}
    </Select>
  );

  const renderSingerNews = (
    <Select placeholder="Người ký" style={{ width: "100%" }} allowClear={true}>
      {dataFilter?.singerAll?.map((x) => (
        <Option value={x.Id} key={x.Id}>
          {x.Title}
        </Option>
      ))}
    </Select>
  );

  function onEditorChange(event) {
    setDocumentDetail({
      ...documentDetail,
      Content: event.editor.getData(),
    });
  }

  const onUpdate = async (values) => {
    try {
      var formData = new FormData();
      formData.append("JsonString", convertHelper.Serialize(values.JsonString));

      if (values.FileAttachment) {
        formData.append("FileAttachment", values.FileAttachment);
      }
      await documentApi.updateDocument(documentDetail?.Id, formData);
      openNotification("Cập nhật tài liệu thành công");
      props?.onSuccess();
    } catch (error) {
      openNotification(
        "Cập nhật tài liệu thất bại",
        "",
        NotificationType.ERROR
      );
    }
  };

  return (
    <div className="popup-update-documents">
      {documentDetail?.Code ? (
        <Modal
          open={true}
          title="Sửa văn bản"
          okText="Cập nhật"
          cancelText="Thoát"
          onCancel={() => {
            props?.onCancel();
          }}
          width={1300}
          centered
          onOk={() => {
            form
              .validateFields()
              .then((values) => {
                const date =
                  values?.PublishedDate?._d ?? "0001-01-01 00:00:00.0000000";
                const publishedDate =
                  datetimeHelper.formatDatetimeToDateSerer(date);
                let {
                  Code,
                  Name,
                  DocumentDepartmentId,
                  DocumentFieldId,
                  DocumentSignPersonId,
                  DocumentTypeId,
                } = values;

                let bodyData = {
                  Code,
                  Name,
                  PublishedDate: publishedDate,
                  Content: documentDetail?.Content,
                };

                if (DocumentDepartmentId) {
                  bodyData.DocumentDepartmentId =
                    parseInt(DocumentDepartmentId);
                }

                if (DocumentFieldId) {
                  bodyData.DocumentFieldId = parseInt(DocumentFieldId);
                }

                if (DocumentSignPersonId) {
                  bodyData.DocumentSignPersonId =
                    parseInt(DocumentSignPersonId);
                }

                if (DocumentTypeId) {
                  bodyData.DocumentTypeId = parseInt(DocumentTypeId);
                }
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
                    let a = 0;
                    return;
                  }
                  body.FileAttachment = file;
                } else if (
                  fileListAttachment?.[0]?.isFileFormServer &&
                  fileListAttachment.length > 0
                ) {
                  bodyData = {
                    ...bodyData,
                    FilePath: documentDetail?.FilePath,
                  };
                }

                body = { ...body, JsonString: bodyData };
                // form.resetFields();
                // setFileListAttachment([]);
                onUpdate(body);
              })
              .catch((info) => {
                // console.log("Validate Failed:", info);
              });
          }}
        >
          <Form
            form={form}
            // size={'small'}
            // layout='vertical'
            name="form_in_modal"
            labelCol={{ span: 2 }}
            // wrapperCol={{ span: 21 }}
            initialValues={{
              modifier: "public",
            }}
          >
            <Form.Item label="Số ký hiệu">
              <Row gutter={8} justify={"space-between"}>
                <Col span={7}>
                  <Form.Item
                    style={{ marginBottom: 0 }}
                    name="Code"
                    rules={[
                      {
                        required: true,
                        message: "Số ký hiệu không được để trống",
                      },
                    ]}
                  >
                    <Input />
                  </Form.Item>
                </Col>
                <Col span={7}>
                  <Form.Item
                    style={{ marginBottom: 0 }}
                    label="Cơ quan ban hành"
                    name="DocumentDepartmentId"
                  >
                    {renderDepartments}
                  </Form.Item>
                </Col>
                <Col span={7}>
                  <Form.Item
                    style={{ marginBottom: 0 }}
                    label="Lĩnh vực"
                    name="DocumentFieldId"
                  >
                    {renderFieldNews}
                  </Form.Item>
                </Col>
              </Row>
            </Form.Item>

            <Form.Item label="Loại văn bản">
              <Row gutter={8} justify={"space-between"}>
                <Col span={7}>
                  <Form.Item style={{ marginBottom: 0 }} name="DocumentTypeId">
                    {renderSourceNews}
                  </Form.Item>
                </Col>
                <Col span={7}>
                  <Form.Item
                    name="PublishedDate"
                    label="Ngày phát hành"
                    style={{ marginBottom: 0 }}
                  >
                    <DatePicker style={{ width: "100%" }} />
                  </Form.Item>
                </Col>
                <Col span={7}>
                  <Form.Item
                    style={{ marginBottom: 0 }}
                    label="Người ký"
                    name="DocumentSignPersonId"
                  >
                    {renderSingerNews}
                  </Form.Item>
                </Col>
              </Row>
            </Form.Item>

            <Form.Item
              name="Name"
              label="Trích yếu"
              style={{ marginBottom: 0 }}
            >
              <TextArea
                showCount
                style={{
                  height: 80,
                }}
              />
            </Form.Item>
            <Form.Item name="Content" label="Nội dung">
              <CKEditor
                initData={documentDetail?.Content}
                onChange={onEditorChange}
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
                      groups: ["find", "selection", "spellchecker", "editing"],
                    },
                    { name: "forms", groups: ["forms"] },
                    "/",
                    "/",
                    { name: "basicstyles", groups: ["basicstyles", "cleanup"] },
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
            <Form.Item name="lb-attachment" label="Tệp đính kèm">
              <Row gutter={8}>
                <Col span={7}>
                  <Upload
                    listType="picture"
                    maxCount={1}
                    fileList={fileListAttachment}
                    onChange={handleChangeAttachment}
                    customRequest={commonFunc.dummyRequest}
                  >
                    {fileListAttachment.length < 1 ? (
                      <Button icon={<UploadOutlined />}>Tải lên Tệp</Button>
                    ) : null}
                  </Upload>
                </Col>
              </Row>
            </Form.Item>
          </Form>
        </Modal>
      ) : null}
    </div>
  );
};

export default PopupUpdateDocuments;
