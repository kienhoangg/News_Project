import React, { useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
import "./libVideoListPage.scss";

LibVideoListPage.propTypes = {};

/**
 * Hiển thị danh sách video
 * @param {*} props
 * @author TDBA (16/10/2022)
 */
function LibVideoListPage(props) {
  const elVideoMainRef = useRef();

  const [linkVideoMain, setLinkVideoMain] = useState([
    "https://video.yenbai.gov.vn:8080/Video/portal/thuvienvideo/2018_01_09_day_manh_thu_hut_vao_khu_cn.mp4",
    "https://video.yenbai.gov.vn:8080/Video/portal/thuvienvideo/video gioi thieu khu cong nghiep tieng anh ban chuan.mp4",
  ]); // Link video

  useEffect(() => {
    setTimeout(() => {
      elVideoMainRef.current.src = linkVideoMain[0];
      elVideoMainRef.current?.addEventListener("canplay", () => {
        elVideoMainRef.current.muted = false;
        elVideoMainRef.current.volume = 0.5;
        elVideoMainRef.current.play();
      });
    }, 5000);
  }, []);

  return (
    <div className="lib-video-list-page">
      <div className="lib-video-list-page__top">
        <div className="lib-video-list-page__top__title">
          <span>Thư viện video</span>
        </div>
      </div>
      <div className="lib-video-list-page__bottom">
        <div className="lib-video-list-page__bottom__wrap-video-main">
          <video
            ref={elVideoMainRef}
            width="100%"
            height="100%"
            controls
            muted
          ></video>
        </div>
        <div className="lib-video-list-page__bottom__list-video">
          <div
            onClick={() => {
              elVideoMainRef.current.src = linkVideoMain[1];
            }}
          >
            Đổi video
          </div>
        </div>
      </div>
    </div>
  );
}

export default LibVideoListPage;
