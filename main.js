const firstUrl = "https://jsonplaceholder.typicode.com/users";
const secondUser = document.getElementById("secondUser");
const secondUrl = "https://jsonplaceholder.typicode.com/posts";
fetch(firstUrl)
  .then((response) => {
    if (response.ok) {
      return response.json();
    } else {
      throw new Error("Failed to retrieve data");
    }
  })
  .then((data) => {
    const myData = data.filter((data) => data.id < 4);
    for (let i = 0; i < myData.length; i++) {
      const user = myData[i];
      const userData = document.getElementById(`U${i}`);
      userData.textContent = user.name;
    }
    function openModal(elementId) {
      var userInfoElement = document.getElementById("userInfo");
      var modal = document.getElementById("myModal");
      modal.style.display = "block";

      const userId = elementId.slice(1);
      const currentUser = myData[userId];
      const textDisplayed = `<ul>
      <li>Name : ${currentUser.name}</li>
      <li>Email : ${currentUser.email}</li>
      <li>Phone : ${currentUser.phone}</li> 
      <li>Username : ${currentUser.username}</li>
      </ul>
      <button id="open-modal-btn${currentUser.id}" class="postButton">User Posts</button>
      `;
      
      userInfoElement.innerHTML = textDisplayed;
    }

    $(document).ready(function () {
      $("ul").click(function (event) {
        if (event.target.nodeName !== "BUTTON") return;

        openModal(event.target.id);
      });
    });
  })
  .catch((error) => {
    console.error(error);
  });

function closeModal() {
  var modal = document.querySelector(".modal");
  modal.style.display = "none";
}
function closePostModal() {
  var myPostModal = document.getElementById("myPostModal");
  myPostModal.style.display = "none";
}

fetch(secondUrl)
  .then((response) => response.json())
  .then((data) => {
    const myData = data.filter((data) => data.id < 4);
    var myPostModal = document.getElementById("myPostModal");
    // When the user clicks the button, open the modal
    function openPostModal(elementId) {
      const userId = elementId.charAt(elementId.length - 1);
      const userPostId = +userId - 1
      var userInfoElement = document.getElementById("userPosts");
      myPostModal.style.display = "block";
      const currentUser = myData[userPostId];
      const textDisplayed = `<ul>
      <li>Title : ${currentUser.title}</li>
      <li>Post : ${currentUser.body}</li>
      </ul>`;
      userInfoElement.innerHTML = textDisplayed;
    }
    $(document).ready(function() {
      // Attach click event listener to the document and delegate to .postButton elements
      $(document).on('click', '.postButton', function(event) {
        // Check if the event target is a button
        if (event.target.nodeName !== "BUTTON") return;
        
        // Call the openPostModal function with the ID of the clicked button
        openPostModal(event.target.id);
      });
    });
    window.onclick = function (event) {
      if (event.target == myPostModal) {
        myPostModal.style.display = "none";
      }
    };
  })
  .catch((error) => {
    console.error(error);
  });
