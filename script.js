
// DOM Element References
var form = document.getElementById("myForm"),
    userName = document.getElementById("name"),
    age = document.getElementById("age"),
    city = document.getElementById("city"),
    email = document.getElementById("email"),
    phone = document.getElementById("phone"),
    sDate = document.getElementById("sDate"),
    submitBtn = document.querySelector(".submit"),
    userInfo = document.getElementById("data"),
    modal = document.getElementById("userForm"),
    modalTitle = document.querySelector("#userForm .modal-title"),
    newUserBtn = document.querySelector(".newUser");

// Fetch existing data from local storage, or initialize an empty array
let getData = localStorage.getItem('userProfile') ? JSON.parse(localStorage.getItem('userProfile')) : [];

// Variables to track editing state
let isEdit = false, editId;

// Display data in the table on page load
showInfo();


// // Event Listener for "Add New User" button
newUserBtn.addEventListener('click', () => {
    submitBtn.innerText = 'Submit';
    modalTitle.innerText = "Fill the Form";
    isEdit = false;
    form.reset();
});



// display Termporary employee  or Visit ka data card ke form me   dynamically Banta hua 

function showInfo() {
    // Clear existing table rows
    document.querySelectorAll('.employeeDetails').forEach(info => info.remove());

    // Loop through the data and create table rows dynamically
    getData.forEach((element, index) => {
        let cardId = `qrCode-${index}`; // Unique ID for the QR code container
        let createElement = `
       <div class="col-md-6 col-lg-4 col-sm-12 py-4">
    <div class="card h-100">
        <div class="card-body">
            <div class="row align-items-center">
                <div class="col-9 ">
                    <h5 class="card-title">${element.employeeName}</h5>
                    <p class="card-text">
                        <strong>Email:</strong> ${element.employeeEmail} <br>
                        <strong>City:</strong> ${element.employeeCity}
                    </p>
                </div>
                <!-- QR Code container -->
                <div id="${cardId}" class="qr-code col-3 px-xxl-0 text-end" style="width: 100px; height: 100px;"></div>
            </div>
            <div class="d-flex justify-content-between col-8 py-2">
                <button class="btn btn-success" 
                        onclick="readInfo('${element.employeeName}',
                         '${element.employeeAge}', '${element.employeeCity}',
                          '${element.employeeEmail}', '${element.employeePhone}', 
                          '${element.startDate}')" 
                        data-bs-toggle="modal" data-bs-target="#readData">
                    <i class="bi bi-eye"></i>
                </button>
                <button class="btn btn-primary" 
                        onclick="editInfo(${index},  '${element.employeeName}', 
                        '${element.employeeAge}', '${element.employeeCity}',
                        '${element.employeeEmail}', '${element.employeePhone}',  
                        '${element.startDate}')" 
                        data-bs-toggle="modal" data-bs-target="#userForm">
                    <i class="bi bi-pencil-square"></i>
                </button>
                <button class="btn btn-danger" onclick="deleteInfo(${index})">
                    <i class="bi bi-trash"></i>
              
            </div>
        </div>
    </div>
</div>
`;

    //     // Add the new card to the container
        document.getElementById('employeeContainer').innerHTML += createElement;

        setTimeout(() => {
            let qrCodeContainer = document.getElementById(cardId);
            if (!qrCodeContainer.querySelector('canvas')) { // Check if QR code is already generated
                new QRCode(qrCodeContainer, {
                    text: 
                     `Name: ${element.employeeName},
                      Age: ${element.employeeAge},
                      Email: ${element.employeeEmail}, 
                      City: ${element.employeeCity}, 
                      Phone: ${element.employeePhone}, 
                      Start Date: ${element.startDate}`,
                    width:  100,
                    height: 150,
                });
            }
        }, 0);
    });
      

}

//    the adding the function on  future  and wos ka  function ka code or 
{/* <button class="btn btn-warning" onclick="downloadQR('${cardId}', '${element.employeeName}')">
<i class="bi bi-download"></i>
</button> */}
// function downloadQR(cardId, employeeName) {
//     const qrElement = document.getElementById(cardId).querySelector('img'); // Find the QR code image
//     const qrURL = qrElement.src;

//     // Create a canvas to resize the QR code
//     const canvas = document.createElement('canvas');
//     canvas.width = 300; // Set desired width
//     canvas.height = 300; // Set desired height

//     const context = canvas.getContext('2d');
//     const image = new Image();
//     image.src = qrURL;

//     image.onload = () => {
//         // Draw the QR code image onto the canvas
//         context.drawImage(image, 0, 0, canvas.width, canvas.height);

//         // Convert canvas content to a downloadable data URL
//         const resizedQRURL = canvas.toDataURL('image/png');

//         // Create an anchor element for the download
//         const a = document.createElement('a');
//         a.href = resizedQRURL;
//         a.download = `${employeeName}_QRCode.png`; // Set file name
//         a.click(); // Trigger download
//     };
// }




// Function to display user details  for viewing


function readInfo(name, age, city, email, phone, sDate) {
    document.querySelector('#showName').value = name;
    document.querySelector("#showAge").value = age;
    document.querySelector("#showCity").value = city;
    document.querySelector("#showEmail").value = email;
    document.querySelector("#showPhone").value = phone;
    document.querySelector("#showsDate").value = sDate;
}


// Function to populate the form for editing a user's details
function editInfo(index, name, Age, City, Email, Phone, Sdate) {
    isEdit = true;
    editId = index;
    userName.value = name;
    age.value = Age;
    city.value = City;
    email.value = Email;
    phone.value = Phone;
    sDate.value = Sdate;
    submitBtn.innerText = "Update";
    modalTitle.innerText = "Update The Form";
}

// Function to delete a user
function deleteInfo(index) {
    if (confirm("Are you sure want to delete?")) {
        getData.splice(index, 1);
        localStorage.setItem("userProfile", JSON.stringify(getData));
        //  showInfo();  
        location.reload();
    }
}

// Event Listener for form submission
form.addEventListener('submit', (e) => {
    e.preventDefault();

    // Create a new user object with form data
    const information = {

        employeeName: userName.value,
        employeeAge: age.value,
        employeeCity: city.value,
        employeeEmail: email.value,
        employeePhone: phone.value,
        startDate: sDate.value
    };

    if (!isEdit) {
        getData.push(information);
    } else {
        isEdit = false;
        getData[editId] = information;
    }

    localStorage.setItem('userProfile', JSON.stringify(getData));
    submitBtn.innerText = "Submit";
    modalTitle.innerHTML = "Fill The Form";
    // showInfo();   
    location.reload();
    form.reset();
});

