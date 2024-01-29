import React from "react";
import "./campaigns.css";
import CampaignItem from "./CampaignItem";

const Campaigns = () => {
  return (
    <section className="campaigns">
      <div className="container">
        <div className="campaigns-wrapper">
          <CampaignItem />
          <CampaignItem />
        </div>
        <div className="campaigns-wrapper">
          <CampaignItem />
          <CampaignItem />
        </div>
      </div>
    </section>
  );
};

export default Campaigns;
