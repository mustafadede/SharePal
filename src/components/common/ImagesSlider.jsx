import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import Images from "../layout/SearchPage/Images";
import { useTranslation } from "react-i18next";

function ImagesSlider({ data, header, dataClassName }) {
  const { t } = useTranslation();
  return (
    <div className="w-full select-none">
      <h1 className="my-4 text-3xl text-slate-200">{header}</h1>
      <div className={`${dataClassName} w-full cursor-grab`}>
        <Swiper
          className={`${dataClassName} w-full`}
          style={{
            height: "100%",
            "--swiper-navigation-color": "#A021B1",
          }}
          modules={[Navigation]}
          navigation
          slidesPerView={3}
          spaceBetween={30}
          breakpoints={{
            320: {
              width: 320,
              spaceBetween: 10,
              slidesPerView: 2,
            },
            500: {
              slidesPerView: 3,
              spaceBetween: 20,
            },
            640: {
              slidesPerView: 3,
              spaceBetween: 30,
            },
            768: {
              width: 768,
              slidesPerView: 4,
              spaceBetween: 40,
            },
            1024: {
              width: 1024,
              slidesPerView: 5,
              spaceBetween: 50,
            },
            1280: {
              width: 1280,
              slidesPerView: 5,
              spaceBetween: 40,
            },
            1536: {
              width: 1536,
              slidesPerView: 6,
              spaceBetween: 30,
            },
            1792: {
              width: 1792,
              slidesPerView: 7,
              spaceBetween: 60,
            },
          }}
        >
          {(data.backdrops?.length > 0 &&
            data.backdrops?.map((image, i) => (
              <SwiperSlide key={i}>
                <Images path={image} />
              </SwiperSlide>
            ))) || <p className="mt-4 text-lg text-slate-600">{t("images.notFound")}</p>}
        </Swiper>
      </div>
    </div>
  );
}

export default ImagesSlider;
