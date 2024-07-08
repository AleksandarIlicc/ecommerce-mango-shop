import Header from "../../components/header/header.component";
import ShoppingInfoBar from "../../components/shopping-info-bar/shopping-info-bar.component";
import HomeTabs from "../../components/home-tabs/home-tabs.component";
import ImageGallery from "../../components/image-gallery/image-gallery.compnent";

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
