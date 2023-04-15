import React from "react";
import { FaCodeBranch, FaCloud, FaDocker, FaServer, FaTasks } from "react-icons/fa";

const Services = () => {
  return (
    <div>
      <section id="service">
        <div className="container my-5 py-5">
          <div className="row">
            <div className="col-12">
              <h3 className="fs-5 text-center mb-0">Our Services</h3>
              <h1 className="display-6 text-center mb-4">
                Our <b>Awesome</b> Services
              </h1>
              <hr className="w-25 mx-auto" />
            </div>
          </div>
          <div className="row mt-5">
            <div className="col-md-4">
              <div className="card p-3 ">
                <div className="card-body text-center">
                  <FaCodeBranch className="mb-4 text-primary" size={64} />
                  <h5 className="card-title mb-3 fs-4 fw-bold">Continuous Integration</h5>
                  <p className="card-text lead">
                    We help you implement a continuous integration process that automatically builds, tests, and deploys your code changes.
                  </p>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="card p-3 ">
                <div className="card-body text-center">
                  <FaTasks className="mb-4 text-primary" size={64} />
                  <h5 className="card-title mb-3 fs-4 fw-bold">Continuous Delivery</h5>
                  <p className="card-text lead">
                    We help you automate your software delivery process so you can release new features to your users quickly and reliably.
                  </p>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="card p-3 ">
                <div className="card-body text-center">
                  <i className="fa fa-rocket fa-4x mb-4 text-primary"></i>
                  <h5 className="card-title mb-3 fs-4 fw-bold">Continuous Deployment</h5>
                  <p className="card-text lead">
                    With Continuous Deployment, changes are automatically deployed to production after passing testing
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="row mt-5">
            <div className="col-md-4">
              <div className="card p-3 ">
                <div className="card-body text-center">
                  <FaServer className="mb-4 text-primary" size={64} />
                  <h5 className="card-title mb-3 fs-4 fw-bold">Server Configuration</h5>
                  <p className="card-text lead">
                    We help you configure and manage your servers using infrastructure-as-code and automation tools.
                  </p>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="card p-3 ">
                <div className="card-body text-center">
                  <i className="fa fa-chart-line fa-4x mb-4 text-primary"></i>
                  <h5 className="card-title mb-3 fs-4 fw-bold">Monitoring and Analytics</h5>
                  <p className="card-text lead">
                    Monitor application performance and user behavior to identify areas for improvement and optimize resource usage.
                  </p>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="card p-3 ">
                <div className="card-body text-center">
                  <i className="fa fa-check fa-4x mb-4 text-primary"></i>
                  <h5 className="card-title mb-3 fs-4 fw-bold">Automated Testing</h5>
                  <p className="card-text lead">
                    Our pipeline also includes Automated Testing, ensuring that code is thoroughly tested before deployment.
                  </p>
                </div>
              </div>

            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Services;
