import React from "react";
import Hero from "../components/Hero";
import JobSearch from "../components/JobSearch";
import Stats from "../components/Stats";
import FeaturedSection from "../components/FeaturedJobs";

const Home = () => {
  return (
    <>
      <Hero />
      <Stats />
      <FeaturedSection />
    </>
  );
};

export default Home;
