import React, { useEffect } from "react";
import "./explore.css";

const ActionContainer = () => {
  useEffect(() => {
    const script = document.createElement("script");
    script.src =
      "https://actionnetwork.org/widgets/v3/letter/encourage-your-members-of-congress-to-expand-and-extend-clean-energy-tax-credits?format=js&source=widget";
    document.getElementsByClassName("action-embed")[0].appendChild(script);
  }, []);

  return (
    <section
      className="actionContainer form"
      id="can-letter-area-encourage-your-members-of-congress-to-expand-and-extend-clean-energy-tax-credits"
      style={{ width: "100%" }}
    >
      <div className="action-embed"></div>
    </section>
  );
};

export default ActionContainer;
