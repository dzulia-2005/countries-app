import React, { ChangeEvent, FormEvent, useState } from 'react';
import { useParams } from 'react-router-dom';
import { translations } from '@/translation';

type CardCreateFormProps = {
    onCardCreate: (cardFields: {
        country: string;
        population: string;
        capital: string;
        image: string;
    }) => void;
};

type FormFields = {
    ge: {
        country: string;
        population: string;
        capital: string;
    };
    en: {
        country: string;
        population: string;
        capital: string;
    };
};

const CardCreateForm: React.FC<CardCreateFormProps> = ({ onCardCreate }) => {
    const { lang } = useParams();
    const t = translations[lang as keyof typeof translations];

    const [formFields, setFormFields] = useState<FormFields>({
        ge: { country: '', population: '', capital: '' },
        en: { country: '', population: '', capital: '' }
    });

    const [image, setImage] = useState<string | null>(null);
    const [imgErr, setImgErr] = useState<string>("");

    const [errors, setErrors] = useState({
        ge: { countryError: '', populationError: '', capitalError: '' },
        en: { countryError: '', populationError: '', capitalError: '' }
    });

    const [activeTab, setActiveTab] = useState<'ge' | 'en'>('ge'); // 'ge' - ქართული, 'en' - ინგლისური

    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const fileType = file.type;

            if (fileType !== "image/jpeg" && fileType !== "image/png") {
                setImgErr("only jpg, png");
                return;
            }

            const reader = new FileReader();
            reader.onloadend = () => {
                setImage(reader.result as string);
                setImgErr("");
            };
            reader.readAsDataURL(file);
        }
    };

    const validateInput = (value: string) => {
        return value.length > 8 ? "მეტია 8-ზე" : '';
    };

    const handleChange = (field: 'country' | 'population' | 'capital') => (e: ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setFormFields(prev => ({
            ...prev,
            [activeTab]: {
                ...prev[activeTab],
                [field]: value
            }
        }));
        setErrors(prev => ({
            ...prev,
            [activeTab]: {
                ...prev[activeTab],
                [`${field}Error`]: validateInput(value)
            }
        }));
    };

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!image) {
            setImgErr("image is required");
            return;
        }

        onCardCreate({
            country: formFields[activeTab].country,
            population: formFields[activeTab].population,
            capital: formFields[activeTab].capital,
            image,
        });
    };

    return (
        <div style={{ margin: '4% 8%' }}>
            <div style={{ marginBottom: "10px" }}>
                <button style={{ marginRight: "5px", background: "none", border: "none", cursor: "pointer" }} onClick={() => setActiveTab('ge')}>ქართული</button>
                <button style={{ background: "none", border: "none", cursor: "pointer" }} onClick={() => setActiveTab('en')}>English</button>
            </div>
            <form onSubmit={handleSubmit}>
                <input
                    style={{ display: 'block', textAlign: 'center' }}
                    name='country'
                    value={formFields[activeTab].country}
                    onChange={handleChange('country')}
                    placeholder={activeTab === 'ge' ? 'ქვეყანა' : 'Country'}
                />
                <span style={{ color: 'red' }}>{errors[activeTab].countryError}</span>

                <input
                    style={{ display: 'block', textAlign: 'center' }}
                    name='population'
                    value={formFields[activeTab].population}
                    onChange={handleChange('population')}
                    placeholder={activeTab === 'ge' ? 'მოსახლეობა' : 'Population'}
                />
                <span style={{ color: 'red' }}>{errors[activeTab].populationError}</span>

                <input
                    style={{ display: 'block', textAlign: 'center' }}
                    name='capital'
                    value={formFields[activeTab].capital}
                    onChange={handleChange('capital')}
                    placeholder={activeTab === 'ge' ? 'დედაქალაქი' : 'Capital'}
                />
                <span style={{ color: 'red' }}>{errors[activeTab].capitalError}</span>

                <div>
                    <input type="file" accept='.jpeg, .png, .jpg' onChange={handleFileChange} />
                    <span style={{ color: 'red' }}>{imgErr}</span>
                </div>

                {image && <img src={image} alt="Uploaded" style={{ width: '100px', height: '100px' }} />}

                <button>{t.createcard}</button>
            </form>
        </div>
    );
};

export default CardCreateForm;
