const form = document.getElementById("age-form");
const dobInput = document.getElementById("dob");
const onDateInput = document.getElementById("on-date");
const errorEl = document.getElementById("error");
const resultEl = document.getElementById("result");

const MS_PER_DAY = 1000 * 60 * 60 * 24;

// Don't allow future birth dates
dobInput.max = toInputValue(new Date());

function toInputValue(date) {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
}

// Parse "YYYY-MM-DD" as a local date (avoids timezone shifts)
function parseDate(value) {
  const [y, m, d] = value.split("-").map(Number);
  return new Date(y, m - 1, d);
}

function daysInMonth(year, month) {
  return new Date(year, month + 1, 0).getDate();
}

function calculateAge(dob, target) {
  let years = target.getFullYear() - dob.getFullYear();
  let months = target.getMonth() - dob.getMonth();
  let days = target.getDate() - dob.getDate();

  if (days < 0) {
    // Borrow days from the previous month
    const prevMonth = (target.getMonth() + 11) % 12;
    const prevYear = target.getMonth() === 0 ? target.getFullYear() - 1 : target.getFullYear();
    days += daysInMonth(prevYear, prevMonth);
    months--;
  }
  if (months < 0) {
    months += 12;
    years--;
  }
  return { years, months, days };
}

function daysUntilNextBirthday(dob, target) {
  let next = new Date(target.getFullYear(), dob.getMonth(), dob.getDate());
  if (next < target) {
    next = new Date(target.getFullYear() + 1, dob.getMonth(), dob.getDate());
  }
  return Math.round((next - target) / MS_PER_DAY);
}

function showError(message) {
  errorEl.textContent = message;
  resultEl.classList.add("hidden");
}

form.addEventListener("submit", (event) => {
  event.preventDefault();
  errorEl.textContent = "";

  if (!dobInput.value) {
    showError("Please enter your date of birth.");
    return;
  }

  const dob = parseDate(dobInput.value);
  const target = onDateInput.value ? parseDate(onDateInput.value) : parseDate(toInputValue(new Date()));

  if (dob > target) {
    showError("Date of birth cannot be after the date you're calculating for.");
    return;
  }

  const { years, months, days } = calculateAge(dob, target);
  const totalDays = Math.round((target - dob) / MS_PER_DAY);

  document.getElementById("years").textContent = years;
  document.getElementById("months").textContent = months;
  document.getElementById("days").textContent = days;
  document.getElementById("total-months").textContent = (years * 12 + months).toLocaleString();
  document.getElementById("total-weeks").textContent = Math.floor(totalDays / 7).toLocaleString();
  document.getElementById("total-days").textContent = totalDays.toLocaleString();
  document.getElementById("next-birthday").textContent = daysUntilNextBirthday(dob, target);

  resultEl.classList.remove("hidden");
});
