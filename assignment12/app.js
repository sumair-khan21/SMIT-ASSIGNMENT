const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()";
let password = ""
// let a = Math.floor(chars.length * Math.random())
// console.log(a);



let user = +prompt("Enter a number")
for (let i = 0; i < user; i++) {
    password += chars.charAt(Math.floor(Math.random() * chars.length))
}
document.write(password)
console.log();
