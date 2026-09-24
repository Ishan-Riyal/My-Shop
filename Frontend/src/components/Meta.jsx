import { Helmet } from "react-helmet-async";

const Meta = ({
  title = "Welcome To myShop",
  description = "We sell the best products",
  keywords = "electronics, buy electronics, cheap electronics",
}) => {
  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
    </Helmet>
  );
};

export default Meta;
