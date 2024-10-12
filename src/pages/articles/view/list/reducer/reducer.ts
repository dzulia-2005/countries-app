type Articlereducerinitialstate = {
        img:string;
        country: string;
        population: string; 
        capital: string;
        id:string;
        vote:number;
    }[];


    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    export const cardreducer = (articlelist: Articlereducerinitialstate, action: any) => {
        console.log('Action received:', action);
        if (action.type === "upvote") {
            const updatecardlist = articlelist.map(card => {
                if (card.id === action.payload.id) {
                    return { ...card, vote: card.vote + 1 };
                }
                return card;
            });
            return updatecardlist;
        }

        if(action.type === "sort"){
                const sortbyasc = [...articlelist].sort((a,b)=>{
                    return action.payload.sorttype === "asc" ?
                    a.vote - b.vote : b.vote - a.vote
                })
    
               return sortbyasc
        }

        if(action.type === "create"){
            const updatecardlist = [...articlelist,
                {...action.payload.cardobj ,
                img:"https://cdn.britannica.com/17/4717-004-6F48198E/Flag-Republic-of-Georgia.jpg",
                id:(Number(articlelist.at(-1)?.id)+1).toString(),
                vote:0,
    
            }]
            return updatecardlist
        }

        if (action.type === "delete") {
            const updatedCardList = articlelist.map(card => {
                if (card.id === action.payload.id) {
                    return { ...card, deleted: true }; 
                }
                return card;
            });
            return updatedCardList;
        }

        if (action.type === "restore") {
            const updatedCardList = articlelist.map(card => {
                if (card.id === action.payload.id) {
                    return { ...card, deleted: false };
                }
                return card;
            });
            return updatedCardList;
        }

        return articlelist;
    };
    