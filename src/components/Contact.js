import React, { useState } from 'react';

const Contact = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  return (
    <div className="contact-page" style={{ padding: '2rem' }}>
      <h1>Contact Us</h1>
      <p>You can reach us at: contact@shopifyclone.com</p>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          const newErrors = {};
          if (!formData.name.trim()) newErrors.name = 'Name is required';
          if (!formData.email.trim()) newErrors.email = 'Email is required';
          if (!formData.message.trim()) newErrors.message = 'Message is required';

          setErrors(newErrors);

          if (Object.keys(newErrors).length === 0) {
            console.log('Form submitted:', formData);
            setSubmitted(true);
            setFormData({ name: '', email: '', message: '' });
          }
        }}
        className="contact-form"
      >
        <div>
          <label htmlFor="name">Name</label>
          <input
            id="name"
            name="name"
            type="text"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          />
          {errors.name && <p style={{ color: 'red' }}>{errors.name}</p>}
        </div>

        <div>
          <label htmlFor="email">Email</label>
          <input
            id="email"
            name="email"
            type="email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          />
          {errors.email && <p style={{ color: 'red' }}>{errors.email}</p>}
        </div>

        <div>
          <label htmlFor="message">Message</label>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={(e) => setFormData({ ...formData, message: e.target.value })}
          />
          {errors.message && <p style={{ color: 'red' }}>{errors.message}</p>}
        </div>

        <button type="submit">Submit</button>
        {submitted && <p className="success-msg">Thanks for contacting us!</p>}
      </form>
    </div>
  );
};

export default Contact;