import About from "../../Component/About/About";
import MapSection from "../../Component/MapSection/MapSection";
import Metatag from "../../Component/MetaTags/Metatag";
import Product from "../../Component/Product/Product";
import Subscripiton from "../../Component/Subscription/Subscripiton";
import Testimonial from "../../Component/Testimonial/Testimonial";
import CategoryPage from "../CategoryPage/CategoryPage";
import ProductPage from "../ProductPage/ProductPage";

function Home() {
  return (
    <div>
      <Metatag
        title="Assorts - Leading Manufacturer-Exporter of Precision Machine Tools"
        description="Assorts is a trusted manufacturer and exporter of precision tools, accessories for machinists, woodworkers, hobbyists, and more. With over four decades of experience, we offer high-quality machine tools at competitive prices."
        keyword="Machine tools, precision tools, lathe tools, rotary tables, woodworking tools, hobbyist tools, custom tools, Assorts, India tools, machining tools"
      />
      <ProductPage />
      <Product />
      <CategoryPage />
      <About />
      <Testimonial />
      <MapSection />
      <Subscripiton/>
    </div>
  );
}

export default Home;
