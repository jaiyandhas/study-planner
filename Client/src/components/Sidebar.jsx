import { useCallback, useEffect, useState } from "react";
import { getPlans } from "../services/studyPlan";
import { Link, useNavigate } from "react-router-dom";

export default function Sidebar() {
  const [plans, setPlans] = useState([]);
  const navigate = useNavigate();

  const load = useCallback(async () => {
    const list = await getPlans();
    setPlans(list);
  }, []);

  useEffect(() => {
    load();
    window.addEventListener("plans-changed", load);
    return () => window.removeEventListener("plans-changed", load);
  }, [load]);

  const logout = () => {
    localStorage.removeItem("loggedIn");
    navigate("/login");
  };

  return (
    <div className="sidebar">
      <h3>Study Plans</h3>

      <Link to="/create" className="btn">+ New Plan</Link>

      <ul>
        {plans.map((p) => (
          <li key={p._id}>
            <Link to={`/edit/${p._id}`}>{p.planName}</Link>
          </li>
        ))}
      </ul>

      {/* NEW - LOGOUT BUTTON */}
      <button className="logout-btn" onClick={logout}>
        Logout
      </button>
    </div>
  );
}
