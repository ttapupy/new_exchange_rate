import { Suspense, useMemo, useCallback, useState } from 'react';
import { useGraphContext } from "../GraphContext";
import { Rate, PeriodRatesData } from '../interfaces';
import { Row, Col } from 'react-bootstrap';
import { LineChart, Line, CartesianGrid, XAxis, YAxis, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import Loading from './Loading';

type DailyRate = {
  name: string,
  rate: number,
}



const Graph = () => {

  const { isFetching, isError, data: periodRatesData, toCurrency } = useGraphContext();

  const formatData = useCallback((apiData: PeriodRatesData | null | undefined) => {
    if (apiData == null) return [];

    return Object.entries(apiData.rates).map(([k, v]: [k: string, v: Rate]) => {
      const name = k || ""
      const rate = toCurrency ? v[toCurrency] || 0 : 0
      return ({ name, rate })
    })
  }, [toCurrency])

  const [graphData, setGraphData] = useState<DailyRate[]>([])


  useMemo(
    () => {
      if (periodRatesData) {
        setGraphData(() => formatData(periodRatesData) || [])
      } else {
        setGraphData([]);
      }
    }, [formatData, periodRatesData]
  )

  const yaxis = {
    tickFormatter: (value: string) => {
      const floatValue = parseFloat(value)
      const precision = floatValue >= 100 ? 1 : (floatValue >= 10 ? 2 : 3)
      return floatValue.toFixed(precision)
    }
  }

  return (
    <>
      <Row>
        <Col>
          <div style={{ width: '100%', height: 320, paddingLeft: '0px' }}>
            {graphData?.length ?
              (<Suspense fallback={<Loading text={'Waiting for data to load...'} />}>
                <ResponsiveContainer>
                  <LineChart data={graphData} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis domain={[(dataMin: number) => (Math.floor(dataMin)), (dataMax: number) => (Math.round(dataMax))]} />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="rate" stroke="#8884d8" />
                  </LineChart>
                </ResponsiveContainer>
              </Suspense>) :
              <Loading text={'Sorry, there is no data to load...'} />
            }
          </div>
        </Col>
      </Row>

    </>
  );
}

export default Graph;