import BarChart from "../ui-components/BarChart";
import LineChart from "../ui-components/LineChart";
import PieChart from "../ui-components/PieChart";

function StockChart(props) {
  return (
    <div className="row">
      <div className="col-12">
        <BarChart chartData={props.userData} />
      </div>
      <div className="col-12">
        <LineChart chartData={props.userData} />
      </div>
      <div className="col-12">
        <PieChart chartData={props.volumData} />
      </div>
    </div>
  );
}

export default StockChart;
