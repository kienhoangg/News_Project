import React, { useEffect, useRef } from "react";
import PropTypes from "prop-types";
import "./operatingDocumentsDetailPage.scss";
import IconDot from "../../../assets/icons/Icon-dot.png";
import { Link } from "react-router-dom";
import IconPDF from "../../../assets/icons/icon-pdf.png";

OperatingDocumentsDetailPage.propTypes = {};

OperatingDocumentsDetailPage.defaultProps = {};

/**
 * Màn hình hiển thị chi tiết văn bản
 * @param {*} props
 * @author TDBA (09/10/2022)
 */
function OperatingDocumentsDetailPage(props) {
  const elListItemRunningRef = useRef(""); // Ref tham chiếu tới phần tử chưa danh sách item
  const scrollTo = useRef(0); // Lưu vị trí scroll
  const setIntervalRef = useRef(null); // Lưu tham chiếu tới setinterval để clear
  /**
   * Thêm dự kiện tự động scroll
   * @author TDBA (09/10/2022)
   */
  useEffect(() => {
    clearInterval(setIntervalRef.current);
    setEventAutoScroll();
  }, []);

  /**
   * Tạo event tự động scroll
   * @author TDBA (09/10/2022)
   */
  const setEventAutoScroll = () => {
    setIntervalRef.current = setInterval(() => {
      elListItemRunningRef.current?.scrollTo(0, scrollTo.current);
      ++scrollTo.current;
    }, 100);
  };

  return (
    <div className="operating-documents-detail-page">
      <div className="operating-documents-detail-page__left">
        <div className="operating-documents-detail-page__left__header">
          <div
            className={"operating-documents-detail-page__left__header__content"}
          >
            <span>{"Văn bản điều hành"}</span>
          </div>
        </div>

        <div className="operating-documents-detail-page__left__body">
          <div className="operating-documents-detail-page__left__body__table">
            <div className="operating-documents-detail-page__left__body__table__title">
              Ông văn về việc thực hiện Quyết định số 942/QĐ-TTg ngày 05/8/2022
              của Thủ tướng Chính phủ về việc phê duyệt Kế hoạch hành động giảm
              phát thải khí mê-tan đến năm 2030
            </div>
            <table className="operating-documents-detail-page__left__body__table__content">
              <tbody>
                <tr>
                  <td>Số ký hiệu</td>
                  <td>3365/UBND-NLN</td>
                </tr>
                <tr>
                  <td>Nội dung</td>
                  <td></td>
                </tr>
                <tr>
                  <td>Loại văn bản</td>
                  <td>Quyết định</td>
                </tr>
                <tr>
                  <td>Cơ quan ban hành</td>
                  <td>UBND Tỉnh</td>
                </tr>
                <tr>
                  <td>Nội dung</td>
                  <td></td>
                </tr>
                <tr>
                  <td>Lĩnh vực</td>
                  <td></td>
                </tr>
                <tr>
                  <td>Người ký</td>
                  <td>Trần Huy Tuấn</td>
                </tr>
                <tr>
                  <td>Ngày ban hành</td>
                  <td>03/10/2022</td>
                </tr>
                <tr>
                  <td>Tệp đính kèm</td>
                  <td>
                    <a
                      className={
                        "operating-documents-detail-page__left__body__table__content__icon-pdf"
                      }
                      href="/"
                    >
                      <img
                        style={{
                          width: 20,
                          height: 20,
                        }}
                        src={IconPDF}
                      />
                      1735-QD-UBND.signed.pdf
                    </a>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="operating-documents-detail-page__left__body__list-document">
            <div className="operating-documents-detail-page__left__body__list-document__title">
              Các văn bản khác
            </div>
            <div className="operating-documents-detail-page__left__body__list-document__wrap-list">
              <div className="operating-documents-detail-page__left__body__list-document__wrap-list__row">
                <div className="operating-documents-detail-page__left__body__list-document__wrap-list__row__dot">
                  <img src={IconDot} />
                </div>
                <div className="operating-documents-detail-page__left__body__list-document__wrap-list__row__title">
                  <Link to={"/"}>
                    Thông báo Kết luận của đồng chí Nguyễn Thế Phước - Phó Chủ
                    tịch Thường trực Ủy ban nhân dân tỉnh tại buổi làm việc về
                    tiến độ triển khai và xử lý những vướng mắc liên quan của dự
                    án Đường nối Quốc lộ 32 với đường cao tốc Nội Bài - Lào Cai
                    (IC15)
                  </Link>
                </div>
              </div>
              <div className="operating-documents-detail-page__left__body__list-document__wrap-list__row">
                <div className="operating-documents-detail-page__left__body__list-document__wrap-list__row__dot">
                  <img src={IconDot} />
                </div>
                <div className="operating-documents-detail-page__left__body__list-document__wrap-list__row__title">
                  <Link to={"/"}>
                    Thông báo Kết luận của đồng chí Nguyễn Thế Phước - Phó Chủ
                    tịch Thường trực Ủy ban nhân dân tỉnh tại buổi làm việc về
                    tiến độ triển khai và xử lý những vướng mắc liên quan của dự
                    án Đường nối Quốc lộ 32 với đường cao tốc Nội Bài - Lào Cai
                    (IC15)
                  </Link>
                </div>
              </div>
              <div className="operating-documents-detail-page__left__body__list-document__wrap-list__row">
                <div className="operating-documents-detail-page__left__body__list-document__wrap-list__row__dot">
                  <img src={IconDot} />
                </div>
                <div className="operating-documents-detail-page__left__body__list-document__wrap-list__row__title">
                  <Link to={"/"}>
                    Thông báo Kết luận của đồng chí Nguyễn Thế Phước - Phó Chủ
                    tịch Thường trực Ủy ban nhân dân tỉnh tại buổi làm việc về
                    tiến độ triển khai và xử lý những vướng mắc liên quan của dự
                    án Đường nối Quốc lộ 32 với đường cao tốc Nội Bài - Lào Cai
                    (IC15)
                  </Link>
                </div>
              </div>
            </div>
          </div>

          <div className="operating-documents-detail-page__left__body__view-all-document">
            <Link to={"/"}>Xem toàn bộ văn bản tại đây >></Link>
          </div>
        </div>
      </div>
      <div className="operating-documents-detail-page__right">
        <div className={"operating-documents-detail-page__right__row"}>
          <a href="/">
            <span>{"Văn bản sao y bản chính"}</span>
          </a>
        </div>
        <div className={"operating-documents-detail-page__right__row"}>
          <a href="/">
            <span>{"Văn bản pháp luật"}</span>
          </a>
        </div>
        <div className={"operating-documents-detail-page__right__row"}>
          <a href="/">
            <span>{"Văn bản quản lý hành chính"}</span>
          </a>
        </div>
        <div className={"operating-documents-detail-page__right__row"}>
          <a href="/">
            <span>{"Văn bản chỉ đạo điều hành"}</span>
          </a>
          <div
            className={
              "operating-documents-detail-page__right__row__list-item-running"
            }
            ref={elListItemRunningRef}
            onMouseEnter={() => clearInterval(setIntervalRef.current)}
            onMouseLeave={() => setEventAutoScroll()}
          >
            <div
              className={
                "operating-documents-detail-page__right__row__list-item-running__item"
              }
            >
              <a
                href="/"
                className={
                  "operating-documents-detail-page__right__row__list-item-running__item__href"
                }
              >
                <span
                  className={
                    "operating-documents-detail-page__right__row__list-item-running__item__href__dot"
                  }
                ></span>
                <span>
                  Đây là một đoạn văn bản dài vãi đái Đây là một đoạn văn bản
                  dài vãi đái Đây là một đoạn văn bản dài vãi đái Đây là một
                  đoạn văn bản dài vãi đái
                </span>
              </a>
            </div>

            <div
              className={
                "operating-documents-detail-page__right__row__list-item-running__item"
              }
            >
              <a
                href="/"
                className={
                  "operating-documents-detail-page__right__row__list-item-running__item__href"
                }
              >
                <span
                  className={
                    "operating-documents-detail-page__right__row__list-item-running__item__href__dot"
                  }
                ></span>
                <span>
                  Đây là một đoạn văn bản dài vãi đái Đây là một đoạn văn bản
                  dài vãi đái Đây là một đoạn văn bản dài vãi đái Đây là một
                  đoạn văn bản dài vãi đái
                </span>
              </a>
            </div>

            <div
              className={
                "operating-documents-detail-page__right__row__list-item-running__item"
              }
            >
              <a
                href="/"
                className={
                  "operating-documents-detail-page__right__row__list-item-running__item__href"
                }
              >
                <span
                  className={
                    "operating-documents-detail-page__right__row__list-item-running__item__href__dot"
                  }
                ></span>
                <span>
                  Đây là một đoạn văn bản dài vãi đái Đây là một đoạn văn bản
                  dài vãi đái Đây là một đoạn văn bản dài vãi đái Đây là một
                  đoạn văn bản dài vãi đái
                </span>
              </a>
            </div>
            <div
              className={
                "operating-documents-detail-page__right__row__list-item-running__item"
              }
            >
              <a
                href="/"
                className={
                  "operating-documents-detail-page__right__row__list-item-running__item__href"
                }
              >
                <span
                  className={
                    "operating-documents-detail-page__right__row__list-item-running__item__href__dot"
                  }
                ></span>
                <span>
                  Đây là một đoạn văn bản dài vãi đái Đây là một đoạn văn bản
                  dài vãi đái Đây là một đoạn văn bản dài vãi đái Đây là một
                  đoạn văn bản dài vãi đái
                </span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default OperatingDocumentsDetailPage;
