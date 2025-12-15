// Home.jsx
import React from "react";
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import Stats from "../components/Stats";
import FeaturedJobs from "../components/FeaturedJobs";
import LatestNews from "../components/LatestNews";
import FeaturedSection from "../components/FeaturedJobs";

const Home = () => {
  return (
    <>
      {/* <Navbar /> */}
      <Hero />
      <Stats />
      <FeaturedSection />
      {/* <LatestNews /> */}
    </>
  );
};

export default Home;
