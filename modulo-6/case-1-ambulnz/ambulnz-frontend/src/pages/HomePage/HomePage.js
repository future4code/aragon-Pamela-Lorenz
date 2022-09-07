import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { goToLoginPage } from "../../routes/cordinator";

export default function HomePage() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  useEffect(() => {
    if (!token) {
      goToLoginPage(navigate);
    }
  }, []);

  return (
    <main>
      <h1>HomePage</h1>
    </main>
  )
}

