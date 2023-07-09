import React from "react";
import Header from "../components/Header";
import ShoppingInfoBar from "../components/ShoppingInfoBar";
import HomeTabs from "../components/HomeTabs";
import ImageGallery from "../components/ImageGallery";
import Footer from "../components/Footer";

const HomePage = () => {
  return (
    <>
      <Header />
      <ShoppingInfoBar />
      <HomeTabs />
      <ImageGallery />
      <Footer />
    </>
  );
};

export default HomePage;
