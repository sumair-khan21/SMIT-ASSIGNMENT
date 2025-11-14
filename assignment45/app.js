let students = [];
let currentUser = null;
let attendanceRecords = JSON.parse(localStorage.getItem('attendanceRecords')) || [];
let attendanceSystemActive = true;
let teachers = [
  { id: 1, name: 'Dr. John Smith', subject: 'Math', available: true, email: 'john.smith@school.edu' },
  { id: 2, name: 'Prof. Sarah Johnson', subject: 'Physics', available: true, email: 'sarah.johnson@school.edu' },
  { id: 3, name: 'Mr. Mike Davis', subject: 'CS', available: false, email: 'mike.davis@school.edu' }
];



// initail load all functions
window.onload = () => {
  updateDateTime();
  loadStudents();
};

// date time
function updateDateTime() {
  let today = dayjs();
  let currentDateTime = document.getElementById("currentDateTime");
  if (currentDateTime) {
    currentDateTime.textContent = today.format("MMMM DD, YYYY - HH:mm:ss");
  }
}

// fetch student data
function loadStudents() {
  fetch("https://dummyjson.com/users")
    .then((res) => res.json())
    .then((data) => {
        // console.log(data);
        
      students = data.users.map((u) => ({
        id: u.id,
        name: `${u.firstName} ${u.lastName}`,
        email: u.email,
        phone: u.phone,
        // padstart: agr id string 3 se choti hy toh id se phle 0 laga do
        rollNumber: `STU${u.id.toString().padStart(3, "0")}`,
        // id k basis per deparment assign hoga
        department: ["CS", "Math", "Physics", "Chem", "Bio"][u.id % 5],
      }));
      updateAdminStats()
      displayStudents()
    });
}



// student login
document.getElementById("studentLoginForm").addEventListener("submit", function (e) {
    e.preventDefault()
    let id = document.getElementById("studentId").value;
    let foundStudent = null;

    students.forEach((student) => {
      if (student.id == id || student.rollNumber == id) {
        foundStudent = student;
      }
    });

    if (foundStudent) {
      currentUser = { ...foundStudent, role: "student" };
      document.getElementById("authSection").style.display = "none";
      document.getElementById("studentDashboard").style.display = "block";
      document.getElementById(
        "studentWelcome"
      ).textContent = `Welcome, ${foundStudent.name}`;
      Swal.fire({
        title: `Welcome, ${foundStudent.name}`,
        icon: "success",
        draggable: true,
      });
      updateStudentStats()
      generateStudentQRCode()
    } else {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Student not found, roll number 1 - 30",
      });
    }
  });


  function logout(){
    currentUser = null
    location.reload()
  }

function selectAttendanceMethod(method){
  document.querySelectorAll('.option-card').forEach( e => e.classList.remove('active'));
  document.getElementById('rollNumberForm').style.display = 'none';
  document.getElementById('qrCodeSection').style.display = 'none';
  document.getElementById('cameraSection').style.display = 'none';

  event.target.closest('.option-card').classList.add('active');
  if ( method == "rollNumber" ) document.getElementById('rollNumberForm').style.display = 'block';
  if ( method == "qrCode" )   document.getElementById('qrCodeSection').style.display = 'block';
  if ( method == "camera" )   document.getElementById('cameraSection').style.display = 'block';

}


// std mark attendance logic
function markAttendance(method){
  
  if (!attendanceSystemActive)
    return Swal.fire({
        icon: "error",
        title: "Oops...",
        text: `Attendance closed by admin`        
      });;

let today = dayjs().format('YYYY-MM-DD');
if(attendanceRecords.find(r => r.studentId == currentUser.id && r.date == today))
  // return alert("already mark")
  return Swal.fire({
        icon: "error",
        title: "Oops...",
        text: `Already marked today attendance.`        
      });

      attendanceRecords.push({
        studentId: currentUser.id,
        name: currentUser.name,
        rollNumber: currentUser.rollNumber,
        date: today,
        time: dayjs().format('HH:mm:ss'),
        status: 'Present',
        method,
        timestamp: dayjs().toISOString()
      })

      localStorage.setItem('attendanceRecords', JSON.stringify(attendanceRecords));
      updateStudentStats()
      // Swal.fire(`Attendance marked via ${method}`);
      Swal.fire({
  title: `Attendance marked via ${method}`,
  icon: "success"
});
      // alert(`Attendance marked via ${method}`)

}




// roll number se mark karo
function markAttendanceByRoll(){
  let rollNumberInput = document.getElementById('rollNumberInput').value
  // console.log(rollNumberInput);
  if(rollNumberInput == currentUser.rollNumber) markAttendance('Roll Number')
    else{
    Swal.fire({
        icon: "error",
        title: "Oops...",
        text: `Roll number does not match.`
      });
  }
}


// qr code se mark karo
function markAttendanceByQR(){
  markAttendance('QR Code')
}



// QR code generator
function generateStudentQRCode(){
  let qrContainer = document.getElementById('qrCodeContainer');
  qrContainer.innerHTML = '';
  // qr method QRCode.toCanvas(canvasElement, dataToEncode, callback)
  const qr = new QRCode(qrContainer, {
    text: currentUser.rollNumber,
    width: 100,
    height: 100
  })
}

// start camera

function startCamera(){
  let video = document.getElementById('video')
  let canvas = document.getElementById('canvas')
  video.style.display = 'block';
  canvas.style.display = 'none';

  navigator.mediaDevices.getUserMedia({video: true}).then(s =>{
    document.getElementById('video').srcObject = s;
  })
  .catch(e => {
    Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Camera access not available",
      });
  })
}

// Capture Photo

function capturePhoto(){
  let video = document.getElementById('video')
  let canvas = document.getElementById('canvas')
  let ctx = canvas.getContext('2d')

  canvas.height = video.videoHeight
  canvas.width = video.videoWidth
  ctx.drawImage(video, 0, 0, canvas.width, canvas.height)
  
  let tracks = video.srcObject.getTracks();
  tracks.forEach(track => track.stop());

  video.style.display = 'none';
  canvas.style.display = 'block';

  markAttendance('Camera')
  
}

// updated states on student page
function updateStudentStats(){
  let records = [];
  if(currentUser && currentUser.id){
    records = attendanceRecords.filter(r => r.studentId == currentUser.id)
  }
  let total = records.length;
  let present = records.filter(r => r.status == "Present").length;

  document.getElementById('studentTotalDays').textContent = total;
  document.getElementById('studentPresentDays').textContent = present;
  document.getElementById('studentAttendanceRate').textContent = total ? `${Math.round((present/total) * 100)}%` : "0%";
}




// ==================================================================================
// Admin code



// admin login
document.getElementById('adminLoginForm').addEventListener('submit', function(e){
  e.preventDefault();
  let user = document.getElementById('adminUsername').value;
  let pass = document.getElementById('adminPassword').value;
  if(user == "admin" && pass == "admin123"){
    document.getElementById('authSection').style.display = 'none';
    document.getElementById('adminDashboard').style.display = 'block';
    Swal.fire({
        icon: "success",
        title: "Welcome, Admin!",
        draggable: true,
      });
      updateAdminStats()
      displayAttendance()
      displayTeachers()
  }else{
    Swal.fire({
        icon: "error",
        title: "Oops...",
        text: `Invalid admin credentials`
      });

  }
})



// admin tabs
window.switchTab = (e, tab) =>{
document.querySelectorAll('.tab').forEach(e => e.classList.remove('active'))
document.querySelectorAll('.tab-content').forEach(e => e.classList.remove('active'))
e.target.classList.add('active')
document.getElementById(tab +'Tab').classList.add('active');
if(tab == 'attendance'){
displayAttendance()
}else if(tab == 'students'){
displayStudents()
}else if(tab == 'teachers'){
displayTeachers()
}else if(tab == 'overview'){
  updateAdminStats()
}
}

// overview updates tab
function updateAdminStats(){
  let today = dayjs().format('YYYY-MM-DD');
  let todayRecords = attendanceRecords.filter(e => e.date == today);
  let total = students.length;
  document.getElementById('totalStudents').textContent = total;
  document.getElementById('todayPresent').textContent = todayRecords.length;
  document.getElementById('todayAbsent').textContent = total - todayRecords.length;
  document.getElementById('attendanceRate').textContent = total ? `${Math.round((todayRecords.length / total) * 100)}%` : "0%";
}


// display all std attendance tab
function displayAttendance(){
  let tbody = document.getElementById('attendanceTableBody');
  tbody.innerHTML = '';
  attendanceRecords.sort((a,b)=> new Date(b.timestamp) - new Date(a.timestamp)).forEach(r =>{
    tbody.innerHTML  += `
    <tr>
      <td>${r.studentId}</td><td>${r.name}</td><td>${r.rollNumber}</td>
      <td>${dayjs(r.date).format('MMM DD, YYYY')}</td><td>${r.time}</td>
      <td><span class="status-badge status-${r.status.toLowerCase()}">${r.status}</span></td>
      <td>${r.method}</td></tr>
    `
  })

}


// attendance close 
function toggleAttendanceSystem(){
  attendanceSystemActive = !attendanceSystemActive
  document.getElementById('systemStatus').textContent = attendanceSystemActive ? 'Active' : 'Closed'
  document.getElementById('toggleSystemBtn').textContent = attendanceSystemActive ? 'Close Attendance' : 'Open Attendance';
  Swal.fire({
        icon: "success",
        title: `System ${attendanceSystemActive ? 'opened' : 'closed'}`,
        // text: `System ${attendanceSystemActive ? 'opened' : 'closed'}`, 
      });
}


// std tab all std display with attendance
function displayStudents(){
  let tbody = document.getElementById('studentsTableBody')
  tbody.innerHTML = "";
  let today = dayjs().format('YYYY-MM-DD');
  students.forEach(s =>{
    let present = attendanceRecords.find(r => r.studentId == s.id && r.date == today)
    tbody.innerHTML += `
    <tr>
      <td>${s.id}</td><td>${s.name}</td><td>${s.email}</td>
      <td>${s.phone}</td><td>${s.department}</td>
      <td><span class="status-badge status-${present ? 'present' : 'absent'}">${present ? 'Present' : 'Absent'}</span></td></tr>
    `;
  })
}


function displayTeachers(){
  let c = document.getElementById('teachersContainer')
  c.innerHTML = '';
  teachers.forEach(t => {
    c.innerHTML += `
    <div class="teacher-card">
      <div class="teacher-info"><h4>${t.name}</h4>
      <p><strong>Subject:</strong> ${t.subject}</p>
      <p><strong>Email:</strong> ${t.email}</p>
      <p><strong>Status:</strong> ${t.available ? 'Available' : 'Unavailable'}</p></div>
      </div>
    
    `
  })
}