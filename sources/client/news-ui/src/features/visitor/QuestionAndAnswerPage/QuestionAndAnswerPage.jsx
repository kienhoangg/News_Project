import { Pagination, Select, Table } from "antd";
import React from "react";
import "./questionAndAnswerPage.scss";
import IconDot1 from "../../../assets/icons/icon-dot-1.png";

/**
 * Màn hình hỏi đáp
 * @auhtor TDBA (11/10/2022)
 */
function QuestionAndAnswerPage() {
  /**
   * Column của bảng
   * @author TDBA (09/10/2022)
   */
  const COLUMN = [
    {
      title: "STT",
      dataIndex: "INDEX_NUMBER",
      key: "INDEX_NUMBER",
      width: "5%",
    },
    {
      title: "Câu hỏi",
      dataIndex: "QUESTION",
      key: "QUESTION",
    },
    {
      title: "Người hỏi",
      dataIndex: "QUESTIONER",
      key: "QUESTIONER",
      width: "16%",
    },
    {
      title: "Ngày trả lời",
      dataIndex: "RESPONDENT",
      key: "RESPONDENT",
      width: "20%",
    },
    {
      title: "Đơn vị trả lời",
      dataIndex: "ANSWERING_UNIT",
      key: "ANSWERING_UNIT",
      width: "20%",
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
      QUESTION: 32,
      QUESTIONER: "10 Downing Street",
      RESPONDENT: "abc",
      ANSWERING_UNIT: "abc",
    },
    {
      key: "2",
      INDEX_NUMBER: "Mike",
      QUESTION: 32,
      QUESTIONER: "10 Downing Street",
      RESPONDENT: "abc",
      ANSWERING_UNIT: "abc",
    },
    {
      key: "3",
      INDEX_NUMBER: "Mike",
      QUESTION: 32,
      QUESTIONER: "10 Downing Street",
      RESPONDENT: "abc",
      ANSWERING_UNIT: "abc",
    },
    {
      key: "4",
      INDEX_NUMBER: "Mike",
      QUESTION: 32,
      QUESTIONER: "10 Downing Street",
      RESPONDENT: "abc",
      ANSWERING_UNIT: "abc",
    },
  ];

  /**
   * Thực hiện convert lại dữ liệu cho bảng
   * @param {*} dataRaw Dữ liệu thô
   * @author TDBA (09/10/2022)
   */
  const convertDataTable = (dataRaw) => {
    return dataRaw?.map((item) => {
      return {
        ...item,
      };
    });
  };

  return (
    <div className="question-and-answer-page">
      <div className="question-and-answer-page__left">
        <div className="question-and-answer-page__left__group">
          <div className="question-and-answer-page__left__group__title">
            <b>CÂU HỎI MỚI</b>
          </div>
          <div className="question-and-answer-page__left__group__list">
            <div className="question-and-answer-page__left__group__list__item">
              <div className="question-and-answer-page__left__group__list__item__image">
                <img src={IconDot1} />
              </div>
              <div className="question-and-answer-page__left__group__list__item__content">
                Chào quý cơ quan! Công ty Cổ phần Kosmen chúng tôi đang có kế
                hoạch đầu tư mở cơ sở kinh doanh gồm...
              </div>
            </div>
            <div className="question-and-answer-page__left__group__list__item">
              <div className="question-and-answer-page__left__group__list__item__image">
                <img src={IconDot1} />
              </div>
              <div className="question-and-answer-page__left__group__list__item__content">
                Chào quý cơ quan! Công ty Cổ phần Kosmen chúng tôi đang có kế
                hoạch đầu tư mở cơ sở kinh doanh gồm...
              </div>
            </div>
            <div className="question-and-answer-page__left__group__list__item">
              <div className="question-and-answer-page__left__group__list__item__image">
                <img src={IconDot1} />
              </div>
              <div className="question-and-answer-page__left__group__list__item__content">
                Chào quý cơ quan! Công ty Cổ phần Kosmen chúng tôi đang có kế
                hoạch đầu tư mở cơ sở kinh doanh gồm...
              </div>
            </div>
            <div className="question-and-answer-page__left__group__list__item">
              <div className="question-and-answer-page__left__group__list__item__image">
                <img src={IconDot1} />
              </div>
              <div className="question-and-answer-page__left__group__list__item__content">
                Chào quý cơ quan! Công ty Cổ phần Kosmen chúng tôi đang có kế
                hoạch đầu tư mở cơ sở kinh doanh gồm...
              </div>
            </div>
            <div className="question-and-answer-page__left__group__list__item">
              <div className="question-and-answer-page__left__group__list__item__image">
                <img src={IconDot1} />
              </div>
              <div className="question-and-answer-page__left__group__list__item__content">
                Chào quý cơ quan! Công ty Cổ phần Kosmen chúng tôi đang có kế
                hoạch đầu tư mở cơ sở kinh doanh gồm...
              </div>
            </div>
          </div>
          <div className="question-and-answer-page__left__group__title">
            <b>HỎI ĐÁP XEM NHIỀU</b>
          </div>
          <div className="question-and-answer-page__left__group__list">
            <div className="question-and-answer-page__left__group__list__item">
              <div className="question-and-answer-page__left__group__list__item__image">
                <img src={IconDot1} />
              </div>
              <div className="question-and-answer-page__left__group__list__item__content">
                Chào quý cơ quan! Công ty Cổ phần Kosmen chúng tôi đang có kế
                hoạch đầu tư mở cơ sở kinh doanh gồm...
              </div>
            </div>
            <div className="question-and-answer-page__left__group__list__item">
              <div className="question-and-answer-page__left__group__list__item__image">
                <img src={IconDot1} />
              </div>
              <div className="question-and-answer-page__left__group__list__item__content">
                Chào quý cơ quan! Công ty Cổ phần Kosmen chúng tôi đang có kế
                hoạch đầu tư mở cơ sở kinh doanh gồm...
              </div>
            </div>
            <div className="question-and-answer-page__left__group__list__item">
              <div className="question-and-answer-page__left__group__list__item__image">
                <img src={IconDot1} />
              </div>
              <div className="question-and-answer-page__left__group__list__item__content">
                Chào quý cơ quan! Công ty Cổ phần Kosmen chúng tôi đang có kế
                hoạch đầu tư mở cơ sở kinh doanh gồm...
              </div>
            </div>
            <div className="question-and-answer-page__left__group__list__item">
              <div className="question-and-answer-page__left__group__list__item__image">
                <img src={IconDot1} />
              </div>
              <div className="question-and-answer-page__left__group__list__item__content">
                Chào quý cơ quan! Công ty Cổ phần Kosmen chúng tôi đang có kế
                hoạch đầu tư mở cơ sở kinh doanh gồm...
              </div>
            </div>
            <div className="question-and-answer-page__left__group__list__item">
              <div className="question-and-answer-page__left__group__list__item__image">
                <img src={IconDot1} />
              </div>
              <div className="question-and-answer-page__left__group__list__item__content">
                Chào quý cơ quan! Công ty Cổ phần Kosmen chúng tôi đang có kế
                hoạch đầu tư mở cơ sở kinh doanh gồm...
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="question-and-answer-page__right">
        <div className="question-and-answer-page__right__header">
          <div className="question-and-answer-page__right__header__title">
            <span
              style={{
                color: "red",
              }}
            >
              *&nbsp;
            </span>
            Thông tin cá nhân của bạn sẽ được bảo vệ theo quy định của Thông tư
            <b>&nbsp;số: 25/2010/TT-BTTTT</b>
          </div>

          <div className="question-and-answer-page__right__header__tag">
            <a href="/">Gửi câu hỏi</a>
            <div></div>
          </div>
        </div>
        <div className="question-and-answer-page__right__body">
          <div className="question-and-answer-page__right__body__top">
            <div className="question-and-answer-page__right__body__top__item">
              <div className="question-and-answer-page__right__body__top__item__label">
                <b>Họ và tên </b>
                <span
                  style={{
                    color: "red",
                  }}
                >
                  &nbsp;*
                </span>
              </div>
              <div className="question-and-answer-page__right__body__top__item__input">
                <input />
                <b className="question-and-answer-page__right__body__top__item__input__warning">
                  Vui lòng nhập họ tên người hỏi
                </b>
              </div>
            </div>

            <div className="question-and-answer-page__right__body__top__item">
              <div className="question-and-answer-page__right__body__top__item__label">
                <b>Địa chỉ </b>
              </div>
              <div className="question-and-answer-page__right__body__top__item__input">
                <input />
              </div>
            </div>

            <div className="question-and-answer-page__right__body__top__item">
              <div className="question-and-answer-page__right__body__top__item__label">
                <b>Điện thoại </b>
                <span
                  style={{
                    color: "red",
                  }}
                >
                  &nbsp;*
                </span>
              </div>
              <div className="question-and-answer-page__right__body__top__item__input">
                <input />
                <b className="question-and-answer-page__right__body__top__item__input__warning">
                  Vui lòng nhập số điện thoại
                </b>
              </div>
            </div>

            <div className="question-and-answer-page__right__body__top__item">
              <div className="question-and-answer-page__right__body__top__item__label">
                <b>Email </b>
              </div>
              <div className="question-and-answer-page__right__body__top__item__input">
                <input />
              </div>
            </div>
          </div>
          <div className="question-and-answer-page__right__body__mid">
            <div className="question-and-answer-page__right__body__mid__row">
              <div className="question-and-answer-page__right__body__mid__row__label">
                <b>Lĩnh vực</b>
              </div>
              <div className="question-and-answer-page__right__body__mid__row__input">
                <Select />
              </div>
            </div>
            <div className="question-and-answer-page__right__body__mid__row">
              <div className="question-and-answer-page__right__body__mid__row__label">
                <b>Tiêu đề</b>{" "}
                <span
                  style={{
                    color: "red",
                  }}
                >
                  &nbsp;*
                </span>
              </div>
              <div className="question-and-answer-page__right__body__mid__row__input">
                <input />
                <b className="question-and-answer-page__right__body__mid__row__input__warning">
                  Vui lòng nhập tiêu đề
                </b>
              </div>
            </div>
            <div className="question-and-answer-page__right__body__mid__row">
              <div className="question-and-answer-page__right__body__mid__row__label">
                <b>Nội dung</b>{" "}
                <span
                  style={{
                    color: "red",
                  }}
                >
                  &nbsp;*
                </span>
              </div>
              <div className="question-and-answer-page__right__body__mid__row__input">
                <textarea />
                <b className="question-and-answer-page__right__body__mid__row__input__warning">
                  Vui lòng nhập tiêu đề
                </b>
              </div>
            </div>
            <div className="question-and-answer-page__right__body__mid__row">
              <div className="question-and-answer-page__right__body__mid__row__label">
                <b>Đính kèm</b>
              </div>
              <div className="question-and-answer-page__right__body__mid__row__input">
                <button>Thêm tệp</button>
              </div>
            </div>
          </div>
          <div className="question-and-answer-page__right__body__bottom">
            <button>Gửi câu hỏi</button>
            <button>Nhập lại</button>
          </div>
        </div>
        <div className="question-and-answer-page__right__footer">
          <div className="question-and-answer-page__right__footer__table">
            <Table
              columns={COLUMN}
              dataSource={convertDataTable(dataTable)}
              pagination={false}
            />
          </div>
          <div
            className={"question-and-answer-page__right__footer__pagination"}
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
  );
}

export default QuestionAndAnswerPage;
