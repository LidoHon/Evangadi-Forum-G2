import React from "react";
import Hero from "./components/Hero";
import BottomCard from "./components/BottomCard";
import Header from "./components/Header";
import classes from "./styles/header.module.css"

const Landing = () => {
  return (
    <div className={classes.background_image_class} >
    <Header/>
      <Hero />
      <BottomCard />
    </div>
  );
};

export default Landing;
