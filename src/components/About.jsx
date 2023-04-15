import React from 'react';
import { Link } from "react-router-dom";


const About = () => {
    return (
        <div>
            <section id="about" className="pb-5">
                <div className="container my-5 py-5">
                    <div className="row">
                        <div className="col-md-6">
                            <img src="/assets/about1.jpg" alt="About" className="w-75 mt-5" />
                        </div>
                        <div className="col-md-6">
                            <h3 className="fs-5 mb-0">About Us</h3>
                            <h1 className="display-6 mb-2">Who <b>We</b> Are</h1>
                            <hr className="w-50"/>
                            <p className="lead mb-4">At Builld Lab, we are passionate about helping businesses of all sizes streamline their software development and deployment processes through the power of DevOps. With years of experience and expertise in this rapidly evolving field, our team of skilled professionals is committed to delivering innovative solutions and exceptional customer service to help our clients stay ahead of the competition.

Our DevOps approach combines the best practices from software development and IT operations to create a seamless, automated workflow that maximizes efficiency, reliability, and scalability. We understand that every business has unique needs and challenges, which is why we take a tailored approach to each project to ensure we deliver the best possible results.</p>
                            
                            <Link to="/login" className="btn btn-link">
                            <button className="btn btn-primary rounded-pill px-4 py-2">Get Started</button>
                  
                </Link>
                            <button className="btn btn-outline-primary rounded-pill px-4 py-2 ms-2">Contact Us</button>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}

export default About;
