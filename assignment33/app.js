let arrName = []
let arrMark = []

document.getElementById('addMarks').addEventListener('click', function(){
    const stdname = document.getElementById('name').value;
    const stdMarks = document.getElementById('marks').value;

    if(stdname == '' || stdMarks <= 0){
        alert("Enter Valid marks in numbers")
        return;
    }
    let markList = document.getElementById('markList1')
    let markList2 = document.getElementById('markList2')

    let li1 = document.createElement('li')
    li1.innerHTML = `First Name: ${stdname}`
    markList.appendChild(li1)
    let li2 = document.createElement('li')
    li2.innerHTML = `Marks: ${stdMarks}`
    markList2.appendChild(li2)
    arrName.push(stdname)
    arrMark.push(stdMarks)


    let totalStd = arrName.length
    totalStd.innerHTML = `Total Students: ${totalStd}`
})