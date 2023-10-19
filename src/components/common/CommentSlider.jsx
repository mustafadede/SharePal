import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import CommentCard from "./CommentCard";
import "swiper/css";
import "swiper/css/navigation";

function CommentSlider({ data }) {
  return (
    <div className="w-full h-full">
      <h3 className="my-4 text-3xl text-slate-200">Comments</h3>
      <Swiper
        slidesPerView={1}
        spaceBetween={10}
        className="w-full"
        style={{
          height: "100%",
          "--swiper-navigation-color": "#A021B1",
        }}
        modules={[Pagination, Navigation]}
        navigation
        pagination={{ dynamicBullets: true }}
      >
        {data ? (
          data.map((comment) => (
            <SwiperSlide>
              <CommentCard text={comment.text} photo={comment.photo} />
            </SwiperSlide>
          ))
        ) : (
          <p className="h-full text-lg text-slate-600">No comment found.</p>
        )}
      </Swiper>
    </div>
  );
}

export default CommentSlider;
