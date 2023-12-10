const addZeroPadding = (num) => (num < 10 ? "0" + num : num);

const formatDateString = (date) => {
    const year = date.getFullYear();
    const month = addZeroPadding(date.getMonth() + 1);
    const day = addZeroPadding(date.getDate());
    return `${year}-${month}-${day}`;
};

const dobInput = document.getElementById("dob");

dobInput.setAttribute("min", formatDateString(new Date(new Date().setFullYear(new Date().getFullYear() - 55))));
dobInput.setAttribute("max", formatDateString(new Date(new Date().setFullYear(new Date().getFullYear() - 18))));

const registrationform = document.getElementById("registration-form");
const entriesStorageKey = "entries-table";

const retrieveUserEntries = () => JSON.parse(localStorage.getItem(entriesStorageKey)) || [];
let userEntriesData = retrieveUserEntries();

const renderUserEntries = () => {
    const table = `<table class="table-auto w-full">
    <tr>
      <th class="py-2 px-3">Name</th>
      <th class="px-4 py-2">Email</th>
      <th class="px-4 py-2">Password</th>
      <th class="px-4 py-2">Dob</th>
      <th class="px-2 py-2">Accepted Terms?</th>
    </tr>
    ${userEntriesData
            .map(
                (entry) => `<tr>${Object.values(entry)
                    .map((value) => `<td class='border px-4 py-2'>${value}</td>`)
                    .join("")}</tr>`
            )
            .join("")}
  </table>`;

    document.getElementById("entries-table").innerHTML = table;
};

const saveUserData = (event) => {
    event.preventDefault();

    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const dob = formatDateString(new Date(dobInput.value));
    const acceptedTerms = document.getElementById("acceptTerms").checked;

    const userEntry = { name, email, password, dob, acceptedTerms };
    userEntriesData.push(userEntry);

    localStorage.setItem(entriesStorageKey, JSON.stringify(userEntriesData));
    renderUserEntries();
};

registrationform.addEventListener("submit", saveUserData);
renderUserEntries();