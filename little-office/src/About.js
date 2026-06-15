import React from "react";
import "./about.css";

function About() {
  return (
    <div className="about-container">

      <div className="about-card">

        <h1>About Little Office</h1>

        <p className="intro">
          Little Office is an IT learning and collaboration platform
          designed for students, freshers, and developers to improve
          their skills through real-world tasks and projects.
        </p>

        <div className="section">
          <h2>🎯 Our Mission</h2>

          <p>
            Our mission is to bridge the gap between learning and
            industry experience by providing practical tasks and
            project opportunities.
          </p>
        </div>

        <div className="section">
          <h2>🚀 Features</h2>

          <ul>
            <li>✅ Secure Login & Signup</li>
            <li>✅ Task Submission System</li>
            <li>✅ Points & Ranking System</li>
            <li>✅ Email Notifications</li>
            <li>✅ Developer Community</li>
            <li>✅ Real Client Project Opportunities</li>
          </ul>
        </div>

        <div className="section">
          <h2>🏆 Rewards System</h2>

          <p>
            Every completed task gives you <b>10 Points</b>.
            High-performing developers may receive real client
            projects and internship opportunities.
          </p>
        </div>

        <div className="section">
          <h2>💼 Who Can Join?</h2>

          <ul>
            <li>👨‍🎓 Students</li>
            <li>🚀 Freshers</li>
            <li>💻 Working Professionals</li>
            <li>🌍 Freelancers</li>
          </ul>
        </div>

        <div className="vision">
          <h2>🌟 Vision</h2>

          <p>
            To build a community where talented developers learn,
            grow, and work on real industry projects.
          </p>
        </div>

        <h3 className="quote">
          "Learn. Build. Grow. Work with Real Clients."
        </h3>
        <div className="contact-section">
  <h2>📩 Contact Us</h2>

  <p>
    For any queries, suggestions, or support,
    feel free to contact us at:
  </p>

  <a
    href="mailto:anmolshikhar2323@gmail.com"
    className="email-link"
  >
    anmolshikhar2323@gmail.com
  </a>
</div>

      </div>

    </div>
  );
}

export default About;