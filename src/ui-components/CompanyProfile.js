import React from "react";

function CompanyProfile({ companyInfo }) {
  return (
    <div className="card" style={{ minHeight: "500px"}}>
      <div className="card-body">
        <h5 className="card-title">{companyInfo.name}</h5>
        <p className="card-text">{companyInfo.symbol}</p>
        <p className="card-text">{companyInfo.industry}</p>
        <p className="card-text">{companyInfo.description}</p>
      </div>
      <ul className="list-group list-group-flush">
        <li className="list-group-item">52 weeks high: {companyInfo['52WeekHigh']}</li>
        <li className="list-group-item">52 weeks low: {companyInfo['52WeekLow']}</li>
      </ul>
    </div>
  );
}

export default CompanyProfile;