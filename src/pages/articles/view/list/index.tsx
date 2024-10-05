import Herosection from '@/pages/articles/components/list/herosection/herosection'
import {article } from '@/pages/articles/static/dummy-data'
import Card from '@/pages/articles/components/list/cardsection/card'
import { lazy } from 'react'

const LazyCardlist = lazy(()=>import('@/pages/articles/components/list/cardsection/cardlist/index'));
const LazyCardinfo = lazy(()=>import('@/pages/articles/components/list/cardsection/cardinfo/index'));
const LazyCardTitle = lazy(()=>import('@/pages/articles/components/list/cardsection/cardtitle'));
const LazyCardDescription = lazy(()=>import('@/pages/articles/components/list/cardsection/carddescription'))
const LazyCardpop = lazy((()=>import('@/pages/articles/components/list/cardsection/cardpop')));
const LazyCardCapital = lazy(()=>import('@/pages/articles/components/list/cardsection/cardcapital'))



const CardSectionview:React.FC = () => {

    return(
    <>
        <Herosection />
            <LazyCardlist >
                {article.map((item) => (
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
                    </Card>
                ))}
            </LazyCardlist>
    </>
    )
} 

export default CardSectionview