import Herosection from '@/pages/articles/components/list/herosection/herosection'
import {article } from '@/pages/articles/static/dummy-data'
import Card from '@/pages/articles/components/list/cardsection/card'
import { lazy, useState } from 'react'
import Likebutton from '../../components/list/cardsection/likecomp';
import { Link } from 'react-router-dom';

const LazyCardlist = lazy(()=>import('@/pages/articles/components/list/cardsection/cardlist/index'));
const LazyCardinfo = lazy(()=>import('@/pages/articles/components/list/cardsection/cardinfo/index'));
const LazyCardTitle = lazy(()=>import('@/pages/articles/components/list/cardsection/cardtitle'));
const LazyCardDescription = lazy(()=>import('@/pages/articles/components/list/cardsection/carddescription'))
const LazyCardpop = lazy((()=>import('@/pages/articles/components/list/cardsection/cardpop')));
const LazyCardCapital = lazy(()=>import('@/pages/articles/components/list/cardsection/cardcapital'))



const CardSectionview:React.FC = () => {
    const[articlelist,setArticlelist]=useState<{
        img:string;
        country: string;
        population: string; 
        capital: string;
        id:string;
        vote:number;

    }[]>(article)



    const handlecardlike = (id:string) => {
        const updatecardlist = articlelist.map((card) => {
            if (card.id === id) {
                return { ...card, vote: card.vote + 1 };
            }
            return {...card};
        });
        
        setArticlelist(updatecardlist); 
    };
    
    const sortbylikes = () => {
        const sortcountry = [...articlelist].sort((x,y)=>x.vote - y.vote)

        setArticlelist(sortcountry)
    }
    
    return(
    <>
        <Herosection />

            <button style={{margin: '2% 8%'}} onClick={sortbylikes}>sorted(ascending)</button>

            <LazyCardlist >
                {articlelist.map((item) => (
                    <Card key={item.id} {...item}>
                        <img style={{ width: '100%' }} src={item.img} alt={item.country} />
                        <LazyCardinfo>
                            <LazyCardTitle>
                                country : {item.country}
                            </LazyCardTitle>
                            <LazyCardDescription>
                                <LazyCardpop>Population : {item.population}</LazyCardpop>
                                <LazyCardCapital>Capital : {item.capital}</LazyCardCapital>
                            </LazyCardDescription>
                        </LazyCardinfo>
                        <Likebutton  
                            voutecount = {item.vote}
                            onupvote = {() => handlecardlike(item.id)}
                        />
                        <div>
                            <button>
                                <Link to = {`/articles/${item.id}`}>
                                    More info
                                </Link>
                            </button>
                        </div>
                    </Card>
                ))}
            </LazyCardlist>
    </>
    )
} 

export default CardSectionview