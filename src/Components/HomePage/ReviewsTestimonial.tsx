import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import TestimonialSlick from "./ReviewTestimonial/TestimonialSlick";
import { FaArrowRight } from "react-icons/fa6";
import React, { useEffect, useState } from "react";
//import axios from "axios";
import apiClient from "../../API";

interface SlickArrowProps {
  onClick: () => void;
}
export interface TestimonialType {
  profile_id: string;
  rating: number;
  review_content: string;
  user_image: string;

  date: string; // or Date if you want to handle it as a Date object
}
const SlickNextArrow: React.FC<SlickArrowProps> = ({ onClick }) => {
  return (
    <div
      className="absolute -right-2 top-[85px] z-1 bg-secondary p-4 rounded-full shadow-lg hover:cursor-pointer"
      onClick={onClick}
    >
      <FaArrowRight className="text-white" />
    </div>
  );
};

const SlickPrevArrow: React.FC<SlickArrowProps> = ({ onClick }) => {
  return <div onClick={onClick} />;
};

const ReviewsTestimonial = () => {
  const settings = {
    infinite: true,
    speed: 5000,
    slidesToShow: 3,
    slidesToScroll: 1,
    initialSlide: 0,
    autoplay: false,
    // autoplaySpeed: 5000,
    cssEase: "linear",
    pauseOnHover: true,
    // rtl: true,
    nextArrow: (
      <SlickNextArrow
        onClick={function (): void {
          throw new Error("Function not implemented.");
        }}
      />
    ),
    prevArrow: (
      <SlickPrevArrow
        onClick={function (): void {
          throw new Error("Function not implemented.");
        }}
      />
    ),

    responsive: [
      {
        breakpoint: 1279,
        settings: {
          slidesToShow: 2.5,
        },
      },
      {
        breakpoint: 1023,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 991,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          arrows: false,
          dots: true,

        },
      },
      {
        breakpoint: 640,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          arrows: false,
          dots: true,
        },
      },
    ],
  };

  const [testMonial, setTestiMonial] = useState<TestimonialType[]>([]);
  const happyStories = async () => {
    const response = await apiClient.post(
      "/auth/Testimonials/"
    );

    setTestiMonial(response.data.data);
    return response.data;
  };
  useEffect(() => {
    happyStories();
  }, []);

  return (
    <div className="overflow-hidden">
      <div className="container py-[70px] max-lg:py-12 max-sm:py-8">
        <div>
          <h2 className="text-main mb-1 tracking-wide font-normal ">
            What customers says
          </h2>
          <h1 className="text-3xl text-vysyamalaBlack font-bold max-lg:text-2xl max-md:text-2xl max-sm:text-xl">Recent Reviews</h1>
        </div>

        <div className="slider-container relative review-slider">
          <Slider {...settings}>
            {testMonial.map((testimonial, index) => (
              <TestimonialSlick
                key={index}
                desc={testimonial.review_content}
                img={testimonial.user_image}
                name={testimonial.profile_id}
                datedOn={testimonial.date}
                rating={testimonial.rating}
              />
            ))}
            {/* <TestimonialSlick
              desc="Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint velit officia consequat duis enim velit mollit exercitation veniam."
              img={TestimonialAvatar}
              name="Kristin Watson"
              datedOn="Jun 27, 2020 · 6 min read"
            />
            <TestimonialSlick
              desc="Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint velit officia consequat duis enim velit mollit exercitation veniam."
              img={TestimonialAvatar}
              name="Kristin Watson"
              datedOn="Jun 27, 2020 · 6 min read"
            /> */}
          </Slider>
        </div>
      </div>
    </div>
  );
};

export default ReviewsTestimonial;

