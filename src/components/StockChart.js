import BarChart from "../ui-components/BarChart";
import LineChart from "../ui-components/LineChart";

function StockChart({userData}) {
  return (
    <div className="row">
      <div className="col-6">
        <BarChart chartData={userData} />
      </div>
      <div className="col-6">
        <LineChart chartData={userData} />
      </div>
    </div>
  );
}

export default StockChart;
