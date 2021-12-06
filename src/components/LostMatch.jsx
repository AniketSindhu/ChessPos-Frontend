import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

function LostMatch() {
  let navigate = useNavigate();
  let location = useLocation();
  let [isWhite, setIsWhite] = useState(true);

  useEffect(() => {
    if (location.state) {
      setIsWhite(location.state.isWhite);
    }
  }, []);
  return (
    <div>
      <h1>You lost the macth and money loser!!</h1>
      <button
        onClick={() => {
          window.history.replaceState(null, "", location.pathname);
          navigate("/app");
        }}
      >
        Back to home
      </button>
    </div>
  );
}

export default LostMatch;
