START
  ↓
Load Data from `localStorage` (if available)
  ↓
Initialize Variables and DOM Element References
  ↓
Run `showInfo()` Function
  ↓
  ┌──────────────────────────────────────────────────────────────┐
  │   `showInfo()` Function                                      │
  │   - Clear existing content                                  │
  │   - Loop through `getData` array:                           │
  │       - Create HTML dynamically for each user               │
  │       - Add QR Code for each user using `QRCode` library    │
  └──────────────────────────────────────────────────────────────┘
  ↓
Add Event Listeners:
  - "Add New User" Button: Reset Form, Update Modal Title
  - Form Submit
      ┌──────────────────────────────────────────────────────────────────────────────┐
      │   `form.submit` Event Listener                                              │
      │   - Prevent Default Behavior                                                │
      │   - Create `information` Object from Form Input                             │
      │   - IF `isEdit` is `true`:                                                  │
      │         Update Existing User in `getData`                                   │
      │   - ELSE:                                                                   │
      │         Push New User to `getData` Array                                    │
      │   - Save `getData` Array to `localStorage`                                  │
      │   - Reset Form, Update Modal Title, Reload Page                             │
      └──────────────────────────────────────────────────────────────────────────────┘
  ↓
Button Functionalities:
  ┌──────────────────────────────────────────────────────────────────────────────┐
  │ "View" Button: Call `readInfo()` to Show User Details in Modal               │
  │ "Edit" Button: Call `editInfo()` to Populate Form for Editing                │
  │ "Delete" Button: Call `deleteInfo()` to Remove User from `getData`           │
  │ "Download QR" Button: Use `downloadQR()` to Generate and Save QR Code        │
  └──────────────────────────────────────────────────────────────────────────────┘
  ↓
User Interactions:
  - Add User
  - Edit User
  - Delete User
  - Download QR Code
  - View Details
  ↓
Page Reload to Reflect Changes
  ↓
END
