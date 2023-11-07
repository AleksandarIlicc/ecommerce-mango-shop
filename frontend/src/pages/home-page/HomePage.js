import React from "react";
import Header from "../../components/Header";
import ShoppingInfoBar from "../../components/ShoppingInfoBar";
import HomeTabs from "../../components/HomeTabs";
import ImageGallery from "../../components/ImageGallery";

const HomePage = () => {
  return (
    <>
      <Header />
      <ShoppingInfoBar />
      <HomeTabs />
      <ImageGallery />
    </>
  );
};

export default HomePage;
