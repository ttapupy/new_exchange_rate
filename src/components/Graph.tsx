import { useEffect, useMemo, useCallback, useState } from 'react';
import { useGraphContext } from "../GraphContext";
import { Rate, PeriodRatesData } from '../interfaces';
import { Chart, AxisOptions } from 'react-charts'
import { Row, Col } from 'react-bootstrap'

type DailyRate = {
  date: Date,
  rate: number,
  // scaleType: string;
}

type Series = {
  label: string,
  data: DailyRate[] | []
}


const Graph = () => {

  const { isFetching, isError, data: periodRatesData, toCurrency } = useGraphContext();
  console.log('data:', periodRatesData);

  const formatData = useCallback((apiData: PeriodRatesData | null | undefined) => {
    if (apiData == null) return [];

    return Object.entries(apiData.rates).map(([k, v]: [k: string, v: Rate]) => {
      const date = new Date(k) || null
      const rate = toCurrency ? v[toCurrency] || 0 : 0
      return ({ date, rate })
    })
  }, [toCurrency])

  const [graphData, setGraphData] = useState<Series[]>([])


  useMemo(
    () => {
      if (periodRatesData) {
        setGraphData(() => [
          {
            label: 'Daily Rates',
            data: formatData(periodRatesData) || []
          }
        ])
      } else {
        setGraphData([]);
      }
    }, [formatData, periodRatesData]
  )

  const primaryAxis = useMemo(
    (): AxisOptions<DailyRate> => ({
      getValue: datum => datum.date,
    }), [])

  const secondaryAxes = useMemo(
    (): AxisOptions<DailyRate>[] => [
      {
        getValue: datum => datum.rate,
      },
    ], [])

  useEffect(() => {
    console.log('graphData:', graphData);
  }, [graphData])


  return (
    <>
      <Row>
        <Col>
          <div>{`Current relation: EUR - ${toCurrency}.`}</div>
        </Col>
      </Row>

      {graphData?.length &&
        <Row>
          <Col>
            <Chart
              options={{
                data: graphData,
                primaryAxis,
                secondaryAxes,
              }}
            />
          </Col>
        </Row>
      }
    </>
  );
}

export default Graph;