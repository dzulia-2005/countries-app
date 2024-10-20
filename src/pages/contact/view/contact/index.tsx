import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { translations } from '@/translation';

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

  const { lang } = useParams();
  const t = translations[lang as keyof typeof translations];  

      


  const validateinp = (_name:string,value:string) => {
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
                <label htmlFor="name">{t.name}:</label>
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
                 <label htmlFor="surname">{t.surname}:</label>
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
            <label htmlFor="email">{t.mail}:</label>
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
             <label htmlFor="message">{t.message}:</label>
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
        <button type="submit">{t.send}</button>
      </form>
    </div>
  );
};

export default Contact;
