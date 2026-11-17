import { useState } from "react";
import emailjs from "@emailjs/browser";

function Form() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !formData.name ||
      !formData.email ||
      !formData.subject ||
      !formData.message
    ) {
      setStatus("Please fill in all fields.");
      return;
    }

    setLoading(true);
    setStatus("");

    try {
      await emailjs.send(
        "service_8390rxv",
        "YOUR_CS2_TEMPLATE_ID",
        {
          name: formData.name,
          email: formData.email,
          subject: formData.subject,
          message: formData.message,
          time: new Date().toLocaleString(),
        },
        {
          publicKey: "ehbb1bX2nrJtUEzHn",
        }
      );

      setStatus("success");

      setFormData({
        name: "",
        email: "",
        subject: "",
        message: "",
      });
    } catch (error) {
      console.error("EmailJS Error:", error);
      setStatus("error");
    }

    setLoading(false);
  };

  return (
    <div className="form">
      <h2>Send Us Your Question</h2>

      <div className="form-container">
        <form onSubmit={handleSubmit}>
          <label className="form-control">
            <span>Your Name</span>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Your name"
              required
            />
          </label>

          <label className="form-control">
            <span>Your Email</span>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="your@email.com"
              required
            />
          </label>

          <label className="form-control">
            <span>Subject</span>
            <input
              type="text"
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              placeholder="What is your question?"
              required
            />
          </label>

          <label className="form-control">
            <span>Message</span>
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              placeholder="Write your message..."
              rows="6"
              required
            ></textarea>
          </label>

          <button
            type="submit"
            className="button form_btn"
            disabled={loading}
          >
            {loading ? "Sending..." : "Send"}
          </button>

          {status === "success" && (
            <p className="form-success">
              ✓ Message sent successfully!
            </p>
          )}

          {status === "error" && (
            <p className="form-error">
              ✕ Something went wrong. Please try again.
            </p>
          )}

          {status !== "" &&
            status !== "success" &&
            status !== "error" && (
              <p className="form-error">{status}</p>
            )}
        </form>
      </div>
    </div>
  );
}

export default Form;