import React, { useEffect, useState } from "react";
import Rating from "react-rating"
import { FaStar } from "react-icons/fa"
import { Autoplay, FreeMode, Pagination, Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";
import "swiper/css/autoplay";
import "swiper/css/navigation";
import { apiConnector } from "../../../services/apiConnector";
import { ratingsEndpoints } from "../../../services/apis";


function ReviewSlider() {
  const [reviews, setReviews] = useState([]);
  const truncateWords = 13;
  const [slidesPerView, setSlidesPerView] = useState(3);
  
  const updateSlidesPerView = () => {
    if (window.innerWidth < 750) {
      setSlidesPerView(1);
    } else if (window.innerWidth < 1100) {
      setSlidesPerView(2);
    } else {
      setSlidesPerView(3);
    }
  };


  useEffect(() => {
    updateSlidesPerView();
    window.addEventListener('resize', updateSlidesPerView);
    return () => {
      window.removeEventListener('resize', updateSlidesPerView);
};})


  useEffect(() => {
    const fetchAllReviews = async() =>{
        const {data} = await apiConnector("GET",ratingsEndpoints.REVIEWS_DETAILS_API)
        //console.log(data)
        if(data?.success){
            setReviews(data?.allReviews)
        }
    }
    fetchAllReviews();
  }, []);
  //console.log(reviews)
  return (
    <div className="text-lg">
      <div className="my-[50px] border-2 border-white p-4 h-fitContent max-w-full sm:max-w-maxContentTab lg:max-w-maxContent">
        <Swiper
          slidesPerView={slidesPerView}
          spaceBetween={20}
          loop={true}
          freeMode={true}
          autoplay={{
            delay: 2500,
            disableOnInteraction: false,
          }}
          modules={[FreeMode, Pagination, Autoplay, Navigation]}
          navigation={true}
          className="w-full h-fitContent flex flex-col"
        >
          {reviews.map((review, i) => {
            return (
              <SwiperSlide key={i}>
                <div className="flex flex-col bg-richblack-800 rounded-xl p-3 text-[14px] text-richblack-25 h-[250px] w-full max-w-[350px] mx-auto">
                  <div className="flex items-center gap-2 text-2xl">
                    <img
                      src={
                        review?.user?.image
                          ? review?.user?.image
                          : `https://api.dicebear.com/5.x/initials/svg?seed=${review?.user?.firstName} ${review?.user?.lastName}`
                      }
                      alt=""
                      className="h-9 w-9 rounded-full object-cover mx-5 my-2"
                    />
                    <div className="flex flex-col">
                      <h1 className="font-semibold text-richblack-5">{`${review?.user?.firstName} ${review?.user?.lastName}`}</h1>
                      <h2 className="text-[12px] font-medium text-richblack-500">
                        {review?.course?.courseName}
                      </h2>
                    </div>
                  </div>
                  <p className="font-medium text-richblack-5 italic p-2 text-center h-[80px]">
                    {review?.review.split(" ").length > truncateWords
                      ? `"${review?.review
                          .split(" ")
                          .slice(0, truncateWords)
                          .join(" ")} ..."`
                      : `"${review?.review}"`}
                  </p>
                  <div className="mx-auto">
                    <div className="flex items-center gap-2 my-4">
                      <Rating
                        readonly
                        initialRating={review?.rating}
                        emptySymbol={<FaStar className="text-3xl text-richblack-400" />}
                        fullSymbol={<FaStar className="text-3xl text-yellow-400" />}
                      />
                    </div>
                    <h3 className="font-semibold text-yellow-100 text-center">
                      {review.rating.toFixed(1)}
                    </h3>
                  </div>
                </div>
              </SwiperSlide>
            );
          })}
        </Swiper>
      </div>
    </div>
  );
}

export default ReviewSlider;
