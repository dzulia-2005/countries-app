import { useParams } from "react-router-dom";
import Singlelearticle from "@/pages/articles/view/single/index";
import { article } from "@/pages/articles/static/dummy-data";

const SingleArticleview = () => {
  const artilceinfo = article.find((list) => list.id === id);
  const { id } = useParams();
  if (!artilceinfo) {
    return <div>Article Not Found</div>;
  }

  console.log(artilceinfo);
  return (
    <>
      <Singlelearticle />
    </>
  );
};

export default SingleArticleview;
