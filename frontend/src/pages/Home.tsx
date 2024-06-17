import Tabs from "../components/Tabs";
import Portfolio from "../components/Portfolio";

const Home = () => {
  return (
    <div>
      <div className="mb-4">
        <Tabs />
      </div>
      <div className="mb-4">
        <Portfolio />
      </div>
    </div>
  );
};

export default Home;
