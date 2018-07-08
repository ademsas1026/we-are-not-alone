import React from "react";
import {
  VictoryBar,
  VictoryChart,
  VictoryTheme,
  VictoryPolarAxis, 
  VictoryLabel, 
  Line
} from 'victory'

export default class Chart extends React.Component {
  

  render() {
    
    const mostCommonlyUsedWordsOverall = this.props.mostCommonlyUsedWordsOverall.map(wordObject => {
      return { word: wordObject.word, frequency: (wordObject.frequency)/10 }
    }).slice(0, 10);
    const mostCommonlyUsedWordsPerCluster = this.props.mostCommonlyUsedWordsPerCluster.slice(0, 10) || []
    const defaultData = mostCommonlyUsedWordsOverall.map((wordObject, i) => {
      return {x: i, y: wordObject.word}
    } )
    
    
    const data = mostCommonlyUsedWordsPerCluster.length 
      ? mostCommonlyUsedWordsPerCluster.map((wordObject, i) => {
        return { x: i, y: wordObject.word }
        }) 
      : mostCommonlyUsedWordsOverall.map((wordObject, i) => {
        return {x: i, y: wordObject.word}
      } )
    
    return (
      <div className="graph">
        <h1 id="chartLabel">Top 10 Words</h1>
        <VictoryChart polar
          theme={VictoryTheme.material}
          label={"Top 10 Words"}
          labelPlacement="parallel"
          animate={{duration: 500}}
        >
        {/* <VictoryLabel>Top 10 Words</VictoryLabel> */}
        
          {
            mostCommonlyUsedWordsPerCluster.length > 0
            ? mostCommonlyUsedWordsPerCluster.map((wordObject, i) => {
              return (
                <VictoryPolarAxis dependentAxis
                  key={i}
                  label={wordObject.word}
                  labelPlacement="perpendicular"
                  // domain={[0, wordObject.frequency]}
                  style={{
                    axis: { stroke: "black" },
                    grid: { stroke:  "grey" },
                    tickLabels: { fontSize: 10, padding: 15, fill: "white" },
                    axisLabel: {fontSize: 20, padding: 15, fill: "white" }
                  }}
                  axisValue={i}
                />
              );
            })
            : mostCommonlyUsedWordsOverall.map((wordObject, i) => {
              return (
                <VictoryPolarAxis dependentAxis
                  key={i}
                  label={wordObject.word}
                  labelPlacement="perpendicular"
                  domain={[0, wordObject.frequency]}
                  style={{
                    axis: { stroke: "black" },
                    grid: { stroke:  "grey" },
                    tickLabels: { fontSize: 10, padding: 15, fill: "white", fontFamily: "'Karla', sans-serif" }, 
                    axisLabel: {fontSize: 20, padding: 30, fill: "white", fontFamily: "'Karla', sans-serif"}, 
                    
                  }}
                  axisValue={i}
                />
              );
            })
          }
          <VictoryBar
            style={{ data: { fill: "#1F3553", width: 25 } }
            }
            data={data || defaultData}
            animate={{
            onExit: {
              duration: 500,
              before: () => ({
                _y: 0,
                fill: "green",
                label: "BYE"
              })
            }
          }}
          />
          
        </VictoryChart>
        
      </div>
    );
  };
};
