import { FaLinkedin } from "react-icons/fa";
import { FaGithub } from "react-icons/fa";

export const Footer = ()=>{
    return(
        <footer
        className="text-center text-lg-start text-dark"
        style={{ backgroundColor: "#ECEFF1" }}
      >
        {/* Section: Social media */}
        <section
          className="d-flex justify-content-between p-4 text-white"
          style={{ backgroundColor: "#21D192" }}
        >
          {/* Left */}
          <div className="me-5 text-dark fw-semibold">
            <span>Get connected with me on social networks</span>
          </div>
          {/* Left */}
      
          {/* Right */}
          <div>
            <a href="https://www.linkedin.com/in/batuhannozkann/" className="text-dark me-4">
              <i className="fab fa-linkedin"></i>
            </a>
            <a href="https://github.com/batuhannozkann" className="text-dark me-4">
              <i className="fab fa-github"></i>
            </a>
          </div>
          {/* Right */}
        </section>
      </footer>
      
        )
}