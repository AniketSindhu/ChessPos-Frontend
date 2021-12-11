import React, { useState } from "react";
import AddIcon from "@mui/icons-material/Add";

const Faq = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        marginBottom: "2rem",
        width: "100%",
      }}
    >
      <button
        type="button"
        className="faq faq--active"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="mainText" style={{ fontSize: "2rem", opacity: "1" }}>
          {question}
        </span>
        <AddIcon style={{ color: "white", transform: "scale(1.5)" }} />
      </button>
      {isOpen && (
        <div className="faqContent">
          <span
            className="mainText"
            style={{ fontSize: "1.2rem", fontWeight: "lighter" }}
          >
            {answer}
          </span>
        </div>
      )}
    </div>
  );
};

export default Faq;
