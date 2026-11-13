window.PLANS = [
  {
    name: "8-week scapular and serratus rebuild",
    summary:
      "Six days a week: three strength days and three light days. The goal is a stable shoulder blade, then a gradual return to pressing.",
    rules: [
      ["Frequency", "6 days a week: 3 strength days and 3 light motor-control days."],
      ["Pain", "0–2 out of 10 mild muscle discomfort is acceptable. Sharp, electric or pinching pain means stop."],
      ["Progression", "Add range or load only if the session and the next morning are not worse."],
      ["Pressing", "Incline bench returns last. Do not train through a rib or mid-back pinch."],
      ["Tempo", "Slow, controlled reps. Quality of shoulder-blade movement matters more than load."],
    ],
    phases: [
      {
        name: "Weeks 1–2: regain control",
        when: "Mon, Wed, Fri",
        exercises: [
          ["Wall push-up plus", "3 × 10", "Push away at the top without shrugging."],
          ["Supine serratus punch", "3 × 12", "Arm toward the ceiling. Reach the shoulder blade forward without bending the elbow."],
          ["Wall slide", "2 × 8", "Small, pain-free range. Keep the ribs controlled."],
          ["Band external rotation", "3 × 12", "Elbow close to the body. Light resistance."],
          ["Dead bug", "3 × 6 / side", "Keep the trunk stable and breathe normally."],
        ],
      },
      {
        name: "Weeks 1–2: light days",
        when: "Tue, Thu, Sat",
        exercises: [
          ["Quadruped scapular protraction", "3 × 10", "Elbows straight. Let the shoulder blades move around the rib cage."],
          ["Quadruped rock-back", "2 × 10", "Keep shoulder-blade control while the hips shift back."],
          ["Very light band row", "2 × 15", "Do not pinch the shoulder blades together hard."],
          ["Thoracic rotation", "2 × 8 / side", "Comfortable range only."],
          ["Easy walking", "10–20 min", "Normal, relaxed breathing."],
        ],
        note: "Avoid in weeks 1–2: incline bench, dips, flyes, dead hangs and aggressive chest or lat stretches.",
      },
      {
        name: "Weeks 3–4: build capacity",
        when: "Strength days",
        exercises: [
          ["Incline push-up plus", "3 × 10–15", "Use a counter or bench height that allows clean control."],
          ["Wall slide", "3 × 10", "Increase range only if symptom-free."],
          ["Serratus punch", "3 × 15", "Light load, smooth protraction."],
          ["Chest-supported row", "3 × 10–12", "Chest support reduces trunk compensation."],
          ["Band external rotation", "3 × 12–15", "Controlled, no shrug."],
          ["Pallof press", "3 × 10 / side", "Resist trunk rotation."],
          ["Dead bug", "3 × 8 / side", "Slow and controlled."],
        ],
        note: "Other 3 days: 10–15 minutes of wall slides, easy push-up plus, gentle thoracic mobility and walking.",
      },
      {
        name: "Weeks 5–6: strength and integration",
        when: "Strength days",
        exercises: [
          ["Incline or full push-up plus", "3 × 8–12", "Choose the hardest version you can do cleanly."],
          ["Landmine press", "3 × 8 / side", "Allows upward rotation and reaching. Do not force range."],
          ["Chest-supported row", "3 × 8–12", "Moderate load, controlled shoulder-blade motion."],
          ["Cable or band serratus punch", "3 × 10–12", "Reach forward without trunk rotation."],
          ["Lower-trap Y raise", "2 × 10", "Very light load. Avoid shrugging."],
          ["External rotation", "3 × 12", "Light to moderate resistance."],
          ["Pallof press", "3 × 10 / side", "Keep a neutral trunk."],
          ["Suitcase carry", "3 × 20–30 s / side", "Stay upright. No leaning."],
        ],
      },
      {
        name: "Weeks 7–8: return to pressing",
        when: "Strength days",
        exercises: [
          ["Push-up plus", "3 × 8–12", "Keep as the serratus primer."],
          ["Landmine press", "3 × 8 / side", "Continue if symptom-free."],
          ["Dumbbell press", "Week 7: 2 × 10", "Start around 30–40% of the former working load. Effort about 5–6 out of 10."],
          ["Dumbbell or barbell press", "Week 8: 3 × 8", "Increase only if there is no sharp pain during or after."],
          ["Chest-supported row", "3 × 8–12", "Keep pulling strength balanced."],
          ["Serratus punch", "2–3 × 12", "Maintenance."],
          ["Lower-trap Y raise", "2 × 10", "Maintenance."],
          ["Rotator cuff work", "2–3 × 12", "Maintenance."],
        ],
        note: "Pressing order: push-up, landmine press, light dumbbell press, barbell bench, then incline bench last.",
      },
    ],
  },
];

(function () {
  function esc(s) {
    return String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;");
  }

  var html = window.PLANS.map(function (plan) {
    var rules = plan.rules
      .map(function (r) {
        return '<div class="plan-rule"><span class="plan-rule-name">' + esc(r[0]) + "</span><span>" + esc(r[1]) + "</span></div>";
      })
      .join("");
    var phases = plan.phases
      .map(function (ph) {
        var rows = ph.exercises
          .map(function (ex) {
            return (
              '<div class="plan-row"><div class="plan-row-head"><span class="plan-row-name">' + esc(ex[0]) +
              '</span><span class="plan-row-spec">' + esc(ex[1]) + '</span></div><div class="plan-row-note">' + esc(ex[2]) + "</div></div>"
            );
          })
          .join("");
        return (
          '<details class="plan-phase"><summary><span class="plan-phase-name">' + esc(ph.name) +
          '</span><span class="plan-phase-when">' + esc(ph.when) + "</span></summary>" + rows +
          (ph.note ? '<p class="plan-note">' + esc(ph.note) + "</p>" : "") + "</details>"
        );
      })
      .join("");
    return (
      '<h1 class="plan-title">' + esc(plan.name) + '</h1><p class="plan-summary">' + esc(plan.summary) + "</p>" +
      '<div class="plan-rules">' + rules + "</div>" + phases
    );
  }).join("");
  document.getElementById("plans").innerHTML = html;

  function updateClock() {
    var now = new Date();
    document.getElementById("clock").textContent =
      String(now.getHours()).padStart(2, "0") + ":" + String(now.getMinutes()).padStart(2, "0");
  }
  updateClock();
  setInterval(updateClock, 10000);
})();
