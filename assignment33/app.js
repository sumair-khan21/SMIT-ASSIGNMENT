// let arrName = []
// let arrMark = []

// document.getElementById('addMarks').addEventListener('click', function(){
//     const stdname = document.getElementById('name').value;
//     const stdMarks = document.getElementById('marks').value;

//     if(stdname == '' || stdMarks <= 0){
//         alert("Enter Valid marks in numbers")
//         return;
//     }
//     let markList = document.getElementById('markList1')
//     let markList2 = document.getElementById('markList2')

//     let li1 = document.createElement('li')
//     li1.innerHTML = `First Name: ${stdname}`
//     markList.appendChild(li1)
//     let li2 = document.createElement('li')
//     li2.innerHTML = `Marks: ${stdMarks}`
//     markList2.appendChild(li2)
//     arrName.push(stdname)
//     arrMark.push(stdMarks)


//     let totalStd = arrName.length
//     totalStd.innerHTML = `Total Students: ${totalStd}`
// })








// =========================================================


function modelOpen(){
    document.getElementById('studentModel').style.display = "block";
}

function closeModel(){
    document.getElementById('studentModel').style.display = "none";
}

window.onclick = function (event) {
    const modal = document.getElementById('studentModel');
    if(event.target == modal){
        modal.style.display = "none";
    }
}

function submitForm(){
    const studentArr = [];
    const markArr = [];
    
    const tableBody = document.querySelector('#studentTable tbody')
    const studentName = document.getElementById('studentName').value;
    const EnglishMark = +document.getElementById('EnglishMark').value;
    const MathMark = +document.getElementById('MathMark').value;
    const ScienceMark = +document.getElementById('ScienceMark').value;
    const UrduMark = +document.getElementById('UrduMark').value;
    const ComputerMark = +document.getElementById('ComputerMark').value;

    const obtainedMarks = EnglishMark + MathMark + ScienceMark + UrduMark + ComputerMark;
    const percentage = ((obtainedMarks / 500) * 100).toFixed(2);
    // console.log("Obtained Marks",obtainedMarks);
    // console.log("Percentage",percentage)
    
    studentArr.push(studentName)
    markArr.push(EnglishMark + MathMark + ScienceMark + UrduMark + ComputerMark)

    if(EnglishMark < 0 || EnglishMark > 100 || MathMark < 0 || MathMark > 100 || ScienceMark < 0 || ScienceMark > 100 || UrduMark < 0 || UrduMark > 100 || ComputerMark < 0 || ComputerMark > 100){
        alert("Number must be between 0 - 100")
        return;
    }

   if(isNaN(studentName) == ""){
    alert("invalid Student Name")
    return;
   }

   if(!EnglishMark || !MathMark || !ScienceMark || !UrduMark || !ComputerMark){
    alert("must fill all input fields")
    return;
   }
  
let grade;
if(percentage >= 90){
    // console.log("Your Grade is A+");
    grade = "A+"
}else if(percentage >= 80){
    // console.log("Your Grade is A");
    grade = "A"
}else if(percentage >= 70){
    // console.log("Your Grade is B");
    grade = "B"
}else if(percentage >= 60){
    // console.log("Your Grade is c");
    grade = "C"
}else if(percentage >= 50){
    // console.log("Your Grade is D");
    grade = "D"
}else{
    // console.log("Failed");
    grade = "Failed"   
}

const row = `
     <tr>
        <td>${studentName}</td>
        <td>${EnglishMark}</td>
        <td>${MathMark}</td>
        <td>${ScienceMark}</td>
        <td>${UrduMark}</td>
        <td>${ComputerMark}</td>
        <td>${percentage}</td>
        <td>${grade}</td>
     </tr>
`;

 tableBody.innerHTML += row;
 document.getElementById('studentName').value = ""; 
 document.getElementById('EnglishMark').value = ""; 
 document.getElementById('MathMark').value = ""; 
 document.getElementById('ScienceMark').value = ""; 
 document.getElementById('UrduMark').value = ""; 
 document.getElementById('ComputerMark').value = ""; 
 
 closeModel()
}