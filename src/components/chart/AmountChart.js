import Spinner from "react-bootstrap/Spinner";

const AmountChart = ({ title, amount, haveData }) => {
  return (
    <div class="col-sm-3">
      <div class="card  mb-3">
        <div class="card-header">{title}</div>
        <div class="card-body">
          <h1 class="p-3 text-center">
            {!haveData ? <Spinner animation="border" /> : amount}
          </h1>
        </div>
      </div>
    </div>
  );
};

export default AmountChart;
