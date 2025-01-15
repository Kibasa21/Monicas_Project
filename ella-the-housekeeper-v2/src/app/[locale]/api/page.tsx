import { JSDOM } from "jsdom";
import { NextApiRequest, NextApiResponse } from "next";

import type { JSX } from "react";

const getProducts = async (): Promise<JSX.Element> => {
  const response = await fetch("https://www.samsclub.com.br/acougue?page=2");
  const html = await response.text();

  const dom = new JSDOM(html); // parse the HTML
  const document = dom.window.document; // access the document object

  const products = document.querySelectorAll(
    "div.vtex-search-result-3-x-galleryItem"
  ); // get all the products
  var productsArray = Array.prototype.slice.call(products);
  console.log(productsArray.length);
  productsArray.forEach((product) => {
    console.log(product.textContent);
  });

  //Send products back to the client
  //res.status(200).json({ products });
  return (
    <div>
      <h1>{products}</h1>
    </div>
  );
};

export default getProducts;
