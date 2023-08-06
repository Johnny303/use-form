const url = `http://127.0.0.1:3000/api/users`;


const userHTML = user => `<div class="user">
<span class="user-id">${user.id}: </span>
${user.name.first}
${user.name.middle}
${user.name.last} <br>
${user.email} <br> 
${user.shipping.country}, 
${user.shipping.zip}, 
${user.shipping.city}, 
${user.shipping.address} 
${user.invoice.country}, 
${user.invoice.zip}, 
${user.invoice.city}, 
${user.invoice.address} 
</div> <br>`;
const usersHTML = users => `<div id="users">${users.map(user => userHTML(user)).join("")}</div> `;

const inputHTMLfirstName = (firstName) => `<input placeholder="Write the firstName here" value="${firstName}">`;
const inputHTMLlastName = (lastName) => `<input placeholder="Write the lastName here" value="${lastName}">`;
const inputHTMLmiddleName = (middleName) => `<input placeholder="Write the middleName here" value="${middleName}">`;
const inputHTMLEmail = (email) => `<input placeholder="Write the email here" value="${email}">`;
const inputHTMLcountry = (country) => `<input placeholder="Write the country here" value="${country}">`;
const inputHTMLzip = (zip) => `<input placeholder="Write the zip here" value="${zip}">`;
const inputHTMLcity = (city) => `<input placeholder="Write the city here" value="${city}">`;
const inputHTMLaddress = (address) => `<input placeholder="Write the address here" value="${address}">`;
const inputHTMLshippingCountry = (shippingCountry) => `<input placeholder="Write the shippingCountry here" value="${shippingCountry}">`;
const inputHTMLshippingZip = (shippingZip) => `<input placeholder="Write the shippingZip here" value="${shippingZip}">`;
const inputHTMLshippingCity = (shippingCity) => `<input placeholder="Write the shippingCity here" value="${shippingCity}">`;
const inputHTMLshippingAddress = (shippingAddress) => `<input placeholder="Write the shippingAddress here" value="${shippingAddress}">`;

const buttonHTML = (text, method) => `<button type="submit" data-method="${method}">${text}</button>`;

const formHTML = (user) => `
<form id="form" data-id="${user.id}">
${inputHTMLfirstName(user.name.first)}
${inputHTMLlastName(user.name.last)}
${inputHTMLmiddleName(user.name.middle)}
${inputHTMLEmail(user.email)}
${inputHTMLcountry(user.invoice.country)}
${inputHTMLzip(user.invoice.zip)}
${inputHTMLcity(user.invoice.city)}
${inputHTMLaddress(user.invoice.address)}
${inputHTMLshippingCountry(user.shipping.country)}
${inputHTMLshippingZip(user.shipping.zip)}
${inputHTMLshippingCity(user.shipping.city)}
${inputHTMLshippingAddress(user.shipping.address)}

${buttonHTML("Save", "PATCH")}
${buttonHTML("Replace", "PUT")}
${buttonHTML("Remove", "DELETE")}
${buttonHTML("Add", "POST")}
</form>
`;

const fetchData = async (url, id, method = "GET", body = {
  name: {
    first: "",
    middle: "",
    last: ""
  },
  email: "",
  shipping: {
    country: "",
    zip: "",
    city: "",
    address: "",
  },
  invoice: {
    country: "",
    zip: "",
    city: "",
    address: "",
  }
}) => {
  if (id && parseInt(id) === 0 && body.name === "") {
    console.log("Empty name is not valid when creating a new user");
    return;
  }
  try {
    const response = await fetch(id !== undefined ? `${url}/${id}` : url, method === "GET" ? {method} : {method, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body)} );
    console.log("body: ",body)
    return await response.json();
  
  } catch (error) {
    console.error(error);
  }
}

const main = async _ => {
  const root = document.getElementById("root");
  const users = await fetchData(url);
  root.insertAdjacentHTML("beforeend", usersHTML(users));
  root.insertAdjacentHTML("beforeend", formHTML({id: 0, name: {first: "", middle: "", last: ""}, email: "", invoice: {country: "", zip:"", city: "", address: ""}, shipping: {country: "", zip:"", city: "", address: ""}}));
  window.addEventListener("input", handleInput);
  window.addEventListener("submit", handleSubmit)
};

const handleClick = async ({ target }) => {
  const userTarget = target.classList.contains('user') ? target : target.closest('.user');

  if (userTarget) {
  const userId = userTarget.innerText.split("")[0]
  const userData = await fetchData(url, userId);
  document.getElementById("form").outerHTML = formHTML(userData);

  const response = await fetch(`${url}/${userId}`);
  const data = await response.json();
  
  const inputElement = userTarget.querySelectorAll('input');
  inputElement.value = data.name.first;
  document.getElementById('form').dataset.id = userId;
}
  };

window.addEventListener("click", event => {
  handleClick(event)
})

const handleInput = ({target}) => {
  target.setAttribute("value", target.value);
}

const handleSubmit = async e => {
  e.preventDefault();
  console.log("E value: ", e.target.querySelectorAll("input"))

  const method = e.submitter.getAttribute("data-method");
  const id = parseInt(e.target.getAttribute("data-id"));

  const result = await fetchData(url, e.target.getAttribute("data-id"), method, method === "PATCH" ? {
    name: {
      first: e.target.querySelectorAll("input")[0].value,
      middle:  e.target.querySelectorAll("input")[1].value,
      last: e.target.querySelectorAll("input")[2].value,
    },
    email: e.target.querySelectorAll("input")[3].value,
    invoice: {
      country: e.target.querySelectorAll("input")[4].value,
      zip: e.target.querySelectorAll("input")[5].value,
      city: e.target.querySelectorAll("input")[6].value,
      address: e.target.querySelectorAll("input")[7].value,
    },
    shipping: {
      country: e.target.querySelectorAll("input")[8].value,
      zip: e.target.querySelectorAll("input")[9].value,
      city: e.target.querySelectorAll("input")[10].value,
      address: e.target.querySelectorAll("input")[11].value,
    }
  } : 
  method === "PUT" ? {
    name: {
      first: e.target.querySelectorAll("input")[0].value,
      middle:  e.target.querySelectorAll("input")[1].value,
      last: e.target.querySelectorAll("input")[2].value,
    },
    email: e.target.querySelectorAll("input")[3].value,
    invoice: {
      country: e.target.querySelectorAll("input")[4].value,
      zip: e.target.querySelectorAll("input")[5].value,
      city: e.target.querySelectorAll("input")[6].value,
      address: e.target.querySelectorAll("input")[7].value,
    },
    shipping: {
      country: e.target.querySelectorAll("input")[8].value,
      zip: e.target.querySelectorAll("input")[9].value,
      city: e.target.querySelectorAll("input")[10].value,
      address: e.target.querySelectorAll("input")[11].value,
    }
  } : method === "DELETE" ? 
  {
    name: {
      first: "",
      middle: "",
      last: ""
    },
    email: "",
    shipping: {
      country: "",
      zip: "",
      city: "",
      address: "",
    },
    invoice: {
      country: "",
      zip: "",
      city: "",
      address: "",
    }
  } : method === "POST" ? 
  {
    name: {
      first: e.target.querySelectorAll("input")[0].value,
      middle:  e.target.querySelectorAll("input")[1].value,
      last: e.target.querySelectorAll("input")[2].value,
    },
    email: e.target.querySelectorAll("input")[3].value,
    invoice: {
      country: e.target.querySelectorAll("input")[4].value,
      zip: e.target.querySelectorAll("input")[5].value,
      city: e.target.querySelectorAll("input")[6].value,
      address: e.target.querySelectorAll("input")[7].value,
    },
    shipping: {
      country: e.target.querySelectorAll("input")[8].value,
      zip: e.target.querySelectorAll("input")[9].value,
      city: e.target.querySelectorAll("input")[10].value,
      address: e.target.querySelectorAll("input")[11].value,
      id: 0
    }
  } :
   {
    name: {
      first: "",
      middle: "",
      last: ""
    },
    email: "",
    shipping: {
      country: "",
      zip: "",
      city: "",
      address: "",
    },
    invoice: {
      country: "",
      zip: "",
      city: "",
      address: "",
    }
  })
  if (result.state === "DONE") {
      const users = await fetchData(url);
      document.getElementById("users").outerHTML = usersHTML(users);
  }
}


window.addEventListener("load", main);