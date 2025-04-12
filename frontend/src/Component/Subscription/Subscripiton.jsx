import React from "react";
import "../../Component/Subscription/Subscription.css";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";

const Subscripiton = () => {
  const [email, setEmail] = React.useState("");

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      if (email === "") {
        toast.error("Please enter a valid email address.");
        return;
      }

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

      if (!emailRegex.test(email)) {
        toast.error("Invalid email format.");
        return;
      }
    const response=  await axios.post("http://localhost:8001/api/create-subscription", {
        email,
      });
      if(response.status===200){
        toast.success("Subscription successful!");
        setEmail("");
      }
    } catch (error) {
      console.log("error message", error.message);
    }
  };

  return (
    <>
      <Toaster />
      <section className="newsletter-section">
        <div className="newsletter-container">
          <h2 className="newsletter-heading">Subscribe to our newsletter</h2>
          <form className="newsletter-form">
            <input
              type="email"
              name="email"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              placeholder="Enter your email"
              className="newsletter-input"
            />
            <button
              type="submit"
              className="newsletter-button"
              onClick={handleSubmit}
            >
              Subscribe
            </button>
          </form>
        </div>
      </section>
    </>
  );
};

export default Subscripiton;
