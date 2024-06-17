import Tabs from "../components/Tabs";
import Portfolio from "../components/Portfolio";
import { useMarketAll } from "../hooks/useMarket";
import marketStore from "../stores/marketStore";

const Home = () => {
  const { data } = useMarketAll();

  if (data) {
    marketStore.setMarketPriceLists(data);
  }

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
