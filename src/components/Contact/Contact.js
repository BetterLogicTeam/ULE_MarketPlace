import React, { Component } from "react";
import { db } from "../../firebase";
import { withRouter } from "react-router";
import './Contact_us.css'

const initData = {
  pre_heading: "Contact",
  heading: "Get In Touch",
  content:
    "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Laborum obcaecati dignissimos quae quo ad iste ipsum officiis deleniti asperiores sit.",
};

class Contact extends Component {
  state = {
    initData: {},
    name: "",
    email: "",
    subject: "",
    message: "",
  };
  handleName = (e) => {
    this.setState({ name: e.target.value });
  };
  handleEmail = (e) => {
    this.setState({ email: e.target.value });
  };
  handleSubject = (e) => {
    this.setState({ subject: e.target.value });
  };
  handleMessage = (e) => {
    this.setState({ message: e.target.value });
  };
  handleSubmit = () => {
    db.collection("contact").add({
      name: this.state.name,
      email: this.state.email,
      subject: this.state.subject,
      message: this.state.message,
    });
    alert("Your message has been sent. We will get back to you soon!");
  };
  componentDidMount() {
    this.setState({
      initData: initData,
    });
  }
  render() {
    return (
      <>
        <section class="flat-title-page inner top_bg_activity ">
          <div class="overlay"></div>
          <div class="themesflat-container">
            <div class="row">
              <div class="col-md-12">
                  
                <div className="intro text-center">
                  <h4>Contact Us</h4>
                  <h2 className="mt-3 mb-3"> Get In Touch</h2>

                </div>
               
              </div>
            </div>
          </div>
        </section>
        <section class="tf-contact tf-section">
          <div class="container">
            <div class="row">
              <div class="col-lg-6 col-md-6 col-12">
                <div class="box-feature-contact">
                  <img src="images/blog/thumb-8.png" alt="Image" />
                </div>
              </div>
              <div class="col-lg-6 col-md-6 col-12 text-white">
                <h2 class="tf-title-heading style-2 mg-bt-12">
                  Drop Up A Message
                </h2>
                <h5 class="sub-title style-1">
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit. Laborum obcaecati dignissimos quae quo ad iste ipsum officiis deleniti asperiores sit.
                </h5>
                <div class="form-inner">
                  <form action="contact/contact-process2.php" method="post" id="contactform" novalidate="novalidate" class="form-submit">
                    <input id="name" name="name" tabindex="1" value={this.state.name}
                      onChange={this.handleName} aria-required="true" required="" type="text" placeholder="Your Full Name" />
                    <input id="email" name="email" tabindex="2" value={this.state.email}
                      onChange={this.handleEmail} aria-required="true" required="" type="email" placeholder="Your Email Address" />
                    <div class="row-form style-2" id="subject" value={this.state.subject}
                      onChange={this.handleSubject}>
                      <select>
                        <option value="1">Select subject</option>
                        <option value="2">Select subject</option>
                        <option value="3">Select subject</option>
                      </select>
                      <i class="icon-fl-down"></i>
                    </div>
                    <textarea id="message" name="message" tabindex="3" aria-required="true" required="" value={this.state.message}
                      onChange={this.handleMessage} placeholder="Message"></textarea>
                    <button class="submit" onClick={() => {
                      this.handleSubmit();
                      this.props.history.push("/");
                    }}>Send message</button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </section>



      </>
    );
  }
}

export default withRouter(Contact);
