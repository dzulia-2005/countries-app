import React, { useState } from 'react';

const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    surname: '',
    email: '',
    message: '',
  });

  const [error,setError] = useState({
    name: '',
    surname: '',
    email: '',
    message: '',
  })

  

  

  const validateinp = (name:string,value:string) => {
    return value.length > 8 ? 'მეტია 8-ზე!!!':""
  }

  const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = event.target; 
    setFormData({ ...formData, [name]: value });
    const errorsMsg = validateinp(name,value);
    setError({...error,[name]:errorsMsg})
  };

 

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault(); 
    console.log(formData);  
  };

  return (
    <div className="contact-container">
      <form onSubmit={handleSubmit}>
        <div>
            <div>
                <label htmlFor="name">Name:</label>
            </div>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
          <span>{error.name}</span>
        </div>
        <div>
            <div>
                 <label htmlFor="surname">Surname:</label>
            </div>
          <input
            type="text"
            id="surname"
            name="surname"
            value={formData.surname}
            onChange={handleChange}
            required
          />
           <span>{error.surname}</span>
        </div>
        <div>
          <div>
            <label htmlFor="email">Email:</label>
          </div>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
           <span>{error.email}</span>
        </div>
        <div>
          <div>
             <label htmlFor="message">Message:</label>
          </div>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            required
          ></textarea>
           <span>{error.message}</span>
        </div>
        <button type="submit">Send</button>
      </form>
    </div>
  );
};

export default Contact;
