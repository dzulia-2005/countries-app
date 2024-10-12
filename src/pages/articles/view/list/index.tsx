import Herosection from '@/pages/articles/components/list/herosection/herosection'
// import {article } from '@/pages/articles/static/dummy-data'
import Card from '@/pages/articles/components/list/cardsection/card'
import { FormEvent, lazy, useReducer, } from 'react'
import Likebutton from '../../components/list/cardsection/likecomp';
import { Link } from 'react-router-dom';
import Cardcreateform from '../../components/list/cardsection/card_create_form/cardcreateform';
import {cardreducer} from './reducer/reducer'
import { cardinitialstate } from './reducer/state';


const LazyCardlist = lazy(()=>import('@/pages/articles/components/list/cardsection/cardlist/index'));
const LazyCardinfo = lazy(()=>import('@/pages/articles/components/list/cardsection/cardinfo/index'));
const LazyCardTitle = lazy(()=>import('@/pages/articles/components/list/cardsection/cardtitle'));
const LazyCardDescription = lazy(()=>import('@/pages/articles/components/list/cardsection/carddescription'))
const LazyCardpop = lazy((()=>import('@/pages/articles/components/list/cardsection/cardpop')));
const LazyCardCapital = lazy(()=>import('@/pages/articles/components/list/cardsection/cardcapital'))



const CardSectionview:React.FC = () => {
    const [articlelist,dispatch] = useReducer(cardreducer,cardinitialstate)



    const handlecardlike = (id:string)=>{
       return ()=>{
        dispatch({
            type:"upvote",
            payload:{
                id
            },
        });
       };  
        
    };
    


    const handlecardsortbylike = (sorttype: "asc" | "desc") => {
        dispatch({type:"sort",payload:{sorttype}})
    }

    const handlecreatecard=(event:FormEvent<HTMLFormElement>)=>{
        event.preventDefault();

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const cardobj:any = {};
        const formdata = new FormData(event.currentTarget)

        for(const[key,value] of formdata){
            cardobj[key] = value
        }

        dispatch({type:"create",payload:{cardobj}})
    }

    const handledeletecard = (e: React.MouseEvent<HTMLButtonElement>,id:string) => {
        dispatch({type:"delete",payload:{id}})
    }


    const handleRestoreCard = (id: string) => {
        dispatch({ type: "restore", payload: { id } });
    };

    const handleResetDeletedCards = () => {
        articlelist.forEach(card => {
            if (card.deleted) {
                dispatch({ type: "restore", payload: { id: card.id } });
            }
        });
    };

    const sortedArticleList = [...articlelist].sort((a, b) => {
        if (a.deleted && !b.deleted) return 1;
        if (!a.deleted && b.deleted) return -1;
        return 0;
    });

    
    
    return(
    <>
        <Herosection />
            <Cardcreateform oncardcreate ={handlecreatecard}/>
            <button  style={{margin: '2% 8%'}} onClick={()=>handlecardsortbylike("asc")}>ascending</button>
            <button style={{margin: '2% 8%'}} onClick={()=>handlecardsortbylike("desc")}>descending</button>
            <button onClick={handleResetDeletedCards} style={{ margin: '2% 8%' }}>restore all deleted card</button>
            <LazyCardlist >
                {sortedArticleList.map((item) => (
                    <Card key={item.id} {...item} style={item.deleted ? { opacity: 0.5, backgroundColor: 'lightgray' } : {}}>
                        <img style={{ width: '36%' ,height:'150px' }} src={item.img} alt={item.country} />
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
                            onupvote = { handlecardlike(item.id)}
                        />
                        <div style={{marginRight:'2%'}}>
                            <button >
                                <Link to = {`/articles/${item.id}`}>
                                    More info
                                </Link>
                            </button>
                        </div>

                        <div>
                            <button onClick={(e)=>{
                                e.preventDefault();
                                handledeletecard(e,item.id)
                            }} style={{color:'red'}}>delete</button>
                        </div>

                        {item.deleted && (
                        <button onClick={() => handleRestoreCard(item.id)}>
                            Restore
                        </button>
        )}
                    </Card >
                ))}
            </LazyCardlist>
    </>
    )
} 

export default CardSectionview