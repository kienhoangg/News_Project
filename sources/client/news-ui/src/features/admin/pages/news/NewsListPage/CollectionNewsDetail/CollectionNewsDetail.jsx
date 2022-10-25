import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import styles from "./CollectionNewsDetail.module.scss";
import classNames from "classnames/bind";
import { Card, Col, Divider, Form, Modal, Row } from "antd";
import datetimeHelper from "helpers/datetimeHelper";
import imageHelper from "helpers/imageHelper";
import axiosClient from "apis/axiosClient";

const cx = classNames.bind(styles);

CollectionNewsDetail.propTypes = {
  data: PropTypes.object,
};

CollectionNewsDetail.defaultProps = {};

function CollectionNewsDetail(props) {
  const { Id, open, onCancel, confirmLoading } = props;
  const [newsDetail, setNewsDetail] = useState();

  useEffect(() => {
    getDetailNewsPost(Id);
  }, [Id]);

  const getDetailNewsPost = async (id) => {
    try {
      const res = await axiosClient.get("/newspost/" + id);
      setNewsDetail(res);
    } catch (err) {}
  };

  return (
    <Modal
      confirmLoading={confirmLoading}
      open={open}
      title="Hiển thị thông tin"
      okButtonProps={{
        style: {
          display: "none",
        },
      }}
      cancelText="Thoát"
      onCancel={onCancel}
      width={1300}
      centered
      onOk={() => {}}
    >
      <Row gutter={8}>
        <Col span={16}>
          <Row gutter={16} className={cx("row-item")}>
            <Col span={4}>
              <div className={cx("row-item-label")}>Tiêu đề</div>
            </Col>
            <Col span={20}>
              <div>{newsDetail?.Title}</div>
            </Col>
          </Row>
          <Row gutter={16} className={cx("row-item")}>
            <Col span={4}>
              <div className={cx("row-item-label")}>Ảnh đại diện</div>
            </Col>
            <Col span={20}>
              <div style={{ width: 150, height: 200 }}>
                {
                  <img
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                    }}
                    src={imageHelper.getLinkImageUrl(newsDetail?.Avatar)}
                  />
                }
              </div>
            </Col>
          </Row>
          <Row gutter={16} className={cx("row-item")}>
            <Col span={4}>
              <div className={cx("row-item-label")}>Tiêu đề ảnh</div>
            </Col>
            <Col span={20}>
              <div>{newsDetail?.AvatarTitle}</div>
            </Col>
          </Row>
          <Row gutter={16} className={cx("row-item")}>
            <Col span={4}>
              <div className={cx("row-item-label")}>Mô tả</div>
            </Col>
            <Col span={20}>
              <div>{newsDetail?.Description}</div>
            </Col>
          </Row>
          <Row gutter={16} className={cx("row-item")}>
            <Col span={4}>
              <div className={cx("row-item-label")}>Nội dung</div>
            </Col>
            <Col span={20}>
              <div
                dangerouslySetInnerHTML={{ __html: newsDetail?.Content }}
              ></div>
            </Col>
          </Row>

          <Row gutter={16} className={cx("row-item")}>
            <Col span={4}>
              <div className={cx("row-item-label")}>Danh mục</div>
            </Col>
            <Col span={20}>
              <div>{newsDetail?.CategoryNews?.CategoryNewsName}</div>
            </Col>
          </Row>

          <Row gutter={16} className={cx("row-item")}>
            <Col span={4}>
              <div className={cx("row-item-label")}>Lĩnh vực</div>
            </Col>
            <Col span={20}>
              <div>{newsDetail?.FieldNews?.Title}</div>
            </Col>
          </Row>

          <Row gutter={16} className={cx("row-item")}>
            <Col span={4}>
              <div className={cx("row-item-label")}>Nguồn tin</div>
            </Col>
            <Col span={20}>
              <div>{newsDetail?.SourceNews?.Title}</div>
            </Col>
          </Row>

          <Row gutter={16} className={cx("row-item")}>
            <Col span={4}>
              <div className={cx("row-item-label")}>Tin nổi bật</div>
            </Col>
            <Col span={20}>
              <div>{newsDetail?.IsHotNews ? "Có" : "Không"}</div>
            </Col>
          </Row>

          <Row gutter={16} className={cx("row-item")}>
            <Col span={4}>
              <div className={cx("row-item-label")}>Tin video</div>
            </Col>
            <Col span={20}>
              <div>{newsDetail?.IsVideoNews ? "Có" : "Không"}</div>
            </Col>
          </Row>

          <Row gutter={16} className={cx("row-item")}>
            <Col span={4}>
              <div className={cx("row-item-label")}>Hiển thị tiêu đề</div>
            </Col>
            <Col span={20}>
              <div>{newsDetail?.IsShowTitle ? "Có" : "Không"}</div>
            </Col>
          </Row>

          <Row gutter={16} className={cx("row-item")}>
            <Col span={4}>
              <div className={cx("row-item-label")}>Bình luận</div>
            </Col>
            <Col span={20}>
              <div>{newsDetail?.IsShowComment ? "Có" : "Không"}</div>
            </Col>
          </Row>

          <Row gutter={16} className={cx("row-item")}>
            <Col span={4}>
              <div className={cx("row-item-label")}>Ngày xuất bản</div>
            </Col>
            <Col span={20}>
              <div>
                {datetimeHelper.formatDateToDateVN(newsDetail?.PublishedDate)}
              </div>
            </Col>
          </Row>
          <Row gutter={16} className={cx("row-item")}>
            <Col span={4}>
              <div className={cx("row-item-label")}>Tệp đính kèm</div>
            </Col>
            <Col span={20}>
              <a href={imageHelper.getLinkImageUrl(newsDetail?.FilePath)}>
                {imageHelper?.getNameFile(newsDetail?.FilePath)}
              </a>
            </Col>
          </Row>
        </Col>
      </Row>
    </Modal>
  );
}

export default CollectionNewsDetail;
