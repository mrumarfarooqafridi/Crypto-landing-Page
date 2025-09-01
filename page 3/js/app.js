["viewDetails", "getStarted"].forEach((id) => {
  document.getElementById(id).addEventListener("click", () => {
    // Switch sections
    document.getElementById("section-two").classList.remove("d-none");
    document.getElementById("section-one").classList.add("d-none");

    // Show Bootstrap Toast after 2 seconds
    setTimeout(() => {
      const notif = document.getElementById("notification");
      notif.classList.remove("d-none"); // ensure visible
      const toast = new bootstrap.Toast(notif, { delay: 5000 }); // auto-hide after 5s
      toast.show();
    }, 2000);
  });
});

const amountOptions = document.querySelectorAll(".amount-option");
const periodOptions = document.querySelectorAll(".period-option");
const calculateBtn = document.getElementById("calculateBtn");
const resultInput = document.getElementById("resultInput");
const continueBtn = document.getElementById("continueBtn");

let selectedAmount = null;
let selectedPeriod = null;

// Utility: handle selection toggle
function handleSelection(options, type) {
  options.forEach((option) => {
    option.addEventListener("click", () => {
      options.forEach((o) => o.classList.remove("bg-warning", "text-dark"));
      option.classList.add("bg-warning", "text-dark");
      if (type === "amount")
        selectedAmount = parseInt(option.textContent.replace("$", ""));
      if (type === "period") selectedPeriod = parseInt(option.textContent);
    });
  });
}

handleSelection(amountOptions, "amount");
handleSelection(periodOptions, "period");

// Animate counting in input
function animateInput(targetValue) {
  let current = 0;
  resultInput.value = "$0.00";
  const step = Math.ceil(targetValue / 200); // smooth steps
  const interval = setInterval(() => {
    current += step;
    if (current >= targetValue) {
      current = targetValue;
      clearInterval(interval);
    }
    resultInput.value = "$" + current.toLocaleString();
  }, 5);
}

// Calculate button logic
calculateBtn.addEventListener("click", () => {
  if (!selectedAmount || !selectedPeriod) {
    alert("Please select an investment amount and a time period.");
    return;
  }

  // Simple formula: profit = amount * period / 10
  const result = selectedAmount * (selectedPeriod / 10);

  // Animate input
  animateInput(result);

  // Show Continue button
  continueBtn.classList.remove("d-none");
});

// ---- Section 2 -> Section 3 ----
document.addEventListener("DOMContentLoaded", () => {
  function handleContinue() {
    const secondSection = document.getElementById("sectionTwo");
    const thirdSection = document.getElementById("section-three");
    const toastEl = document.getElementById("notification");

    if (secondSection && thirdSection) {
      // Hide second section
      secondSection.classList.add("d-none");

      // Show third section
      thirdSection.classList.remove("d-none");

      // Show notification when third section appears
      if (toastEl) {
        const toast = new bootstrap.Toast(toastEl);
        setTimeout(() => {
          toast.show();
        }, 1000); // delay 1 second after section shows
      }
    }
  }

  document
    .getElementById("continueBtn")
    .addEventListener("click", handleContinue);

  // ---- Section 3 -> Section 4 ----
  function enableSingleSelection(groupId) {
    const group = document.getElementById(groupId);
    const buttons = group.querySelectorAll("span.btn");

    buttons.forEach((btn) => {
      btn.addEventListener("click", () => {
        // Reset all buttons in this group
        buttons.forEach((b) => {
          b.classList.remove("bg-warning", "text-dark");
          b.classList.add("btn-outline-warning");
        });

        // Activate the clicked button
        btn.classList.add("bg-warning", "text-dark");
        btn.classList.remove("btn-outline-warning");
      });
    });
  }

  // Apply to all groups
  enableSingleSelection("investmentGroup");
  enableSingleSelection("periodGroup");
  enableSingleSelection("riskGroup");

  const continueBtn3 = document.getElementById("continueBtn3");

  continueBtn3.addEventListener("click", () => {
    const investmentSelected = document.querySelector(
      "#investmentGroup .bg-warning.text-dark"
    );
    const periodSelected = document.querySelector(
      "#periodGroup .bg-warning.text-dark"
    );
    const riskSelected = document.querySelector(
      "#riskGroup .bg-warning.text-dark"
    );

    if (!investmentSelected || !periodSelected || !riskSelected) {
      alert("⚠️ Please select one option from each category.");
      return;
    }

    // Hide section 3, Show section 4
    document.getElementById("section-three").classList.add("d-none");
    document.getElementById("section-four").classList.remove("d-none");
  });
});
