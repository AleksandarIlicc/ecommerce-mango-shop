import { useSelector } from "react-redux";

import Header from "../../components/header/header.component";
import ShoppingInfoBar from "../../components/shopping-info-bar/shopping-info-bar.component";
import HomeTabs from "../../components/home-tabs/home-tabs.component";
import ImageGallery from "../../components/image-gallery/image-gallery.compnent";

import { selectMessage } from "../../features/user/authSelect";

const HomePage = () => {
  const message = useSelector(selectMessage);

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
