document.addEventListener("DOMContentLoaded", function () {
    const requestForm = document.getElementById("requestForm");
    const offerForm = document.getElementById("offerForm");
    const requestList = document.getElementById("request-list");
    const offerList = document.getElementById("offer-list");

    // Handle request form submission
    if (requestForm) {
        requestForm.addEventListener("submit", function (event) {
            event.preventDefault();
            const name = document.getElementById("name").value;
            const location = document.getElementById("location").value;
            const helpType = document.getElementById("help-type").value;
            const description = document.getElementById("description").value;

            const newRequest = { name, location, helpType, description };
            let requests = JSON.parse(localStorage.getItem("helpRequests")) || [];
            requests.push(newRequest);
            localStorage.setItem("helpRequests", JSON.stringify(requests));

            window.location.href = "help.html"; // Redirect to Available Help page
        });
    }

    // Handle offer form submission
    if (offerForm) {
        offerForm.addEventListener("submit", function (event) {
            event.preventDefault();
            const name = document.getElementById("name").value;
            const location = document.getElementById("location").value;
            const helpType = document.getElementById("help-type").value;
            const description = document.getElementById("description").value;

            const newOffer = { name, location, helpType, description };
            let offers = JSON.parse(localStorage.getItem("helpOffers")) || [];
            offers.push(newOffer);
            localStorage.setItem("helpOffers", JSON.stringify(offers));

            window.location.href = "help.html"; // Redirect to Available Help page
        });
    }

    // Function to delete a request
    function deleteRequest(index) {
        let requests = JSON.parse(localStorage.getItem("helpRequests")) || [];
        requests.splice(index, 1);
        localStorage.setItem("helpRequests", JSON.stringify(requests));
        loadRequests(); // Reload the requests list
    }

    // Function to delete an offer
    function deleteOffer(index) {
        let offers = JSON.parse(localStorage.getItem("helpOffers")) || [];
        offers.splice(index, 1);
        localStorage.setItem("helpOffers", JSON.stringify(offers));
        loadOffers(); // Reload the offers list
    }

    // Load requests on Available Help page
    function loadRequests() {
        if (requestList) {
            requestList.innerHTML = ""; // Clear list
            let requests = JSON.parse(localStorage.getItem("helpRequests")) || [];
            requests.forEach((request, index) => {
                const listItem = document.createElement("li");
                listItem.innerHTML = `
                    ${request.name} (${request.location}) needs help with ${request.helpType}: ${request.description}
                    <button class="delete-btn" onclick="deleteRequest(${index})">Delete</button>
                `;
                requestList.appendChild(listItem);
            });
        }
    }

    // Load offers on Available Help page
    function loadOffers() {
        if (offerList) {
            offerList.innerHTML = ""; // Clear list
            let offers = JSON.parse(localStorage.getItem("helpOffers")) || [];
            offers.forEach((offer, index) => {
                const listItem = document.createElement("li");
                listItem.innerHTML = `
                    ${offer.name} (${offer.location}) can offer help with ${offer.helpType}: ${offer.description}
                    <button class="delete-btn" onclick="deleteOffer(${index})">Delete</button>
                `;
                offerList.appendChild(listItem);
            });
        }
    }

    // Load requests and offers when the page loads
    loadRequests();
    loadOffers();
});
