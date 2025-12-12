import { useEffect, useState } from "react";
import { getPlans, updatePlan, deletePlan } from "../services/studyPlan";
import { useParams, useNavigate } from "react-router-dom";

export default function EditPlan() {
  const { id } = useParams();
  const nav = useNavigate();
  const [plan, setPlan] = useState(null);
  const [loading, setLoading] = useState(true); // loader
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    load();
  }, [id]); // ✅ load plan AGAIN when sidebar clicks a different plan

  const load = async () => {
    setLoading(true);
    const plans = await getPlans();
    const found = plans.find((p) => p._id === id);
    setPlan(found);
    setLoading(false);
  };

  const save = async () => {
    setSaving(true);
    await updatePlan(id, plan);
    setSaving(false);
    alert("Updated");
  };

  const remove = async () => {
    if (!confirm("Delete this plan?")) return;
    await deletePlan(id);
    alert("Deleted");
    nav("/");
  };

  if (loading) {
    return (
      <div className="page">
        <h2>Loading...</h2>
      </div>
    );
  }

  if (!plan) return <div className="page">Plan not found.</div>;

  return (
    <div className="page fade">
      <h2>Edit: {plan.planName}</h2>

      <input
        value={plan.planName}
        onChange={(e) => setPlan({ ...plan, planName: e.target.value })}
      />

      <textarea
        value={plan.description}
        onChange={(e) => setPlan({ ...plan, description: e.target.value })}
      />

      <input
        type="date"
        value={plan.startDate?.slice(0, 10)}
        onChange={(e) => setPlan({ ...plan, startDate: e.target.value })}
      />

      <input
        type="date"
        value={plan.endDate?.slice(0, 10)}
        onChange={(e) => setPlan({ ...plan, endDate: e.target.value })}
      />

      <textarea
        value={plan.specialConstraints}
        onChange={(e) =>
          setPlan({ ...plan, specialConstraints: e.target.value })
        }
      />

      <textarea
        value={plan.aiSuggestion}
        onChange={(e) => setPlan({ ...plan, aiSuggestion: e.target.value })}
      />

      <button onClick={save} disabled={saving}>
        {saving ? "Saving..." : "Save Changes"}
      </button>

      <button onClick={remove} className="danger">
        Delete Plan
      </button>
    </div>
  );
}
