import { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { useQuery } from "react-query";
import { Link } from "react-router-dom";
import { useSetRecoilState } from "recoil";
import styled from "styled-components";
import { fetchCoins } from "../api";
import { isDarkAtom } from "../atoms";
import Nav from "./Nav";

const Container = styled.div`
  padding: 0 3%;
`;
const Header = styled.header`
  height: min(100px, 10vw);
  display: flex;
  flex-flow: row wrap;
  justify-content: center;
  align-items: center;
`;
const CoinsList = styled.ul`
  display: flex;
  flex-flow: row wrap;
  max-width: 768px;
  margin: 0 auto;
`;
const Coin = styled.li`
  background: ${(props) => props.theme.boxColor};
  color: ${(props) => props.theme.textColor};
  width: 32%;
  margin: 0 2% 2% 0;
  border-radius: 10px;
  transition: all 0.2s;
  a {
    display: flex;
    flex-flow: column wrap;
    justify-content: center;
    align-items: center;
    padding: 20px;

    span {
      font-weight: 500;
    }
  }

  &:nth-of-type(3n) {
    margin-right: 0;
  }
  &:hover {
    background-color: ${(props) => props.theme.accentColor};
    box-shadow: 0 0 10px 0px rgba(0, 0, 0, 0.2);
    a {
      color: #fff;
    }
  }
`;

const Title = styled.h1`
  font-size: 48px;
  font-weight: 600;
  color: ${(props) => props.theme.accentColor};
`;

const Loader = styled.h1`
  text-align: center;
  font-weight: 700;
  font-size: 24px;
  margin-top: 5%;
`;

const Img = styled.img`
  width: min(50px, 100%);
  height: auto;
  object-fit: cover;
  margin-bottom: 10px;
`;

interface ICoin {
  id: string;
  name: string;
  symbol: string;
  rank: number;
  is_new: boolean;
  is_active: boolean;
  type: string;
}
interface ICoinsProps {}

function Coins({}: ICoinsProps) {
  const { isLoading, data } = useQuery<ICoin[]>("allCoins", fetchCoins);
  // const [coins, setCoins] = useState<CoinInterface[]>([]);
  // const [loading, setLoading] = useState(true);
  // useEffect(() => {
  //   (async () => {
  //     const response = await fetch("https://api.coinpaprika.com/v1/coins");
  //     const json = await response.json();
  //     setCoins(json.slice(0, 100));
  //     setLoading(false);
  //   })();
  // }, []);
  return (
    <Container>
      <Helmet>
        <title>Coin</title>
      </Helmet>
      <Nav />
      <Header>
        <Title>Coin</Title>
      </Header>
      {isLoading ? (
        <Loader>Loading...</Loader>
      ) : (
        <CoinsList>
          {data?.slice(0, 100).map((coin) => (
            <Coin key={coin.id}>
              <Link
                to={{
                  pathname: `/${coin.id}/chart`,
                  state: { name: coin.name },
                }}
              >
                <Img
                  src={`https://coinicons-api.vercel.app/api/icon/${coin.symbol.toLowerCase()}`}
                />
                <span>{coin.name}</span>
              </Link>
            </Coin>
          ))}
        </CoinsList>
      )}
    </Container>
  );
}

export default Coins;
