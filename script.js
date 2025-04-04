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
       <div class="col-md-6 col-lg-4 col-sm-12 py-3">
    <div class="card  shadow-sm border-0 rounded-3 hover-shadow" style="transition: all 0.3s ease;">
        <div class="card-body p-4">
            <div class="row g-3">
                <div class="col-7">
                    <h5 class="card-title fw-bold text-primary mb-3">${element.employeeName}</h5>
                    <div class="card-text">
                        <div class="mb-2">
                            <i class="bi bi-envelope text-muted me-2"></i>
                            <span>${element.employeeEmail}</span>
                        </div>
                        <div class="mb-2">
                            <i class="bi bi-geo-alt text-muted me-2"></i>
                            <span>${element.employeeCity}</span>
                        </div>
                    </div>
                </div>
                <!-- QR Code container with larger size -->
                <div class="col-5 d-flex justify-content-center align-items-center">
                    <div id="${cardId}" class="qr-code bg-light rounded p-2" style="width: 150px; height: 150px;"></div>
                </div>
            </div>
            
            <div class="d-flex gap-2 mt-4">
                <button class="btn btn-success btn-sm" 
                        onclick="readInfo('${element.employeeName}', '${element.employeeAge}', '${element.employeeCity}', '${element.employeeEmail}', '${element.employeePhone}', '${element.startDate}')" 
                        data-bs-toggle="modal" data-bs-target="#readData">
                    <i class="bi bi-eye me-1"></i> 
                </button>
                <button class="btn btn-primary btn-sm" 
                        onclick="editInfo(${index}, '${element.employeeName}', '${element.employeeAge}', '${element.employeeCity}', '${element.employeeEmail}', '${element.employeePhone}', '${element.startDate}')" 
                        data-bs-toggle="modal" data-bs-target="#userForm">
                    <i class="bi bi-pencil-square me-1"></i> 
                </button>
                <button class="btn btn-danger btn-sm" onclick="deleteInfo(${index})">
                    <i class="bi bi-trash me-1"></i>
                </button>
                <button class="btn btn-info btn-sm text-white" onclick="downloadCard('${cardId}', ${JSON.stringify(element).replace(/"/g, "'")})">
                    <i class="bi bi-download me-1"></i> Download 
                </button>
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
                    width: 150,
                    height: 150,
                });
            }
        }, 0);
    });


}






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

// Function to show toast notification
function showToast(message, type = 'success') {
    // Create toast container if it doesn't exist
    let toastContainer = document.getElementById('toastContainer');
    if (!toastContainer) {
        toastContainer = document.createElement('div');
        toastContainer.id = 'toastContainer';
        toastContainer.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            z-index: 9999;
        `;
        document.body.appendChild(toastContainer);
    }

    // Create toast element
    const toast = document.createElement('div');
    const toastId = 'toast-' + Date.now();
    toast.id = toastId;

    // Set toast styles based on type
    const backgroundColor = type === 'success' ? '#28a745' : '#dc3545';
    const icon = type === 'success' ?
        '<svg style="width: 24px; height: 24px; fill: white;" viewBox="0 0 24 24"><path d="M21,7L9,19L3.5,13.5L4.91,12.09L9,16.17L19.59,5.59L21,7Z"/></svg>' :
        '<svg style="width: 24px; height: 24px; fill: white;" viewBox="0 0 24 24"><path d="M13,13H11V7H13M13,17H11V15H13M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2Z"/></svg>';

    toast.style.cssText = `
        display: flex;
        align-items: center;
        background-color: ${backgroundColor};
        color: white;
        padding: 16px 20px;
        border-radius: 8px;
        margin-bottom: 10px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        transform: translateX(120%);
        transition: transform 0.3s ease;
        cursor: pointer;
    `;

    toast.innerHTML = `
        <div style="margin-right: 12px;">${icon}</div>
        <div style="flex: 1;">${message}</div>
    `;

    // Add toast to container
    toastContainer.appendChild(toast);

    // Trigger animation
    setTimeout(() => {
        toast.style.transform = 'translateX(0)';
    }, 50);

    // Add click listener to dismiss
    toast.addEventListener('click', () => {
        dismissToast(toast);
    });

    // Auto dismiss after 3 seconds
    setTimeout(() => {
        dismissToast(toast);
    }, 3000);
}

// Function to dismiss toast
function dismissToast(toast) {
    toast.style.transform = 'translateX(120%)';
    setTimeout(() => {
        if (toast.parentElement) {
            toast.parentElement.removeChild(toast);
        }
    }, 300);
}

// Function to download card as image
function downloadCard(cardId, element) {
    // Get the QR code image
    const qrCanvas = document.getElementById(cardId).querySelector('canvas');
    const qrImage = qrCanvas.toDataURL('image/png');

    // Create a temporary container
    const cardContainer = document.createElement('div');
    cardContainer.style.width = '1000px';
    cardContainer.style.padding = '40px';
    cardContainer.style.backgroundColor = 'white';
    cardContainer.style.position = 'fixed';
    cardContainer.style.top = '0';
    cardContainer.style.left = '-9999px';

    // Add content to the container
    cardContainer.innerHTML = `
        <div style="font-family: 'Segoe UI', Arial, sans-serif; background: linear-gradient(to right bottom, #ffffff, #f8f9fa); padding: 30px; border-radius: 15px; box-shadow: 0 10px 30px rgba(0,0,0,0.1);">
            <div style="display: flex; justify-content: space-between; align-items: start; gap: 40px;">
                <div style="flex: 1;">
                    <div style="border-left: 5px solid #0d6efd; padding-left: 15px; margin-bottom: 25px;">
                        <h2 style="color: #0d6efd; margin: 0; font-size: 32px; font-weight: 600;">${element.employeeName}</h2>
                        <p style="color: #6c757d; margin: 5px 0 0 0; font-size: 16px;">Visitor Information Card</p>
                    </div>
                    
                    <div style="background: white; padding: 25px; border-radius: 12px; box-shadow: 0 4px 6px rgba(0,0,0,0.05);">
                        <div style="display: grid; gap: 20px;">
                            <div style="display: flex; align-items: center; gap: 15px;">
                                <div style="width: 36px; height: 36px; background: #e7f1ff; border-radius: 50%; display: flex; align-items: center; justify-content: center;">
                                    <svg style="width: 20px; height: 20px; fill: #0d6efd;" viewBox="0 0 24 24">
                                        <path d="M20 4H4C2.9 4 2 4.9 2 6V18C2 19.1 2.9 20 4 20H20C21.1 20 22 19.1 22 18V6C22 4.9 21.1 4 20 4M20 18H4V8L12 13L20 8V18M20 6L12 11L4 6H20Z"/>
                                    </svg>
                                </div>
                                <div>
                                    <div style="font-size: 14px; color: #6c757d;">Email</div>
                                    <div style="font-size: 16px; color: #2c3e50; font-weight: 500;">${element.employeeEmail}</div>
                                </div>
                            </div>
                            
                            <div style="display: flex; align-items: center; gap: 15px;">
                                <div style="width: 36px; height: 36px; background: #e7f1ff; border-radius: 50%; display: flex; align-items: center; justify-content: center;">
                                    <svg style="width: 20px; height: 20px; fill: #0d6efd;" viewBox="0 0 24 24">
                                        <path d="M12,11.5A2.5,2.5 0 0,1 9.5,9A2.5,2.5 0 0,1 12,6.5A2.5,2.5 0 0,1 14.5,9A2.5,2.5 0 0,1 12,11.5M12,2A7,7 0 0,0 5,9C5,14.25 12,22 12,22C12,22 19,14.25 19,9A7,7 0 0,0 12,2Z"/>
                                    </svg>
                                </div>
                                <div>
                                    <div style="font-size: 14px; color: #6c757d;">City</div>
                                    <div style="font-size: 16px; color: #2c3e50; font-weight: 500;">${element.employeeCity}</div>
                                </div>
                            </div>
                            
                            <div style="display: flex; align-items: center; gap: 15px;">
                                <div style="width: 36px; height: 36px; background: #e7f1ff; border-radius: 50%; display: flex; align-items: center; justify-content: center;">
                                    <svg style="width: 20px; height: 20px; fill: #0d6efd;" viewBox="0 0 24 24">
                                        <path d="M6.62,10.79C8.06,13.62 10.38,15.94 13.21,17.38L15.41,15.18C15.69,14.9 16.08,14.82 16.43,14.93C17.55,15.3 18.75,15.5 20,15.5A1,1 0 0,1 21,16.5V20A1,1 0 0,1 20,21A17,17 0 0,1 3,4A1,1 0 0,1 4,3H7.5A1,1 0 0,1 8.5,4C8.5,5.25 8.7,6.45 9.07,7.57C9.18,7.92 9.1,8.31 8.82,8.59L6.62,10.79Z"/>
                                    </svg>
                                </div>
                                <div>
                                    <div style="font-size: 14px; color: #6c757d;">Phone</div>
                                    <div style="font-size: 16px; color: #2c3e50; font-weight: 500;">${element.employeePhone}</div>
                                </div>
                            </div>
                            
                            <div style="display: flex; align-items: center; gap: 15px;">
                                <div style="width: 36px; height: 36px; background: #e7f1ff; border-radius: 50%; display: flex; align-items: center; justify-content: center;">
                                    <svg style="width: 20px; height: 20px; fill: #0d6efd;" viewBox="0 0 24 24">
                                        <path d="M19,19H5V8H19M16,1V3H8V1H6V3H5C3.89,3 3,3.89 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19V5C21,3.89 20.1,3 19,3H18V1M17,12H12V17H17V12Z"/>
                                    </svg>
                                </div>
                                <div>
                                    <div style="font-size: 14px; color: #6c757d;">Start Date</div>
                                    <div style="font-size: 16px; color: #2c3e50; font-weight: 500;">${element.startDate}</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                
                <div style="display: flex; flex-direction: column; align-items: center; gap: 15px;">
                    <div style="background: white; padding: 20px; border-radius: 12px; box-shadow: 0 4px 6px rgba(0,0,0,0.05);">
                        <img src="${qrImage}" style="width: 200px; height: 200px;"/>
                    </div>
                    <div style="font-size: 14px; color: #6c757d; text-align: center;">Scan QR Code</div>
                </div>
            </div>
            
            <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #e9ecef; text-align: center; color: #6c757d; font-size: 14px;">
                Generated on ${new Date().toLocaleDateString()}
            </div>
        </div>
    `;

    // Add to document temporarily
    document.body.appendChild(cardContainer);

    // Convert to image using html2canvas
    html2canvas(cardContainer, {
        scale: 2,
        useCORS: true,
        backgroundColor: 'white',
        logging: false
    }).then(canvas => {
        // Create download link
        const a = document.createElement('a');
        a.href = canvas.toDataURL('image/png');
        a.download = `${element.employeeName}_card.png`;
        document.body.appendChild(a);
        a.click();

        // Cleanup
        document.body.removeChild(a);
        document.body.removeChild(cardContainer);

        // Show success toast
        showToast('Card downloaded successfully!', 'success');
    }).catch(error => {
        console.error('Error generating image:', error);
        showToast('Failed to generate card image. Please try again.', 'error');
    });
}

