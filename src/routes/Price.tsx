import { useQuery } from "react-query";
import styled from "styled-components";
import { fetchCoinHistory, fetchCoinTickers } from "../api";

const PercentWrap = styled.div`
  display: flex;
  flex-flow: row wrap;
`;

const PercentBox = styled.div`
  width: 49%;
  margin: 0 2% 2% 0;
  padding: 25px;
  background-color: ${(props) => props.theme.boxColor};
  border-radius: 10px;
  &:nth-of-type(2n) {
    margin-right: 0;
  }
  p {
    font-size: 16px;
    font-weight: 500;
    opacity: 0.5;
  }

  @media (max-width: 768px) {
    width: 100%;
    margin-right: 0;
    padding: 15px;
    p {
      display: inline-block;
      font-size: 14px;
    }
  }
`;

const Text = styled.h3<{ isPositive: boolean }>`
  font-size: min(28px, 6.5vw);
  margin-top: 10px;
  color: ${(props) => (props.isPositive ? "#f37362" : "#3C90EB")};
  @media (max-width: 768px) {
    display: inline-block;
    margin: 0 0 0 4%;
  }
`;

function checkValue(value: number | undefined) {
  if (value) {
    return value > 0;
  }
}

interface PriceProps {
  coinId: string;
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

function Price({ coinId }: PriceProps) {
  const { isLoading: tickersLoading, data: tickersData } = useQuery<PriceData>(
    ["tickers", coinId],
    () => fetchCoinTickers(coinId),
    {
      refetchInterval: 5000,
    }
  );
  const loading = tickersLoading;
  return (
    <div>
      {loading ? (
        "Loading price..."
      ) : (
        <PercentWrap>
          <PercentBox>
            <p>15분 전</p>
            <Text
              isPositive={
                checkValue(tickersData?.quotes.USD.percent_change_15m) === true
              }
            >
              {tickersData?.quotes.USD.percent_change_15m.toFixed(3)} %
            </Text>
          </PercentBox>
          <PercentBox>
            <p>30분 전</p>
            <Text
              isPositive={
                checkValue(tickersData?.quotes.USD.percent_change_30m) === true
              }
            >
              {tickersData?.quotes.USD.percent_change_30m.toFixed(3)} %
            </Text>
          </PercentBox>
          <PercentBox>
            <p>1시간 전</p>
            <Text
              isPositive={
                checkValue(tickersData?.quotes.USD.percent_change_1h) === true
              }
            >
              {tickersData?.quotes.USD.percent_change_1h.toFixed(3)} %
            </Text>
          </PercentBox>
          <PercentBox>
            <p>6시간 전</p>
            <Text
              isPositive={
                checkValue(tickersData?.quotes.USD.percent_change_6h) === true
              }
            >
              {tickersData?.quotes.USD.percent_change_6h.toFixed(3)} %
            </Text>
          </PercentBox>
          <PercentBox>
            <p>12시간 전</p>
            <Text
              isPositive={
                checkValue(tickersData?.quotes.USD.percent_change_12h) === true
              }
            >
              {tickersData?.quotes.USD.percent_change_12h.toFixed(3)} %
            </Text>
          </PercentBox>
          <PercentBox>
            <p>하루 전</p>
            <Text
              isPositive={
                checkValue(tickersData?.quotes.USD.percent_change_24h) === true
              }
            >
              {tickersData?.quotes.USD.percent_change_24h.toFixed(3)} %
            </Text>
          </PercentBox>
          <PercentBox>
            <p>일주일 전</p>
            <Text
              isPositive={
                checkValue(tickersData?.quotes.USD.percent_change_7d) === true
              }
            >
              {tickersData?.quotes.USD.percent_change_7d.toFixed(3)} %
            </Text>
          </PercentBox>
          <PercentBox>
            <p>한달 전</p>
            <Text
              isPositive={
                checkValue(tickersData?.quotes.USD.percent_change_30d) === true
              }
            >
              {tickersData?.quotes.USD.percent_change_30d.toFixed(3)} %
            </Text>
          </PercentBox>
        </PercentWrap>
      )}
    </div>
  );
}

export default Price;
