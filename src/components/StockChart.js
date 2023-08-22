import BarChart from "../ui-components/BarChart";
import LineChart from "../ui-components/LineChart";
import PieChart from "../ui-components/PieChart";

function StockChart({userData}) {
  return (
    <div className="row">
      <div className="col-md-4">
        <BarChart chartData={userData} />
      </div>
      <div className="col-md-4">
        <LineChart chartData={userData} />
      </div>
      <div className="col-md-4">
        <PieChart chartData={userData} />
      </div>
    </div>
  );
}

export default StockChart;
