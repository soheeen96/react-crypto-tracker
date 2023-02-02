import { Helmet } from "react-helmet";
import { useQuery } from "react-query";
import {
  Switch,
  Route,
  useLocation,
  useParams,
  Link,
  useRouteMatch,
} from "react-router-dom";
import styled from "styled-components";
import { fetchCoinInfo, fetchCoinTickers } from "../api";
import Chart from "./Chart";
import Nav from "./Nav";
import Price from "./Price";

const Container = styled.div`
  padding: 0 3%;
  width: min(768px, 100%);
  margin: 0 auto;
`;
const Header = styled.header`
  height: min(100px, 10vw);
  display: flex;
  flex-flow: row wrap;
  justify-content: center;
  align-items: center;
  position: relative;
  @media (max-width: 768px) {
    height: 80px;
  }
`;

const Title = styled.h1`
  font-size: min(48px, 8.5vw);
  font-weight: 600;
  color: ${(props) => props.theme.accentColor};
`;

const Loader = styled.h1`
  text-align: center;
  font-weight: 700;
  font-size: 24px;
  margin-top: 5%;
`;

const Overview = styled.div`
  display: flex;
  justify-content: space-evenly;
  background-color: ${(props) => props.theme.boxColor};
  padding: 15px 20px;
  margin-bottom: 20px;
  border-radius: 10px;
  box-shadow: 0 0 5px 0 rgba(0, 0, 0, 0.05);

  @media (max-width: 768px) {
    padding: 3% 10px;
    margin-bottom: 20px;
  }
`;
const OverviewItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  font-size: 17px;
  span:first-child {
    font-size: 12px;
    font-weight: 400;
    margin-bottom: 10px;
  }
`;
const Description = styled.p`
  padding: 0 3%;
  line-height: 1.4;
  @media (max-width: 768px) {
    font-size: 14px;
  }
`;

const Tabs = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  margin: 25px 0px;
  gap: 10px;
`;

const Tab = styled.span<{ isActive: boolean }>`
  text-align: center;
  text-transform: uppercase;
  font-size: min(16px, 4vw);
  font-weight: ${(props) => (props.isActive ? 700 : 400)};
  background-color: ${(props) =>
    props.isActive ? props.theme.accentColor : props.theme.boxColor};

  border-radius: 10px;
  box-shadow: 0 0 5px 0 rgba(0, 0, 0, 0.05);

  color: ${(props) =>
    props.isActive ? props.theme.boxColor : props.theme.textColor};
  a {
    display: block;
    padding: min(15px, 5%);
    transition: all 0.3s;
  }
  &:hover {
    a {
      color: ${(props) =>
        props.isActive ? props.theme.boxColor : props.theme.accentColor};
      letter-spacing: 2px;
    }
  }
`;

interface RouteParams {
  coinId: string;
}

interface RouteState {
  name: string;
}

interface InfoData {
  id: string;
  name: string;
  symbol: string;
  rank: number;
  is_new: boolean;
  is_active: boolean;
  type: string;
  logo: string;
  description: string;
  message: string;
  open_source: boolean;
  started_at: string;
  development_status: string;
  hardware_wallet: boolean;
  proof_type: string;
  org_structure: string;
  hash_algorithm: string;
  first_data_at: string;
  last_data_at: string;
}

interface PriceData {
  id: string;
  name: string;
  symbol: string;
  rank: number;
  circulating_supply: number;
  total_supply: number;
  max_supply: number;
  beta_value: number;
  first_data_at: string;
  last_updated: string;
  quotes: {
    USD: {
      ath_date: string;
      ath_price: number;
      market_cap: number;
      market_cap_change_24h: number;
      percent_change_1h: number;
      percent_change_1y: number;
      percent_change_6h: number;
      percent_change_7d: number;
      percent_change_12h: number;
      percent_change_15m: number;
      percent_change_24h: number;
      percent_change_30d: number;
      percent_change_30m: number;
      percent_from_price_ath: number;
      price: number;
      volume_24h: number;
      volume_24h_change_24h: number;
    };
  };
}

interface ICoinProps {}

function Coin({}: ICoinProps) {
  const { coinId } = useParams<RouteParams>();
  const { state } = useLocation<RouteState>();

  const priceMatch = useRouteMatch("/:coinId/price");
  const chartMatch = useRouteMatch("/:coinId/chart");

  // const [loading, setLoading] = useState(true);
  // const [info, setInfo] = useState<InfoData>();
  // const [priceInfo, setPriceInfo] = useState<PriceData>();
  // useEffect(() => {
  //   (async () => {
  //     const infoData = await (
  //       await fetch(`https://api.coinpaprika.com/v1/coins/${coinId}`)
  //     ).json();
  //     const priceData = await (
  //       await fetch(`https://api.coinpaprika.com/v1/tickers/${coinId}`)
  //     ).json();
  //     setInfo(infoData);
  //     setPriceInfo(priceData);
  //     setLoading(false);
  //   })();
  // }, [coinId]);

  const { isLoading: infoLoading, data: infoData } = useQuery<InfoData>(
    ["info", coinId],
    () => fetchCoinInfo(coinId)
  );
  const { isLoading: tickersLoading, data: tickersData } = useQuery<PriceData>(
    ["tickers", coinId],
    () => fetchCoinTickers(coinId),
    {
      refetchInterval: 5000,
    }
  );
  const loading = infoLoading || tickersLoading;
  return (
    <Container>
      <Helmet>
        <title>
          {state?.name ? state.name : loading ? "Loading..." : infoData?.name}
        </title>
      </Helmet>
      <Nav />

      <Header>
        <Title>
          {state?.name ? state.name : loading ? "Loading..." : infoData?.name}
        </Title>
      </Header>
      {loading ? (
        <Loader>Loading...</Loader>
      ) : (
        <>
          <Overview>
            <OverviewItem>
              <span>순위</span>
              <span>{infoData?.rank}</span>
            </OverviewItem>
            <OverviewItem>
              <span>티커</span>
              <span>{infoData?.symbol}</span>
            </OverviewItem>
            <OverviewItem>
              <span>가격</span>
              <span>{tickersData?.quotes.USD.price.toFixed(3)}</span>
            </OverviewItem>
          </Overview>

          <Overview>
            <OverviewItem>
              <span>총량</span>
              <span>{tickersData?.total_supply}</span>
            </OverviewItem>
            <OverviewItem>
              <span>최대 발행량</span>
              <span>{tickersData?.max_supply}</span>
            </OverviewItem>
          </Overview>
          <Description>{infoData?.description}</Description>
          <Tabs>
            <Tab isActive={chartMatch !== null}>
              <Link to={`/${coinId}/chart`}>Chart</Link>
            </Tab>
            <Tab isActive={priceMatch !== null}>
              <Link to={`/${coinId}/price`}>Price</Link>
            </Tab>
          </Tabs>

          <Switch>
            <Route path={`/:coinId/price`}>
              <Price coinId={coinId} />
            </Route>
            <Route path={`/:coinId/chart`}>
              <Chart coinId={coinId} />
            </Route>
          </Switch>
        </>
      )}
    </Container>
  );
}

export default Coin;
