import Link from "next/link";
import React from "react";
import Image from "next/image";

const categories = [
  {
    id: "electronics",
    title: "Modern Electronics",
    subtitle: "Latest flagships & accessories",
    image: "/electronics3.jpg",
    Link: "/electronics",
  },
  { id: "fashion", title: "Fashion", image: "/fashion.jpg", Link: "/fashion" },
  {
    id: "groceries",
    title: "Groceries",
    image: "/groceries.jpg",
    Link: "/groceries",
  },
  {
    id: "handicrafts",
    title: "Handicrafts",
    image: "/handicraft.jpg",
    Link: "/handicrafts",
  },
  {
    id: "home-decor",
    title: "Home Decor",
    image: "/home-decor.jpg",
    Link: "/homeDecor",
  },
];
export default function CategorySection() {
  return (
    <section className="pt-9 pb-12  xl:py-6 w-full bg-[#fff8f7]">
      <div className="common-box">
        <div className=" flex flex-col space-y-6">
          {/* upper header and see all link */}
          <div className=" flex items-center  justify-between space-y-2 xl:space-y-3  ">
            <header className="font-manrope  text-3xl font-bold xl:font-extrabold xl:text-[27px] ">
              Shop by Category
            </header>
            <Link href={"/categories"}>
              <span className="text-primary text-sm font-semibold ">
                See All
              </span>
            </Link>
          </div>
          {/* lower grid of images */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3.5 md:gap-6.5 w-full overflow-hidden">
            {categories.map((category, index) => {
              return (
                <Link
                  key={category.id}
                  href={category.Link}
                  // To get the "L-shaped" or professional "Featured" layout where four smaller boxes sit beside one large box, you need to use row-span-2 for the first item and ensure the grid is tall enough.
                  className={`rounded-2xl group relative overflow-hidden transition-all duration-300
                    ${index === 0 ? "col-span-2 row-span-2 aspect-square md:aspect-4/5  lg:aspect-square" : "col-span-1  aspect-square md:aspect-4/5 lg:aspect-square xl:aspect-9/7"}`}
                >
                  {/* group relative overflow-hidden transition-all duration-300 */}
                  {/* group-hover:scale-105 transition-transform */}
                  {/* image = aspect */}
                  <Image
                    src={category.image}
                    alt={category.title}
                    fill
                    className="object-cover rounded-2xl group-hover:scale-105 transition-transform"
                  />
                  {/* gradient div to make content clear  */}
                  {/* FIX: Added 'rounded-2xl' here. Also ensured it covers the full height properly. */}
                  <div className="absolute  h-full rounded-2xl inset-0 bg-linear-to-t from-black/80 via-black/20 to-transparent" />
                  {/* content */}
                  <div className="absolute left-5 bottom-5 text-white ">
                    <h1
                      className={`${index == 0 ? "font-manrope font-extrabold  text-[20px] " : "font-sans font-semibold text-[16px]"}`}
                    >
                      {category.title}
                    </h1>
                    {category.subtitle && (
                      <p className="text-[14px] font-semibold">
                        {category.subtitle}
                      </p>
                    )}
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
