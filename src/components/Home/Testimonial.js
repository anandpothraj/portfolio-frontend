import "./Home.css";
import "swiper/css";
import 'swiper/css/autoplay';
import "swiper/css/pagination";
import React from "react";
import { Image } from 'react-bootstrap';
import data from '../../SourceData/data.json';
import { Autoplay, Pagination } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import { BsTwitter, BsLinkedin } from 'react-icons/bs';

const Testimonial = () => {

    return (
        <div className="col-11 col-md-9 mx-auto">
            <h1 className="primaryLightBlue">Testimonials</h1>
            <Swiper slidesPerView={1} spaceBetween={30}  className="mySwiper" pagination={{clickable: true}} autoplay={{dalay:2000, disableOnInteraction:false}} modules={[Pagination,Autoplay]} >
                {
                    data.home.testimonials.map((testimonial, i) => {
                        return (
                            <SwiperSlide  key={i}>
                                <div className="col-11 mx-auto my-4 bg-light rounded text-dark d-flex flex-column flex-md-row">
                                    <div className="col-12 col-md-4 testBg d-flex pt-2 rounded flex-column">
                                        <div className="h-75 d-flex">
                                            <Image src={testimonial.userImage} fluid className="testimonialImage h-auto rounded-circle m-auto"/>
                                        </div>
                                        <div className="my-1 h-25">
                                            <a href={testimonial.userLinkedIn} target="_blank" rel="noreferrer"><BsLinkedin className="m-2 socialIcon text-dark"/></a>
                                            <a href={testimonial.userTwitter} target="_blank" rel="noreferrer"><BsTwitter className="m-2 socialIcon text-dark"/></a>
                                        </div>
                                    </div>
                                    <div className="col-12 col-md-8 pt-2 my-md-auto px-md-5">
                                        <p className="p-0 m-0"><b>{testimonial.userName}</b></p>
                                        <p className="text-secondary p-0 m-0">{testimonial.userDesignation}</p>
                                        <p className="p-2 testimonialText">{testimonial.userReview}</p>
                                    </div>
                                </div>
                            </SwiperSlide>
                        )
                    })
                }
            </Swiper>
        </div>
    );
};

export default Testimonial;