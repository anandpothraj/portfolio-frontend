import "./Home.css";
import "swiper/css";
import 'swiper/css/autoplay';
import "swiper/css/pagination";
import axios from 'axios';
import React, { useEffect, useState } from "react";
import { Image } from 'react-bootstrap';
import apiConfig from '../../config/api.json';
import { Autoplay, Pagination } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import { BsTwitter, BsLinkedin } from 'react-icons/bs';
import { getServerUrl } from '../../config/env';

const Testimonial = () => {
    const serverUrl = getServerUrl();
    const [ testimonials, setTestimonials ] = useState([]);
    const [ isLoading, setIsLoading ] = useState(true);

    useEffect(() => {
        const fetchTestimonials = async () => {
            try {
                const url = `${serverUrl}${apiConfig.api.testimonials.FETCH_ALL_TESTIMONIALS}`;
                const response = await axios.get(url);
                if (response.status === 200) {
                    const payload = response.data;
                    if (Array.isArray(payload)) {
                        setTestimonials(payload);
                    } else if (payload && Array.isArray(payload.testimonials)) {
                        setTestimonials(payload.testimonials);
                    } else if (payload && typeof payload === 'object') {
                        const maybeList = payload.list || payload.items || payload.data;
                        if (Array.isArray(maybeList)) {
                            setTestimonials(maybeList);
                        } else if (payload.testimonial) {
                            setTestimonials([payload.testimonial]);
                        } else {
                            setTestimonials([]);
                        }
                    } else {
                        setTestimonials([]);
                    }
                } else {
                    setTestimonials([]);
                }
            } catch (e) {
                setTestimonials([]);
            } finally {
                setIsLoading(false);
            }
        };
        fetchTestimonials();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div className="col-11 col-md-9 mx-auto">
            <h1 className="primaryLightBlue">Testimonials</h1>
            {
                isLoading ? (
                    <p className="text-secondary m-3">Loading...</p>
                ) : testimonials.length === 0 ? (
                    <p className="text-secondary m-3">No testimonials found.</p>
                ) : (
                    <Swiper
                        slidesPerView={1}
                        spaceBetween={30}
                        className="mySwiper"
                        pagination={{ clickable: true }}
                        autoplay={{ delay: 2000, disableOnInteraction: false }}
                        modules={[Pagination, Autoplay]}
                    >
                        {
                            testimonials.map((t, i) => {
                                const testimonial = {
                                    userImage: t.userImage || t.image || t.avatar || t.photo || t.user_image,
                                    userLinkedIn: t.userLinkedIn || t.linkedin || t.user_linkedin,
                                    userTwitter: t.userTwitter || t.twitter || t.user_twitter,
                                    userName: t.userName || t.name || t.user_name,
                                    userDesignation: t.userDesignation || t.designation || t.title || t.role,
                                    userReview: t.userReview || t.review || t.feedback || t.comment,
                                };
                                return (
                                    <SwiperSlide key={i}>
                                        <div className="col-11 mx-auto my-4 bg-light rounded text-dark d-flex flex-column flex-md-row">
                                            <div className="col-12 col-md-4 testBg d-flex pt-2 rounded flex-column">
                                                <div className="h-75 d-flex">
                                                    <Image src={testimonial.userImage} fluid className="testimonialImage h-auto rounded-circle m-auto"/>
                                                </div>
                                                <div className="my-1 h-25">
                                                    {testimonial.userLinkedIn && (
                                                        <a href={testimonial.userLinkedIn} target="_blank" rel="noreferrer"><BsLinkedin className="m-2 socialIcon text-dark"/></a>
                                                    )}
                                                    {testimonial.userTwitter && (
                                                        <a href={testimonial.userTwitter} target="_blank" rel="noreferrer"><BsTwitter className="m-2 socialIcon text-dark"/></a>
                                                    )}
                                                </div>
                                            </div>
                                            <div className="col-12 col-md-8 pt-2 my-md-auto px-md-5">
                                                <p className="p-0 m-0"><b>{testimonial.userName}</b></p>
                                                <p className="text-secondary p-0 m-0">{testimonial.userDesignation}</p>
                                                <p className="p-2 testimonialText">{testimonial.userReview}</p>
                                            </div>
                                        </div>
                                    </SwiperSlide>
                                );
                            })
                        }
                    </Swiper>
                )
            }
        </div>
    );
};

export default Testimonial;