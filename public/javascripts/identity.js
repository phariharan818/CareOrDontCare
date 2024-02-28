let myIdentity = undefined;

async function loadIdentity() {
    try {
        let identityInfo = await fetchJSON(`${apiVersion}/users/myIdentity`)
        myIdentity = identityInfo.userInfo.username;
        let navbarLinks = document.getElementById("navbarLinks");
        let careLink = document.getElementById("careLink");
        let loginLink = document.getElementById("loginLink");
        let logoutLink = document.getElementById("logoutLink");

        if (identityInfo.status == "loggedin") {
            careLink.style.display = "block";
            loginLink.style.display = "none";
            logoutLink.style.display = "block";
        } else { 
            careLink.style.display = "none";
            loginLink.style.display = "block";
            logoutLink.style.display = "none";
        }
        navbarLinks.style.display = "flex";
    } catch(error) {
        console.error("Error loading identity:", error);
        document.getElementById("navbarLinks").style.display = "none";
    }
}

window.onload = loadIdentity;
