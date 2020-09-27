 // Your web app's Firebase configuration
  
  const firebaseConfig = {
  apiKey: "AIzaSyC0aMy-1xTYc_C-UdFtSSXTlNQdjEDSjno",
  authDomain: "repo-bd27d.firebaseapp.com",
  databaseURL: "https://repo-bd27d.firebaseio.com",
  projectId: "repo-bd27d",
  storageBucket: "repo-bd27d.appspot.com",
  messagingSenderId: "957838574349",
  appId: "1:957838574349:web:963edf98e24e378d016644",
  measurementId: "G-XDQ30S1NFG"
};
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  firebase.analytics();


const dbRef = firebase.database().ref();

const usersRef = dbRef.child('users');
const userListUI = document.getElementById("userList");

usersRef.on("child_added", snap => {

	let user = snap.val();

	let $li = document.createElement("li");
	$li.innerHTML = user.name;
	$li.setAttribute("child-key", snap.key);
	$li.addEventListener("click", userClicked)
	userListUI.append($li);
	
	
	// edit icon
 let editIconUI = document.createElement("span");
 editIconUI.class = "edit-user";
 editIconUI.innerHTML = " ✎";
 editIconUI.setAttribute("userid", snap.key);
 editIconUI.addEventListener("click", editButtonClicked)
 // Append after li.innerHTML = value.name
 $li.append(editIconUI);

});


function userClicked(e) {

	var userID = e.target.getAttribute("child-key");

	const userRef = dbRef.child('users/' + userID);
	const userDetailUI = document.getElementById("userDetail");

	userDetailUI.innerHTML = ""

	userRef.on("child_added", snap => {


		var $p = document.createElement("p");
		$p.innerHTML = snap.key  + " - " +  snap.val()
		userDetailUI.append($p);


	});

}

const addUserBtnUI = document.getElementById("add-user-btn");
addUserBtnUI.addEventListener("click", addUserBtnClicked);

function addUserBtnClicked(e) {
	const usersRef = dbRef.child('users');

	
	const addUserInputsUI = document.getElementsByClassName("user-input");
	 let newUser = {};
	 // loop through View to get the data for the model 
for (let i = 0, len = addUserInputsUI.length; i < len; i++) {
let key = addUserInputsUI[i].getAttribute('data-key');
let value = addUserInputsUI[i].value;
newUser[key] = value;
}

usersRef.push(newUser, function(){
   alert("data has been inserted");
 })
}



// --------------------------
// DELETE
// --------------------------
function deleteButtonClicked(e) {

		e.stopPropagation();

		var userID = e.target.getAttribute("userid");

		const userRef = dbRef.child('users/' + userID);
		
		userRef.remove();

}


// --------------------------
// EDIT
// --------------------------
function editButtonClicked(e) {
	
	document.getElementById('edit-user-module').style.display = "block";

	//set user id to the hidden input field
	document.querySelector(".edit-userid").value = e.target.getAttribute("userid");

	const userRef = dbRef.child('users/' + e.target.getAttribute("userid"));

	// set data to the user field
	const editUserInputsUI = document.querySelectorAll(".edit-user-input");

debugger;
	userRef.on("value", snap => {

		for(var i = 0, len = editUserInputsUI.length; i < len; i++) {

			var key = editUserInputsUI[i].getAttribute("data-key");
					editUserInputsUI[i].value = snap.val()[key];
		}

	});




	const saveBtn = document.querySelector("#edit-user-btn");
	saveBtn.addEventListener("click", saveUserBtnClicked)
}


function saveUserBtnClicked(e) {
 
	const userID = document.querySelector(".edit-userid").value;
	const userRef = dbRef.child('users/' + userID);

	var editedUserObject = {}

	const editUserInputsUI = document.querySelectorAll(".edit-user-input");

	editUserInputsUI.forEach(function(textField) {
		let key = textField.getAttribute("data-key");
		let value = textField.value;
  		editedUserObject[textField.getAttribute("data-key")] = textField.value
	});



	userRef.update(editedUserObject);

	document.getElementById('edit-user-module').style.display = "none";


}

