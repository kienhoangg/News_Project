import React, { useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
import styles from "./operatingDocumentsPage.scss";
import classNames from "classnames/bind";
import { Button, DatePicker, Pagination, Select, Table } from "antd";
import IconPDF from "../../../assets/icons/icon-pdf.png";
import BlogSectionListNews from "features/Home/components/BlogSection/BlogSectionListNews/BlogSectionListNews";

OperatingDocumentsPage.propTypes = {};

OperatingDocumentsPage.defaultProps = {};

/**
 * Component hiển thị và tìm kiếm các văn bản
 * @param {*} props
 * @author TDBA (09/10/2022)
 */
function OperatingDocumentsPage(props) {
  const cx = classNames.bind(styles);

  /**
   * Mãu dữ liệu filter mặc định
   * @author TDBA (09/10/2022)
   */
  const DEFAULT_DATA_FILTER = {
    numberIndex: null, // Số ký hiệu
    title: null, // Tiêu đề
    documentType: null, // Loại văn bản
    fieldOfDocument: null, // Lĩnh vực văn bản
    agencyIssued: null, // Cơ quan ban hành
    signer: null, // Người ký
    fromDate: null, // Từ ngày
    toDate: null, // Đến ngày
  };

  const elListItemRunningRef = useRef(""); // Ref tham chiếu tới phần tử chưa danh sách item
  const scrollTo = useRef(0); // Lưu vị trí scroll
  const setIntervalRef = useRef(null); // Lưu tham chiếu tới setinterval để clear

  const [dataFilter, setDataFilter] = useState(DEFAULT_DATA_FILTER); // State lưu dữ liệu filter

  /**
   * Column của bảng
   * @author TDBA (09/10/2022)
   */
  const COLUMN = [
    {
      title: "Số/Ký hiệu",
      dataIndex: "INDEX_NUMBER",
      key: "INDEX_NUMBER",
      width: "16%",
    },
    {
      title: "Trích yếu",
      dataIndex: "DESCRIBE",
      key: "DESCRIBE",
    },
    {
      title: "Ngày ban hành",
      dataIndex: "RELEASE_DATE",
      key: "RELEASE_DATE",
      width: "16%",
    },
    {
      title: "Tệp",
      dataIndex: "FILE_URL",
      key: "FILE_URL",
      width: "5%",
    },
  ];

  /**
   * Dư liệu fake cho bảng
   * @author TDBA (09/10/2022)
   */
  const dataTable = [
    {
      key: "1",
      INDEX_NUMBER: "Mike",
      DESCRIBE: 32,
      RELEASE_DATE: "10 Downing Street",
      FILE_URL: "abc",
    },
    {
      key: "2",
      INDEX_NUMBER: "Mike",
      DESCRIBE: 32,
      RELEASE_DATE: "10 Downing Street",
      FILE_URL: "abc",
    },
    {
      key: "3",
      INDEX_NUMBER: "Mike",
      DESCRIBE: 32,
      RELEASE_DATE: "10 Downing Street",
      FILE_URL: "abc",
    },
    {
      key: "4",
      INDEX_NUMBER: "Mike",
      DESCRIBE: 32,
      RELEASE_DATE: "10 Downing Street",
      FILE_URL: "abc",
    },
  ];

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

  /**
   * Thực hiện convert lại dữ liệu cho bảng
   * @param {*} dataRaw Dữ liệu thô
   * @author TDBA (09/10/2022)
   */
  const convertDataTable = (dataRaw) => {
    return dataRaw?.map((item) => {
      return {
        ...item,
        FILE_URL: (
          <a href="/">
            <img
              className={cx(
                "operating-documents-page__left__list-document__body__table__icon-pdf"
              )}
              src={IconPDF}
            ></img>
          </a>
        ),
      };
    });
  };

  return (
    <div className={cx("operating-documents-page")}>
      <div className={cx("operating-documents-page__left")}>
        <div className={cx("operating-documents-page__left__search-document")}>
          <div
            className={cx(
              "operating-documents-page__left__search-document__header"
            )}
          >
            <div
              className={cx(
                "operating-documents-page__left__search-document__header__content"
              )}
            >
              <span>{"Văn bản điều hành"}</span>
            </div>
          </div>
          <div
            className={cx(
              "operating-documents-page__left__search-document__body"
            )}
          >
            {/* Input nhập số ký tự */}
            <div
              className={cx(
                "operating-documents-page__left__search-document__body__row"
              )}
            >
              <div
                className={cx(
                  "operating-documents-page__left__search-document__body__row__label"
                )}
              >
                <span>{"Số ký hiệu"}</span>
              </div>

              <div
                className={cx(
                  "operating-documents-page__left__search-document__body__row__input"
                )}
              >
                <input
                  placeholder="Nhập số ký hiệu"
                  onChange={(event) =>
                    setDataFilter({
                      ...dataFilter,
                      numberIndex: event?.target?.value,
                    })
                  }
                />
              </div>
            </div>

            {/* Input nhập tiêu đề */}
            <div
              className={cx(
                "operating-documents-page__left__search-document__body__row"
              )}
            >
              <div
                className={cx(
                  "operating-documents-page__left__search-document__body__row__label"
                )}
              >
                <span>{"Tiêu đề"}</span>
              </div>

              <div
                className={cx(
                  "operating-documents-page__left__search-document__body__row__input"
                )}
              >
                <input
                  placeholder="Nhập từ khoá tìm kiếm"
                  onChange={(event) =>
                    setDataFilter({
                      ...dataFilter,
                      title: event?.target?.value,
                    })
                  }
                />
              </div>
            </div>

            {/* Input nhập  */}
            <div
              className={cx(
                "operating-documents-page__left__search-document__body__row"
              )}
            >
              <div
                className={cx(
                  "operating-documents-page__left__search-document__body__row__select"
                )}
              >
                <div
                  className={cx(
                    "operating-documents-page__left__search-document__body__row__select__label"
                  )}
                >
                  <span>{"Loại văn bản"}</span>
                </div>
                <div
                  className={cx(
                    "operating-documents-page__left__search-document__body__row__select__dropdown"
                  )}
                >
                  <Select placeholder={"--- Chọn loại văn bản ---"} />
                </div>
              </div>
              <div
                className={cx(
                  "operating-documents-page__left__search-document__body__row__select"
                )}
              >
                <div
                  className={cx(
                    "operating-documents-page__left__search-document__body__row__select__label"
                  )}
                >
                  <span>{"Lĩnh vực văn bản"}</span>
                </div>
                <div
                  className={cx(
                    "operating-documents-page__left__search-document__body__row__select__dropdown"
                  )}
                >
                  <Select placeholder={"--- Chọn lĩnh vực văn bản ---"} />
                </div>
              </div>
              <div
                className={cx(
                  "operating-documents-page__left__search-document__body__row__select"
                )}
              >
                <div
                  className={cx(
                    "operating-documents-page__left__search-document__body__row__select__label"
                  )}
                >
                  <span>{"Cơ quan BH"}</span>
                </div>
                <div
                  className={cx(
                    "operating-documents-page__left__search-document__body__row__select__dropdown"
                  )}
                >
                  <Select placeholder={"--- Chọn cơ quan ban hành ---"} />
                </div>
              </div>
              <div
                className={cx(
                  "operating-documents-page__left__search-document__body__row__select"
                )}
              >
                <div
                  className={cx(
                    "operating-documents-page__left__search-document__body__row__select__label"
                  )}
                >
                  <span>{"Người ký"}</span>
                </div>
                <div
                  className={cx(
                    "operating-documents-page__left__search-document__body__row__select__dropdown"
                  )}
                >
                  <Select placeholder={"--- Chọn người ký ---"} />
                </div>
              </div>
              <div
                className={cx(
                  "operating-documents-page__left__search-document__body__row__select"
                )}
              >
                <div
                  className={cx(
                    "operating-documents-page__left__search-document__body__row__select__label"
                  )}
                >
                  <span>{"Từ ngày"}</span>
                </div>
                <div
                  className={cx(
                    "operating-documents-page__left__search-document__body__row__select__dropdown"
                  )}
                >
                  <DatePicker placeholder="Từ ngày" style={{ width: "100%" }} />
                </div>
              </div>
              <div
                className={cx(
                  "operating-documents-page__left__search-document__body__row__select"
                )}
              >
                <div
                  className={cx(
                    "operating-documents-page__left__search-document__body__row__select__label"
                  )}
                >
                  <span>{"Đến ngày"}</span>
                </div>
                <div
                  className={cx(
                    "operating-documents-page__left__search-document__body__row__select__dropdown"
                  )}
                >
                  <DatePicker
                    placeholder="Đến ngày"
                    style={{ width: "100%" }}
                  />
                </div>
              </div>
            </div>
          </div>
          <Button
            type="primary"
            style={{ width: "87px", height: "34px", borderRadius: 3 }}
            onClick={() => {}}
          >
            {"Tìm kiếm"}
          </Button>
        </div>
        <div className={cx("operating-documents-page__left__list-document")}>
          <div
            className={cx(
              "operating-documents-page__left__list-document__header"
            )}
          >
            <div
              className={cx(
                "operating-documents-page__left__list-document__header__content"
              )}
            >
              <span>{"Tìm thấy "}</span>
              <span
                style={{
                  color: "red",
                }}
              >
                12345
              </span>
              <span>{" văn bản."}</span>
            </div>
          </div>
          <div
            className={cx(
              "operating-documents-page__left__list-document__body"
            )}
          >
            <div
              className={cx(
                "operating-documents-page__left__list-document__body__table"
              )}
            >
              <Table
                columns={COLUMN}
                dataSource={convertDataTable(dataTable)}
                pagination={false}
              />
            </div>
            <div
              className={cx(
                "operating-documents-page__left__list-document__body__pagination"
              )}
            >
              <Pagination
                defaultCurrent={1}
                total={500}
                showSizeChanger={false}
              />
            </div>
          </div>
        </div>
      </div>
      <div className={cx("operating-documents-page__right")}>
        <div className={cx("operating-documents-page__right__row")}>
          <a href="/">
            <span>{"Văn bản sao y bản chính"}</span>
          </a>
        </div>
        <div className={cx("operating-documents-page__right__row")}>
          <a href="/">
            <span>{"Văn bản pháp luật"}</span>
          </a>
        </div>
        <div className={cx("operating-documents-page__right__row")}>
          <a href="/">
            <span>{"Văn bản quản lý hành chính"}</span>
          </a>
        </div>
        <div className={cx("operating-documents-page__right__row")}>
          <a href="/">
            <span>{"Văn bản chỉ đạo điều hành"}</span>
          </a>
          <div
            className={cx(
              "operating-documents-page__right__row__list-item-running"
            )}
            ref={elListItemRunningRef}
            onMouseEnter={() => clearInterval(setIntervalRef.current)}
            onMouseLeave={() => setEventAutoScroll()}
          >
            <div
              className={cx(
                "operating-documents-page__right__row__list-item-running__item"
              )}
            >
              <a
                href="/"
                className={cx(
                  "operating-documents-page__right__row__list-item-running__item__href"
                )}
              >
                <span
                  className={cx(
                    "operating-documents-page__right__row__list-item-running__item__href__dot"
                  )}
                ></span>
                <span>
                  Đây là một đoạn văn bản dài vãi đái Đây là một đoạn văn bản
                  dài vãi đái Đây là một đoạn văn bản dài vãi đái Đây là một
                  đoạn văn bản dài vãi đái
                </span>
              </a>
            </div>

            <div
              className={cx(
                "operating-documents-page__right__row__list-item-running__item"
              )}
            >
              <a
                href="/"
                className={cx(
                  "operating-documents-page__right__row__list-item-running__item__href"
                )}
              >
                <span
                  className={cx(
                    "operating-documents-page__right__row__list-item-running__item__href__dot"
                  )}
                ></span>
                <span>
                  Đây là một đoạn văn bản dài vãi đái Đây là một đoạn văn bản
                  dài vãi đái Đây là một đoạn văn bản dài vãi đái Đây là một
                  đoạn văn bản dài vãi đái
                </span>
              </a>
            </div>

            <div
              className={cx(
                "operating-documents-page__right__row__list-item-running__item"
              )}
            >
              <a
                href="/"
                className={cx(
                  "operating-documents-page__right__row__list-item-running__item__href"
                )}
              >
                <span
                  className={cx(
                    "operating-documents-page__right__row__list-item-running__item__href__dot"
                  )}
                ></span>
                <span>
                  Đây là một đoạn văn bản dài vãi đái Đây là một đoạn văn bản
                  dài vãi đái Đây là một đoạn văn bản dài vãi đái Đây là một
                  đoạn văn bản dài vãi đái
                </span>
              </a>
            </div>
            <div
              className={cx(
                "operating-documents-page__right__row__list-item-running__item"
              )}
            >
              <a
                href="/"
                className={cx(
                  "operating-documents-page__right__row__list-item-running__item__href"
                )}
              >
                <span
                  className={cx(
                    "operating-documents-page__right__row__list-item-running__item__href__dot"
                  )}
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

export default OperatingDocumentsPage;
