import { useState } from "react";
import { createPlan } from "../services/studyPlan";
import { GoogleGenAI } from "@google/genai";

export default function CreatePlan() {
  const [plan, setPlan] = useState({
    planName: "",
    description: "",
    startDate: "",
    endDate: "",
    specialConstraints: "",
    aiSuggestion: ""
  });

  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [toast, setToast] = useState("");

  const showToast = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(""), 3000);
  };

  const clearForm = () => {
    setPlan({
      planName: "",
      description: "",
      startDate: "",
      endDate: "",
      specialConstraints: "",
      aiSuggestion: ""
    });
  };

  const generateAI = async () => {
    if (!plan.description.trim()) {
      showToast("Please enter topics before generating AI suggestion.");
      return;
    }

    setLoading(true);

    try {
      const ai = new GoogleGenAI({ apiKey: import.meta.env.VITE_GEMINI_API_KEY });

      const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: [
          {
            parts: [
              {
                text: `
Generate a study plan:
Topics: ${plan.description}
Start: ${plan.startDate}
End: ${plan.endDate}
Constraints: ${plan.specialConstraints}
`
              }
            ]
          }
        ]
      });

      const output =
        response.candidates?.[0]?.content?.parts?.[0]?.text ||
        "AI returned no text.";

      setPlan((prev) => ({ ...prev, aiSuggestion: output }));
      showToast("AI suggestion generated!");

    } catch (err) {
      console.error(err);
      showToast("AI generation failed.");
    }

    setLoading(false);
  };

  const save = async () => {
    if (!plan.planName.trim()) return showToast("Plan name is required");
    if (!plan.description.trim()) return showToast("Topics description required");

    setSaving(true);

    try {
      await createPlan(plan);
      showToast("Plan saved!");

      clearForm(); // RESET FORM 🚀

    } catch (err) {
      console.error(err);
      showToast("Failed to save plan.");
    }

    setSaving(false);
  };

  return (
    <div className="page">
      <h2>Create Study Plan</h2>

      {/* Toast notification */}
      {toast && <div className="toast">{toast}</div>}

      <input
        placeholder="Plan Name"
        value={plan.planName}
        onChange={(e) => setPlan({ ...plan, planName: e.target.value })}
      />

      <textarea
        placeholder="Topics to study"
        value={plan.description}
        onChange={(e) => setPlan({ ...plan, description: e.target.value })}
      />

      <label>Start Date</label>
      <input
        type="date"
        value={plan.startDate}
        onChange={(e) => setPlan({ ...plan, startDate: e.target.value })}
      />

      <label>End Date</label>
      <input
        type="date"
        value={plan.endDate}
        onChange={(e) => setPlan({ ...plan, endDate: e.target.value })}
      />

      <textarea
        placeholder="Special Constraints"
        value={plan.specialConstraints}
        onChange={(e) =>
          setPlan({ ...plan, specialConstraints: e.target.value })
        }
      />

      {/* AI Button */}
      <button onClick={generateAI} disabled={loading} className="ai-btn">
        {loading ? "Generating..." : "Generate AI Suggestion"}
      </button>

      {loading && <div className="loader"></div>}

      <textarea
        value={plan.aiSuggestion}
        placeholder="AI suggestion will appear here..."
        onChange={(e) => setPlan({ ...plan, aiSuggestion: e.target.value })}
      />

      {/* Save Button */}
      <button onClick={save} disabled={saving}>
        {saving ? "Saving..." : "Save Plan"}
      </button>
    </div>
  );
}
