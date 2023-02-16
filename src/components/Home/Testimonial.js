import "./Home.css";
import "swiper/css";
import 'swiper/css/autoplay';
import "swiper/css/pagination";
import React from "react";
import { Image } from 'react-bootstrap';
import { Autoplay, Pagination } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import Avatar1 from '../../assets/images/Avatar1.png';
import Avatar2 from '../../assets/images/Avatar2.png';
import Avatar3 from '../../assets/images/Avatar3.jfif';
import Avatar4 from '../../assets/images/Avatar4.jfif';
import { BsTwitter, BsLinkedin } from 'react-icons/bs';

const Testimonial = () => {

    return (
        <div className="col-11 col-md-9 mx-auto">
            <h1 className="primaryLightBlue">Testimonials</h1>
            <Swiper slidesPerView={1} spaceBetween={30}  className="mySwiper">
            {/* pagination={{clickable: true}} autoplay={{dalay:2000, disableOnInteraction:false}} modules={[Pagination,Autoplay]} */}
                <SwiperSlide>
                    <div className="col-11 mx-auto my-4 bg-light rounded text-dark d-flex flex-column flex-md-row">
                        <div className="col-12 col-md-4 testBg d-flex pt-2 rounded flex-column">
                            <div className="h-75 bg-primary d-flex">
                                <Image src={Avatar1} fluid className="testimonialImage h-auto rounded-circle m-auto"/>
                            </div>
                            <div className="my-1 h-25 bg-danger">
                                <a href="https://www.linkedin.com/in/" target="_blank" rel="noreferrer"><BsLinkedin className="m-2 socialIcon text-dark"/></a>
                                <a href='https://twitter.com/' target="_blank" rel="noreferrer"><BsTwitter className="m-2 socialIcon text-dark"/></a>
                            </div>
                        </div>
                        <div className="col-12 col-md-8 pt-2 my-md-auto px-md-5">
                            <p className="p-0 m-0"><b>Anand Narsappa Pothraj</b></p>
                            <p className="text-secondary p-0 m-0">Full Stack Developer</p>
                            <p className="p-2">
                                "Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                                Lorem Ipsum has been the industry's standard dummy text ever since the 1500s"
                            </p>
                        </div>
                    </div>
                </SwiperSlide>
                <SwiperSlide>
                    <div className="col-11 mx-auto my-4 bg-light rounded text-dark d-flex flex-column flex-md-row">
                        <div className="col-12 col-md-4 testBg d-flex pt-2 rounded flex-column">
                            <Image src={Avatar2} fluid className="testimonialImage h-auto rounded-circle m-auto"/>
                            <div className="my-1">
                                <a href="https://www.linkedin.com/in/" target="_blank" rel="noreferrer"><BsLinkedin className="m-2 socialIcon text-dark"/></a>
                                <a href='https://twitter.com/' target="_blank" rel="noreferrer"><BsTwitter className="m-2 socialIcon text-dark"/></a>
                            </div>
                        </div>
                        <div className="col-12 col-md-8 pt-2 my-md-auto px-md-5">
                            <p className="p-0 m-0"><b>Anand Narsappa Pothraj</b></p>
                            <p className="text-secondary p-0 m-0">Full Stack Developer</p>
                            <p className="p-2">
                                "Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                                Lorem Ipsum has been the industry's standard dummy text ever since the 1500s"
                            </p>
                        </div>
                    </div>
                </SwiperSlide>
                <SwiperSlide>
                    <div className="col-11 mx-auto my-4 bg-light rounded text-dark d-flex flex-column flex-md-row">
                        <div className="col-12 col-md-4 testBg d-flex pt-2 rounded flex-column">
                            <Image src={Avatar3} fluid className="testimonialImage h-auto rounded-circle m-auto"/>
                            <div className="my-1">
                                <a href="https://www.linkedin.com/in/" target="_blank" rel="noreferrer"><BsLinkedin className="m-2 socialIcon text-dark"/></a>
                                <a href='https://twitter.com/' target="_blank" rel="noreferrer"><BsTwitter className="m-2 socialIcon text-dark"/></a>
                            </div>
                        </div>
                        <div className="col-12 col-md-8 pt-2 my-md-auto px-md-5">
                            <p className="p-0 m-0"><b>Anand Narsappa Pothraj</b></p>
                            <p className="text-secondary p-0 m-0">Full Stack Developer</p>
                            <p className="p-2">
                                "Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                                Lorem Ipsum has been the industry's standard dummy text ever since the 1500s"
                            </p>
                        </div>
                    </div>
                </SwiperSlide>
                <SwiperSlide>
                    <div className="col-11 mx-auto my-4 bg-light rounded text-dark d-flex flex-column flex-md-row">
                        <div className="col-12 col-md-4 testBg d-flex pt-2 rounded flex-column">
                            <Image src={Avatar4} fluid className="testimonialImage h-auto rounded-circle m-auto"/>
                            <div className="my-1">
                                <a href="https://www.linkedin.com/in/" target="_blank" rel="noreferrer"><BsLinkedin className="m-2 socialIcon text-dark"/></a>
                                <a href='https://twitter.com/' target="_blank" rel="noreferrer"><BsTwitter className="m-2 socialIcon text-dark"/></a>
                            </div>
                        </div>
                        <div className="col-12 col-md-8 pt-2 my-md-auto px-md-5">
                            <p className="p-0 m-0"><b>Anand Narsappa Pothraj</b></p>
                            <p className="text-secondary p-0 m-0">Full Stack Developer</p>
                            <p className="p-2">
                                "Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                                Lorem Ipsum has been the industry's standard dummy text ever since the 1500s"
                            </p>
                        </div>
                    </div>
                </SwiperSlide>
            </Swiper>
        </div>
    );
};

export default Testimonial;