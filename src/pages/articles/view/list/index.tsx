import React, { lazy, useReducer } from "react";
import { NavLink, useParams } from "react-router-dom";
import Herosection from "@/pages/articles/components/list/herosection/herosection";
import Card from "@/pages/articles/components/list/cardsection/card";
import Likebutton from "../../components/list/cardsection/likecomp";
import Cardcreateform from "../../components/list/cardsection/card_create_form/cardcreateform";
import { cardreducer } from "./reducer/reducer";
import { cardinitialstate } from "./reducer/state";
import { translations } from "@/translation";

const LazyCardlist = lazy(
  () => import("@/pages/articles/components/list/cardsection/cardlist/index"),
);
const LazyCardinfo = lazy(
  () => import("@/pages/articles/components/list/cardsection/cardinfo/index"),
);
const LazyCardTitle = lazy(
  () => import("@/pages/articles/components/list/cardsection/cardtitle"),
);
const LazyCardDescription = lazy(
  () => import("@/pages/articles/components/list/cardsection/carddescription"),
);
const LazyCardpop = lazy(
  () => import("@/pages/articles/components/list/cardsection/cardpop"),
);
const LazyCardCapital = lazy(
  () => import("@/pages/articles/components/list/cardsection/cardcapital"),
);

const CardSectionview: React.FC = () => {
  const { lang } = useParams();
  const t = translations[lang as keyof typeof translations];

  const [articlelist, dispatch] = useReducer(cardreducer, cardinitialstate);

  const handlecardlike = (id: string) => () => {
    dispatch({
      type: "upvote",
      payload: {
        id,
      },
    });
  };

  const handlecardsortbylike = (sorttype: "asc" | "desc") => {
    dispatch({ type: "sort", payload: { sorttype } });
  };

  const handlecreatecard = (cardfields: {
    country: string;
    population: string;
    capital: string;
  }) => {
    dispatch({ type: "create", payload: { cardfields } });
  };

  const handledeletecard = (
    _e: React.MouseEvent<HTMLButtonElement>,
    id: string,
  ) => {
    dispatch({ type: "delete", payload: { id } });
  };

  const handleRestoreCard = (id: string) => {
    dispatch({ type: "restore", payload: { id } });
  };

  const handleResetDeletedCards = () => {
    articlelist.forEach((card) => {
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

  return (
    <>
      <Herosection />
      <Cardcreateform onCardCreate={handlecreatecard} />
      <button
        style={{ margin: "2% 8%" }}
        onClick={() => handlecardsortbylike("asc")}
      >
        {t.ascending}
      </button>
      <button
        style={{ margin: "2% 8%" }}
        onClick={() => handlecardsortbylike("desc")}
      >
        {t.descending}
      </button>
      <button onClick={handleResetDeletedCards} style={{ margin: "2% 8%" }}>
        {t.restoreAll}
      </button>
      <LazyCardlist>
        {sortedArticleList.map((item) => (
          <Card
            key={item.id}
            {...item}
            style={
              item.deleted ? { opacity: 0.5, backgroundColor: "lightgray" } : {}
            }
          >
            <img
              style={{ width: "36%", height: "150px" }}
              src={item.img}
              alt={item.country}
            />
            <LazyCardinfo>
              <LazyCardTitle>
                {t.country}: {item.country}
              </LazyCardTitle>
              <LazyCardDescription>
                <LazyCardpop>
                  {t.population}: {item.population}
                </LazyCardpop>
                <LazyCardCapital>
                  {t.capital}: {item.capital}
                </LazyCardCapital>
              </LazyCardDescription>
            </LazyCardinfo>
            <Likebutton
              voutecount={item.vote}
              onupvote={handlecardlike(item.id)}
            />
            <div style={{ marginRight: "2%" }}>
              <button>
                <NavLink to={`${item.id}`}>{t.moreInfo}</NavLink>
              </button>
            </div>
            <div>
              <button
                onClick={(e) => {
                  e.preventDefault();
                  handledeletecard(e, item.id);
                }}
                style={{ color: "red" }}
              >
                {t.delete}
              </button>
            </div>
            {item.deleted && (
              <button onClick={() => handleRestoreCard(item.id)}>
                {t.restore}
              </button>
            )}
          </Card>
        ))}
      </LazyCardlist>
    </>
  );
};

export default CardSectionview;
