import React, { useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import { Accordion, AccordionDetails } from "@mui/material";
import AccordionSummary from '@mui/material/AccordionSummary';

import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

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
      
      <Accordion style={{ background: "rgb(18, 18, 24)", width: "80%", border: "1px solid white"}}>
        <AccordionSummary
          expandIcon={<AddIcon style={{color: "white", transform: "scale(1.5)"}} />}
          
          aria-controls="panel1a-content"
          id="panel1a-header"
          style={{width: "100%"}}
        >
          <span className="mainText" style={{ fontSize: "2rem", opacity: "1" }}>
          {question}
        </span>
        </AccordionSummary>
        <AccordionDetails style={{background: "rgb(174, 57, 52, 0.6)"}}>
        <span
          className="mainText"
          style={{ fontSize: "1.2rem", fontWeight: "lighter" }}
        >
          {answer}
        </span>
        </AccordionDetails>
      </Accordion>

      
    </div>
  );
};

export default Faq;
