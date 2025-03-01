import React from "react";
// import Header from "../Components/header/Header";
import Hero from "../Components/Hero";
import TopChocolates from "../Components/TopChocolates";
import NewsLetterBox from "../Components/NewsLetterBox";
// import Footer from "../Components/footer/Footer";
import CustomerTestimonials from "../Components/CustomerTestimonials";
import Carousel from "../Components/Carousel";

const Home = () => {
  const usersReviews = [
    {
      image:
        "https://64.media.tumblr.com/0f1d9be0930e0fd6e1421e0af63b4baa/4b38c49aa49bf456-a5/s1280x1920/54be3df4f578d67626ed9b3849f53d129667b940.jpg",
      testimonial:
        "I’ve never tasted anything like the 'Hazelnut Delight'! The rich, creamy chocolate combined with the crunchy hazelnuts made every bite a heavenly experience. It’s the perfect balance of smooth and crunchy, and I couldn’t stop at just one. This is by far the best chocolate I’ve ever had, and I will definitely be ordering again!",
      name: "Keerthi Vishwanath",
    },
    {
      image: "https://d22e6o9mp4t2lx.cloudfront.net/cms/pfp3_d7855f9562.webp",
      testimonial:
        "The 'Caramel Truffle' is absolutely divine! The silky caramel center surrounded by smooth dark chocolate is a match made in heaven. It’s the perfect amount of sweetness without being overwhelming. If you’re a fan of rich, indulgent chocolates, this is a must-try. I’m hooked!",
      name: "Arvind Krishnamurthy",
    },
    {
      image: "https://d22e6o9mp4t2lx.cloudfront.net/cms/pfp2_11cfcec183.webp",
      testimonial:
        "The 'Berry Fusion' chocolate is a game-changer. The combination of dark chocolate with fresh berry flavors is so refreshing and unique. It’s not overly sweet, and the tangy berries provide a perfect contrast to the richness of the chocolate. I love how every bite feels like a burst of flavor! This is my new go-to treat!",
      name: "Ishaan Kumaraswamy",
    },
  ];

  return (
    <div>
      <div className="bg-[#FAF8F1]">
        <Hero />
        <Carousel />
        <TopChocolates />
        <CustomerTestimonials Data={usersReviews} />
        <NewsLetterBox />
      </div>
    </div>
  );
};

export default Home;
