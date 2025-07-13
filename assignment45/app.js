//  // Global variables
//         let stream = null;
//         let capturedPhoto = null;
//         let attendanceRecords = JSON.parse(localStorage.getItem('attendanceRecords')) || [];

//         // DOM elements
//         const video = document.getElementById('video');
//         const canvas = document.getElementById('canvas');
//         const photoPreview = document.getElementById('photoPreview');
//         const startCameraBtn = document.getElementById('startCamera');
//         const capturePhotoBtn = document.getElementById('capturePhoto');
//         const retakePhotoBtn = document.getElementById('retakePhoto');
//         const markAttendanceBtn = document.getElementById('markAttendance');
//         const userNameInput = document.getElementById('userName');
//         const userRoleInput = document.getElementById('userRole');
//         const statusMessage = document.getElementById('statusMessage');
//         const attendanceList = document.getElementById('attendanceList');
//         const photoModal = document.getElementById('photoModal');

//         // Initialize app
//         document.addEventListener('DOMContentLoaded', function() {
//             updateStats();
//             updateCurrentTime();
//             displayAttendanceRecords();
//             setInterval(updateCurrentTime, 1000);
//         });

//         // Event listeners
//         startCameraBtn.addEventListener('click', startCamera);
//         capturePhotoBtn.addEventListener('click', capturePhoto);
//         retakePhotoBtn.addEventListener('click', retakePhoto);
//         markAttendanceBtn.addEventListener('click', markAttendance);
//         userNameInput.addEventListener('input', validateForm);
//         userRoleInput.addEventListener('input', validateForm);

//         // Start camera
//         async function startCamera() {
//             try {
//                 stream = await navigator.mediaDevices.getUserMedia({ 
//                     video: { facingMode: 'user' }, 
//                     audio: false 
//                 });
//                 video.srcObject = stream;
//                 video.style.display = 'block';
//                 photoPreview.style.display = 'none';
                
//                 startCameraBtn.disabled = true;
//                 capturePhotoBtn.disabled = false;
//                 retakePhotoBtn.style.display = 'none';
                
//                 showStatus('Camera started successfully!', 'success');
//             } catch (error) {
//                 console.error('Error accessing camera:', error);
//                 showStatus('Error accessing camera. Please check permissions.', 'error');
//             }
//         }

//         // Capture photo
//         function capturePhoto() {
//             if (!stream) return;

//             const context = canvas.getContext('2d');
//             canvas.width = video.videoWidth;
//             canvas.height = video.videoHeight;
            
//             context.drawImage(video, 0, 0);
//             capturedPhoto = canvas.toDataURL('image/jpeg', 0.8);
            
//             // Display captured photo
//             photoPreview.innerHTML = `<img src="${capturedPhoto}" class="captured-photo" alt="Captured Photo">`;
//             photoPreview.style.display = 'block';
//             video.style.display = 'none';
            
//             // Update buttons
//             capturePhotoBtn.disabled = true;
//             retakePhotoBtn.style.display = 'inline-flex';
            
//             // Stop camera stream
//             stopCamera();
            
//             validateForm();
//             showStatus('Photo captured successfully!', 'success');
//         }

//         // Retake photo
//         function retakePhoto() {
//             capturedPhoto = null;
//             photoPreview.style.display = 'none';
//             video.style.display = 'block';
            
//             startCameraBtn.disabled = false;
//             capturePhotoBtn.disabled = true;
//             retakePhotoBtn.style.display = 'none';
//             markAttendanceBtn.disabled = true;
            
//             showStatus('Ready to capture new photo', 'success');
//         }

//         // Stop camera
//         function stopCamera() {
//             if (stream) {
//                 stream.getTracks().forEach(track => track.stop());
//                 stream = null;
//             }
//         }

//         // Validate form
//         function validateForm() {
//             const nameValid = userNameInput.value.trim().length > 0;
//             const roleValid = userRoleInput.value.trim().length > 0;
//             const photoValid = capturedPhoto !== null;
            
//             markAttendanceBtn.disabled = !(nameValid && roleValid && photoValid);
//         }

//         // Mark attendance
//         function markAttendance() {
//             if (!capturedPhoto || !userNameInput.value.trim() || !userRoleInput.value.trim()) {
//                 showStatus('Please fill all fields and capture a photo', 'error');
//                 return;
//             }

//             const now = new Date();
//             const attendanceRecord = {
//                 id: Date.now(),
//                 name: userNameInput.value.trim(),
//                 role: userRoleInput.value.trim(),
//                 photo: capturedPhoto,
//                 timestamp: now.toISOString(),
//                 date: now.toDateString(),
//                 time: now.toLocaleTimeString(),
//                 status: 'Present'
//             };

//             // Check if user already marked attendance today
//             const todayRecords = attendanceRecords.filter(record => 
//                 record.date === now.toDateString() && 
//                 record.name.toLowerCase() === attendanceRecord.name.toLowerCase()
//             );

//             if (todayRecords.length > 0) {
//                 showStatus('You have already marked attendance today!', 'error');
//                 return;
//             }

//             // Save to localStorage (simulating backend)
//             attendanceRecords.push(attendanceRecord);
//             localStorage.setItem('attendanceRecords', JSON.stringify(attendanceRecords));

//             // Reset form
//             resetForm();
            
//             // Update display
//             displayAttendanceRecords();
//             updateStats();
            
//             showStatus('Attendance marked successfully!', 'success');
//         }

//         // Reset form
//         function resetForm() {
//             userNameInput.value = '';
//             userRoleInput.value = '';
//             capturedPhoto = null;
//             photoPreview.style.display = 'none';
//             video.style.display = 'block';
            
//             startCameraBtn.disabled = false;
//             capturePhotoBtn.disabled = true;
//             retakePhotoBtn.style.display = 'none';
//             markAttendanceBtn.disabled = true;
            
//             stopCamera();
//         }

//         // Display attendance records
//         function displayAttendanceRecords() {
//             const today = new Date().toDateString();
//             const todayRecords = attendanceRecords.filter(record => record.date === today);
            
//             if (todayRecords.length === 0) {
//                 attendanceList.innerHTML = `
//                     <div class="empty-state">
//                         <svg viewBox="0 0 24 24">
//                             <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
//                         </svg>
//                         <p>No attendance records for today</p>
//                     </div>
//                 `;
//                 return;
//             }

//             const recordsHTML = todayRecords.map(record => `
//                 <div class="attendance-item">
//                     <div class="attendance-info">
//                         <h4>${record.name}</h4>
//                         <p>${record.role} • ${record.time}</p>
//                     </div>
//                     <div class="attendance-status status-present">Present</div>
//                     <img src="${record.photo}" alt="${record.name}" class="attendance-photo" onclick="openModal('${record.photo}')">
//                 </div>
//             `).join('');

//             attendanceList.innerHTML = recordsHTML;
//         }

//         // Update stats
//         function updateStats() {
//             const today = new Date().toDateString();
//             const todayCount = attendanceRecords.filter(record => record.date === today).length;
//             const totalCount = attendanceRecords.length;
            
//             document.getElementById('todayCount').textContent = todayCount;
//             document.getElementById('totalCount').textContent = totalCount;
//         }

//         // Update current time
//         function updateCurrentTime() {
//             const now = new Date();
//             const timeString = now.toLocaleTimeString('en-US', { 
//                 hour12: false, 
//                 hour: '2-digit', 
//                 minute: '2-digit' 
//             });
//             document.getElementById('currentTime').textContent = timeString;
//         }

//         // Show status message
//         function showStatus(message, type) {
//             statusMessage.innerHTML = `<div class="status-message status-${type}">${message}</div>`;
//             setTimeout(() => {
//                 statusMessage.innerHTML = '';
//             }, 5000);
//         }

//         // Open photo modal
//         function openModal(photoSrc) {
//             document.getElementById('modalImage').src = photoSrc;
//             photoModal.style.display = 'block';
//         }

//         // Close photo modal
//         function closeModal() {
//             photoModal.style.display = 'none';
//         }

//         // Close modal when clicking outside
//         photoModal.addEventListener('click', function(event) {
//             if (event.target === photoModal) {
//                 closeModal();
//             }
//         });

//         // Cleanup on page unload
//         window.addEventListener('beforeunload', function() {
//             stopCamera();
//         });















//   let stream, capturedPhoto;
//   const video = document.getElementById('video');
// const canvas = document.getElementById('canvas');
// const userName = document.getElementById('userName');
// const attendanceList = document.getElementById('attendanceList');
// const todayKey = new Date().toISOString().slice(0,10);

// document.getElementById('startCamera').onclick = async () => {
//   stream = await navigator.mediaDevices.getUserMedia({ video:true });
//   video.srcObject = stream;
//   document.getElementById('capturePhoto').disabled = false;
// };

// document.getElementById('capturePhoto').onclick = () => {
//   canvas.width = video.videoWidth;
//   canvas.height = video.videoHeight;
//   canvas.getContext('2d').drawImage(video,0,0);
//   capturedPhoto = canvas.toDataURL();
  
//   // Show photo & hide video
//   video.style.display = 'none';
//   let img = document.createElement('img');
//   img.src = capturedPhoto; img.width=300; img.id='capturedImg';
//   video.parentNode.appendChild(img);
  
//   // ✅ Enable mark attendance button
//   document.getElementById('markAttendance').disabled = false;
// };

// document.getElementById('markAttendance').onclick = () => {
//   if (!userName.value || !capturedPhoto) return alert('Enter name & capture photo');
//   let list = JSON.parse(localStorage.getItem(todayKey))||[];
//   list.push({name:userName.value, photo:capturedPhoto, time:new Date().toLocaleTimeString()});
//   localStorage.setItem(todayKey, JSON.stringify(list));
  
//   // Reset
//   userName.value=''; capturedPhoto=null;
//   document.getElementById('capturedImg').remove();
//   video.style.display='block';
//   document.getElementById('markAttendance').disabled = true;
//   loadAttendance();
// };

// function loadAttendance(){
//   let list = JSON.parse(localStorage.getItem(todayKey))||[];
//   if(list.length===0){
//     attendanceList.innerHTML = `
//       <div class="empty-state">
//         <svg viewBox="0 0 24 24">
//           <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
//         </svg>
//         <p>No attendance records for today</p>
//       </div>
//     `;
//   } else {
//     attendanceList.innerHTML = list.map(r=>`
//       <div class="attendance-item">
//         <div class="attendance-info">
//           <h4>${r.name}</h4>
//           <p>${r.time}</p>
//         </div>
//         <div class="attendance-status status-present">Present</div>
//         <img src="${r.photo}" alt="${r.name}" class="attendance-photo">
//       </div>
//     `).join('');
//   }
// }














document.addEventListener('DOMContentLoaded', function(){

const apiUrl = "https://dummyjson.com/users";
const todayKey = new Date().toISOString().slice(0,10);
const rollInput = document.getElementById('rollNo');
const attendanceList = document.getElementById('attendanceList');
const todayCount = document.getElementById('todayCount');
const totalCount = document.getElementById('totalCount');

document.getElementById('markAttendance').onclick = markAttendance;
document.getElementById('startQR').onclick = startQRScanner;

async function markAttendance(){
  const rollNo = rollInput.value.trim();
  if (!rollNo) return alert("Enter Roll No / Scan QR");

  try {
    const res = await fetch(`${apiUrl}/${rollNo}`);
    if (!res.ok) return alert("User not found!");
    const user = await res.json();

    let list = JSON.parse(localStorage.getItem(todayKey))||[];
    list.push({
      id: user.id, name: user.firstName + ' ' + user.lastName,
      email: user.email, image: user.image,
      time: new Date().toLocaleTimeString()
    });
    localStorage.setItem(todayKey, JSON.stringify(list));

    rollInput.value='';
    loadAttendance();
    updateStats();
    alert("Attendance marked!");

  } catch(err){
    alert("Error fetching user!");
  }
}

function loadAttendance(){
  let list = JSON.parse(localStorage.getItem(todayKey))||[];
  if(list.length===0){
   attendanceList.innerHTML=`
  <div class="empty-state">
    <svg viewBox="0 0 24 24">
      <path d="M12 2C6.48 2 2 6.48 2 12
        s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15
        l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
    </svg>
    <p>No attendance records for today</p>
  </div>`;

  } else {
    attendanceList.innerHTML = list.map(r=>`
      <div class="attendance-item">
        <div class="attendance-info">
          <h4>${r.name}</h4><p>${r.email}</p><p>${r.time}</p>
        </div>
        <div class="attendance-status status-present">Present</div>
        <img src="${r.image}" class="attendance-photo">
      </div>`).join('');
  }
}

function updateStats(){
  let list= JSON.parse(localStorage.getItem(todayKey))||[];
  todayCount.textContent = list.length;
  // Total records: sum of all dates in localStorage
  let total=0;
  for (let k in localStorage){
    if (localStorage.getItem(k)){
      try{
        total += JSON.parse(localStorage.getItem(k)).length||0;
      }catch{}
    }
  }
  totalCount.textContent=total;
}

// QR SCANNER
function startQRScanner(){
  const qr = new Html5Qrcode("qrReader");
  qr.start({ facingMode: "environment" }, 
    { fps:10, qrbox:250 },
    qrCodeMessage => {
      rollInput.value=qrCodeMessage;
      qr.stop(); // stop scanner after first scan
      alert("QR Scanned! Roll No set: "+qrCodeMessage);
    },
    err => { console.log(err); }
  ).catch(err=>alert("Camera error: "+err));
}

// Clock update
setInterval(()=>{
  document.getElementById('currentTime').textContent = new Date().toLocaleTimeString();
},1000);

// on page load
loadAttendance(); updateStats();

}); // DOMContentLoaded end
