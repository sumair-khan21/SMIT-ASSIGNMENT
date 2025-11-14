// // Get today's date
// let today = Date.today();
// console.log("Today:", today);

// // Add 7 days to current date
// let nextWeek = Date.today().addDays(7);
// console.log("Next Week:", nextWeek);

// // Parse a natural language date
// let parsed = Date.parse("next Friday");
// console.log("Parsed:", parsed);

// // Subtract 1 month
// let lastMonth = Date.today().addMonths(-1);
// console.log("Last Month:", lastMonth);

// // Format
// console.log(today.toString("dddd, MMMM d, yyyy")); // e.g. "Wednesday, June 18, 2025"










// Importing dayjs from a CDN
// import dayjs from "https://unpkg.com/supersimpledev@8.5.0/dayjs/esm/index.js";

// let DateContainer = document.getElementById("dateContainer");
// let today = dayjs();

// let day = today.add(-1, "days");
// let preDay = day.format("ddd");
// let preDate = day.format("DD");

// let currentDay = today.format("ddd");
// let currentDate = today.format("DD");

// let nextDay = today.add(1, "days").format("ddd");
// let nextDate = today.add(1, "days").format("DD");

// let nextDay2 = today.add(2, "days").format("ddd");
// let nextDate2 = today.add(2, "days").format("DD");

// let nextDay3 = today.add(3, "days").format("ddd");
// let nextDate3 = today.add(3, "days").format("DD");

// let nextDay4 = today.add(4, "days").format("ddd");
// let nextDate4 = today.add(4, "days").format("DD");


// export function getDate() {
//     DateContainer.innerHTML += `
//             <div class="date-container">
//             <div class="date-item">
//                 <span class="date-day">${preDay}</span>
//                 <span class="date-number">${preDate}</span>
//             </div>
//             <div class="date-item">
//                 <span class="date-day">${currentDay}</span>
//                 <span class="date-number">${currentDate}</span>
//             </div>
//             <div class="date-item">
//                 <span class="date-day">${nextDay}</span>
//                 <span class="date-number">${nextDate}</span>
//             </div>
//             <div class="date-item">
//                 <span class="date-day">${nextDay2}</span>
//                 <span class="date-number">${nextDate2}</span>
//             </div>
//             <div class="date-item">
//                 <span class="date-day">${nextDay3}</span>
//                 <span class="date-number">${nextDate3}</span>
//             </div>
//             <div class="date-item">
//                 <span class="date-day">${nextDay4}</span>
//                 <span class="date-number">${nextDate4}</span>
//             </div>
//         </div>`;
// }




import dayjs from "https://unpkg.com/supersimpledev@8.5.0/dayjs/esm/index.js";

let DateContainer = document.getElementById("dateContainer");

export function getDate() {
    let html = `<div class="date-strip">`;

    for (let i = -1; i < 2; i++) {
        let date = dayjs().add(i, "day");
        let day = date.format("ddd");
        let num = date.format("D");
        let isToday = i === 0 ? "current-day" : "";

        html += `
            <div class="date-item ${isToday}">
                <span class="date-day">${day}</span>
                <span class="date-number">${num}</span>
            </div>
        `;
    }

    html += `</div>`;
    DateContainer.innerHTML = html;
}



















