import React, { useEffect, useRef, useState } from "react";
import Caroucel from "./Caroucel";
import "./albumImageDetailPage.scss";
import IconArrowRight from "../../../assets/icons/arrow-point-to-right.png";
import IconAlbum from "../../../assets/icons/album-background.png";
import { Pagination } from "antd";
import ScrollToTop from "components/ScrollToTop/ScrollToTop";
import axiosClient from "apis/axiosClient";
import { useLocation } from "react-router-dom";

export default function AlbumImageDetailPage() {
  const isFirstRender = useRef(true);

  const [dataUrlImage, setDataUrlImage] = useState([]);
  const [indexImageCaroucel, setIndexImageCaroucel] = useState(0);
  const [paging, setPaging] = useState(1);

  const [totalInDB, setTotalInDB] = useState(0); // Tổng bản ghi trên DB
  const [listAlbum, setListAlbum] = useState([]); // Danh sách album

  const PAGE_SIZE = 4;

  /**
   * Gọi API mỗi khi thay đổi paging
   * @author TDBA (16/10/2022)
   */
  useEffect(() => {
    callApiGetListAlbum();
  }, [paging]);

  /**
   * Gọi API lấy chi danh sách album
   * @author TDBA (16/10/2022)
   */
  const callApiGetListAlbum = async () => {
    try {
      const res = await axiosClient.post("/photocategories/filter", {
        pageSize: PAGE_SIZE,
        currentPage: paging,
        direction: -1,
        orderBy: "CreatedDate",
      });

      if (isFirstRender.current) {
        getDetailAlbum(
          new URLSearchParams(window.location.search).get("albumid") ||
            res?.PagedData?.Results?.[0]?.Id
        );
        if (isFirstRender.current) isFirstRender.current = false;
      }

      setListAlbum(res?.PagedData?.Results);
      setTotalInDB(res?.PagedData?.RowCount);
    } catch (error) {}
  };

  /**
   * Gọi API lấy chi tiết hình ảnh
   * @author TDBA (16/10/2022)
   */
  const getDetailAlbum = async (idAlbum) => {
    try {
      const res = await axiosClient.get("/photos/" + idAlbum);

      setDataUrlImage(
        res?.ImagePath?.split(";;")?.map((val) => {
          if (val?.indexOf("https://") === 0 || val?.indexOf("http://") === 0)
            return val;
          else return window.location.origin + val;
        })
      );
      setIndexImageCaroucel(0);
    } catch (err) {}
  };

  /**
   * Thực hiện khi click next trái
   * @author TDBA (15/10/2022)
   */
  const handleNextLeftCaroucel = () => {
    if (indexImageCaroucel > 0) {
      setIndexImageCaroucel(indexImageCaroucel - 1);
    } else {
      setIndexImageCaroucel(dataUrlImage?.length - 1);
    }
  };

  /**
   * Thực hiện khi click next trái
   * @author TDBA (15/10/2022)
   */
  const handleNextRightCaroucel = () => {
    if (indexImageCaroucel < dataUrlImage?.length - 1) {
      setIndexImageCaroucel(indexImageCaroucel + 1);
    } else {
      setIndexImageCaroucel(0);
    }
  };

  return (
    <div className="album-image-detail-page">
      <ScrollToTop />
      <div className="album-image-detail-page__top">
        <div className="album-image-detail-page__top__wrap-caroucel">
          <Caroucel data={dataUrlImage} indexItem={indexImageCaroucel} />
          <div className="album-image-detail-page__top__wrap-caroucel__mini">
            <Caroucel
              data={dataUrlImage}
              indexItem={indexImageCaroucel}
              marginLeftItem={5}
            />
          </div>
          <div
            className="album-image-detail-page__top__wrap-caroucel__button-next-left"
            onClick={handleNextLeftCaroucel}
          >
            <img src={IconArrowRight} />
          </div>
          <div
            className="album-image-detail-page__top__wrap-caroucel__button-next-right"
            onClick={handleNextRightCaroucel}
          >
            <img src={IconArrowRight} />
          </div>
        </div>
      </div>
      <div className="album-image-detail-page__bottom">
        <div className="album-image-detail-page__bottom__title">
          <div></div>
          <b>Danh sách Album</b>
        </div>
        <div className="album-image-detail-page__bottom__list-album">
          {listAlbum?.map((item) => (
            <div
              className="album-image-detail-page__bottom__list-album__item"
              onClick={() => getDetailAlbum(item?.Id)}
            >
              <div>
                <img
                  src={
                    item?.Avatar
                      ? item?.Avatar?.indexOf("https://") === 0 ||
                        item?.Avatar?.indexOf("http://") === 0
                        ? item?.Avatar
                        : window.location.origin + item?.Avatar
                      : "/"
                  }
                />
              </div>
            </div>
          ))}
        </div>
        <div className="album-image-detail-page__bottom__pagination">
          <Pagination
            defaultCurrent={1}
            current={paging}
            onChange={(page) => setPaging(page)}
            total={totalInDB}
            pageSize={PAGE_SIZE}
            showSizeChanger={false}
          />
        </div>
      </div>
    </div>
  );
}
