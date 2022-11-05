import React from "react";
import "./publishedAudioPage.scss";
import IconMP3 from "../../../assets/icons/mp3.png";
import { Pagination } from "antd";

const PublishedAudioPage = () => {
  return (
    <div className="published-audio-page">
      <div className="published-audio-page__top">
        <div className="published-audio-page__top__title">
          <span>Thư viện radio</span>
        </div>
        <div className="published-audio-page__top__wrap-audio">
          <audio controls autoPlay>
            <source
              src="https://localhost:7122/UploadFiles/Images/chuyendoita.mp3"
              type="audio/mpeg"
            />
          </audio>
        </div>
      </div>
      <div className="published-audio-page__mid">
        <div className="published-audio-page__mid__item">
          <div className="published-audio-page__mid__item__wrap-icon">
            <img src={IconMP3} />
          </div>
          <div className="published-audio-page__mid__item__wrap-title">
            <span>Chuyện đôi ta</span>
          </div>
        </div>
        <div className="published-audio-page__mid__item">
          <div className="published-audio-page__mid__item__wrap-icon">
            <img src={IconMP3} />
          </div>
          <div className="published-audio-page__mid__item__wrap-title">
            <span>Chuyện đôi ta</span>
          </div>
        </div>
        <div className="published-audio-page__mid__item">
          <div className="published-audio-page__mid__item__wrap-icon">
            <img src={IconMP3} />
          </div>
          <div className="published-audio-page__mid__item__wrap-title">
            <span>Chuyện đôi ta</span>
          </div>
        </div>
        <div className="published-audio-page__mid__item">
          <div className="published-audio-page__mid__item__wrap-icon">
            <img src={IconMP3} />
          </div>
          <div className="published-audio-page__mid__item__wrap-title">
            <span>Chuyện đôi ta</span>
          </div>
        </div>
      </div>
      <div className="published-audio-page__bottom">
        <Pagination
          total={100}
          showSizeChanger={false}
          defaultPageSize={20}
          current={1}
          onChange={(page) => {}}
        />
      </div>
    </div>
  );
};

export default PublishedAudioPage;
