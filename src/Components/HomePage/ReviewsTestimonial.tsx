import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import TestimonialSlick from "./ReviewTestimonial/TestimonialSlick";
import { FaArrowRight } from "react-icons/fa6";
import React, { useEffect, useState } from "react";
//import axios from "axios";
import apiClient from "../../API";
import TestimonialAvatar from "../../assets/images/profileimg.jpg"

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
      className="absolute -right-2 top-[45%] z-1 bg-secondary p-4 rounded-full shadow-lg hover:cursor-pointer"
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

  // const [testMonial, setTestiMonial] = useState<TestimonialType[]>([]);
   const [, setTestiMonial] = useState<TestimonialType[]>([]);
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
            {/* {testMonial.map((testimonial, index) => (
              <TestimonialSlick
                key={index}
                desc={testimonial.review_content}
                img={testimonial.user_image}
                name={testimonial.profile_id}
                datedOn={testimonial.date}
                rating={testimonial.rating}
              />
            ))} */}
            <TestimonialSlick
              desc="I am fortunate enough in having connection with Vysyamala when I search for prospective bride for my son . Frequently I have been asked about the status. In crisp their dedication needs no words. Thank you and All the best to the team"
              img={TestimonialAvatar}
              name="Sugavana Srinivasan"
              datedOn="" rating={5} />
            <TestimonialSlick
              desc="After joining Vysyamala my job was made easier, the service was very good and the support team contacted us every month and made sure all the process was smooth. Thanks to the entire team."
              img={TestimonialAvatar}
              name="Indumathi S"
              datedOn="" rating={5} />
            <TestimonialSlick
              desc="Thank you Vysyamala for the service rendered in searching for a bride for my son. Good follow up has been done on a regular basis. Thanks once again."
              img={TestimonialAvatar}
              name="Shankar Pc"
              datedOn="" rating={5} />
            <TestimonialSlick
              desc="My Sincere Thanks to Vysyamala for having provided Good Profiles of Brides. As there are many profiles available in their platform, we could able to select as per our choice. I wish Vysyamala to continue this good work for many more years to the benefit of Vysya Community. Hatsoff to their Efforts."
              img={TestimonialAvatar}
              name="Murali Srinivasan"
              datedOn="" rating={5} />
            <TestimonialSlick
              desc="My pranams and Thanks to Vysyamala for giving us this platform for finding a groom for our daughter,I will always be indebted to you.
              I congratulate you all and God bless you for your divine service
              Jai vasavi"
              img={TestimonialAvatar}
              name="Senthil radha"
              datedOn="" rating={5} />
            <TestimonialSlick
              desc="
              Vysyamala has become SENTIMENTAL website in our community. Earlier days, it use to be Sri Rama Printing Works in Parrys where people use to print the horoscope. Now its Vysyamala. Wish you all the best. Let your service continue for our vysya community. Jai Vasavi!
              "
              img={TestimonialAvatar}
              name="Seshadhri Puvvada"
              datedOn="" rating={5} />
            <TestimonialSlick
              desc="
             I am happy to inform this is a right place to create such a beautiful plateform for newly couples with user friendly and secure our information in good manner. Thanks for help us
              "
              img={TestimonialAvatar}
              name="Ambrash Kanna"
              datedOn="" rating={5} />
            <TestimonialSlick
              desc="
                It was great sharing my daughter's profile here. The website is user-friendly and easy to communicate   with the interested families. All appropriate details of the groom were shown. Overall satisfied with   your work.
              "
              img={TestimonialAvatar}
              name="Balaji H"
              datedOn="" rating={5} />
          </Slider>
        </div>
      </div>
    </div>
  );
};

export default ReviewsTestimonial;

