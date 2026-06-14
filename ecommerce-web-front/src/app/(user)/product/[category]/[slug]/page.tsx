import BreadCrumb from "@/utils/Breadcrumb";
import ProductClient from "@/components/Electronics/slug/ProductClient";
import { productApi } from "@/api/productApi";

interface Paramprops {
  // Next.js automatically collects these dynamic URL parts and wraps them inside an object called params.
  params: Promise<{ slug: string; category: string }>;
}

export default async function page({ params }: Paramprops) {
  // We "await" the promise to finish, which unlocks the actual { slug } object
  // destructuring
  const { category, slug } = await params;
  // console.log(slug);
  // const res = await fetch(
  //   `http://localhost:4000/api/products/${category}/${slug}`,
  //   {
  //     cache: "no-store",
  //   },
  // );

  const data = await productApi.getProductBySlug(category, slug, {
    cache: "no-store",
  });

  return (
    <div className="common-box py-4 md:py-8 space-y-4 bg-[#fff8f7]">
      <BreadCrumb />
      <ProductClient
        product={data.product}
        relatedProduct={data.relatedProducts}
      />
    </div>
  );
}

// we use slug as our dynamic routing, we access it from the url as params and find the array associated with it using find()
//
// const res = await fetch(
// `${process.env.NEXT_PUBLIC_API_URL}/api/products/${category}/${slug}`,
// { cache: "no-store" }
// );
