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

const CardCreateForm: React.FC<CardCreateFormProps> = ({ onCardCreate }) => {
    const { lang } = useParams();
    const t = translations[lang as keyof typeof translations];

    const [country, setCountry] = useState<string>("");
    const [population, setPopulation] = useState<string>("");
    const [capital, setCapital] = useState<string>("");
    const [image, setImage] = useState<string | null>(null);
    const [imgErr, setImgErr] = useState<string>("");

    const [countryError, setCountryError] = useState<string>('');
    const [populationError, setPopulationError] = useState<string>('');
    const [capitalError, setCapitalError] = useState<string>('');

    const [activeTab, setActiveTab] = useState<string>('ge'); // 'ge' - ქართული, 'en' - ინგლისური

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

    const handleChangeCountry = (e: ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setCountry(value);
        setCountryError(validateInput(value));
    };

    const handleChangePopulation = (e: ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setPopulation(value);
        setPopulationError(validateInput(value));
    };

    const handleChangeCapital = (e: ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setCapital(value);
        setCapitalError(validateInput(value));
    };

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!image) {
            setImgErr("image is required");
            return;
        }

        onCardCreate({
            country,
            population,
            capital,
            image, 
        });
    };

    return (
        <div style={{ margin: '4% 8%' }}>
            <div style={{marginBottom: "10px"}}>
                <button style={{marginRight:"5px",background: "none", border: "none", cursor:"pointer"}} onClick={() => setActiveTab('ge')}>ქართული</button>
                <button style={{background: "none", border: "none", cursor:"pointer"}} onClick={() => setActiveTab('en')}>English</button>
            </div>
            <form onSubmit={handleSubmit}>
                <input
                    style={{ display: 'block', textAlign: 'center' }}
                    name='country'
                    value={country}
                    onChange={handleChangeCountry}
                    placeholder={activeTab === 'ge' ? 'ქვეყანა' : 'Country'}
                />
                <span style={{ color: 'red' }}>{countryError}</span>

                <input
                    style={{ display: 'block', textAlign: 'center' }}
                    name='population'
                    value={population}
                    onChange={handleChangePopulation}
                    placeholder={activeTab === 'ge' ? 'მოსახლება' : 'Population'}
                />
                <span style={{ color: 'red' }}>{populationError}</span>

                <input
                    style={{ display: 'block', textAlign: 'center' }}
                    name='capital'
                    value={capital}
                    onChange={handleChangeCapital}
                    placeholder={activeTab === 'ge' ? 'დედაქალაქი' : 'Capital'}
                />
                <span style={{ color: 'red' }}>{capitalError}</span>

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
