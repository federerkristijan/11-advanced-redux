import ProductItem from "./ProductItem";
import classes from "./Products.module.css";

const dummy_products = [
  {
    id: "p1",
    price: 10,
    title: "Vegan choko-cherry cake",
    description:
      "Home-made vegan choko cake with apple-banana muss and cherries",
  },
  {
    id: "p2",
    price: 12,
    title: "Choko-banana cake",
    description: "Home-made choco cake with chocolate",
  },
];

const Products = (props) => {
  return (
    <section className={classes.products}>
      <h2>Buy your favorite products</h2>
      <ul>
        {dummy_products.map((product) => (
          <ProductItem
            key={product.id}
            title={product.title}
            price={product.price}
            description={product.description}
          />
        ))}
      </ul>
    </section>
  );
};

export default Products;
