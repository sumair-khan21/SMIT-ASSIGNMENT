let students = [];
let currentUser = null;
let attendanceRecords = JSON.parse(localStorage.getItem('attendanceRecords')) || [];

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



function markAttendance(method){
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
