const supabaseUrl = "https://vmcveofukestnfhmkbcr.supabase.co";
const supabaseKey ="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZtY3Zlb2Z1a2VzdG5maG1rYmNyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTM2ODgzNDMsImV4cCI6MjA2OTI2NDM0M30.MJ-cpe6IGG5wAG9lQleKb8jBKkB3CSNYp91L8B4NvfA";

const client = supabase.createClient(supabaseUrl, supabaseKey);



let signupForm = document.getElementById("signupForm");
let feed = document.getElementById('post-feed')
let userName = document.getElementById('userName')

if(signupForm){
    signupForm.addEventListener("submit", async (e) => {
        e.preventDefault();
        let {data, error} = await client.auth.signUp({
            email: document.getElementById("email").value,
            password: document.getElementById("password").value,
            options: {
                emailRedirectTo: "http://localhost:5500/index.html",
                data: {
                    display_name: document.getElementById("username").value,
                }
            }
        })
        if(error){
            alert(error.message);
            return;
        }
        else{
            console.log(data);
            window.location.href = "login.html";
        }

    })
}


let loginForm = document.getElementById("loginForm");
if(loginForm){
    loginForm.addEventListener("submit", async (e) => {
        e.preventDefault();
        let {data, error} = await client.auth.signInWithPassword({
            email: document.getElementById("email").value,
            password: document.getElementById("password").value,
        })
        if(error){
            alert(error.message);
            return;
        }
        else{
            console.log(data);
            window.location.href = "dashboard.html";
        }
    })
}


// create post
let createPostBtn = document.getElementById("createPostBtn");
let postForm = document.getElementById("postForm");
let submitPostBtn = document.getElementById("submitPostBtn");
let postsContainer = document.getElementById("postsContainer");
let logoutBtn = document.getElementById("logoutBtn");


if(createPostBtn){
    createPostBtn.addEventListener("click", () => {
        postForm.classList.remove("hidden");
    })

    submitPostBtn.addEventListener("click", async (e) => {
        e.preventDefault();
        let postTitle = document.getElementById("postTitle").value;
        let postContent = document.getElementById("postContent").value;
        let { data: { session } } = await client.auth.getSession();
        
        console.log(session.user.id);

        const {data, error} = await client.from("PostApp").insert({
            title: postTitle,
            content: postContent,
            user_id: session.user.id,
        })
        if(error){
            alert(error.message);
        }
        else{
            console.log(data);
        }
        
    document.getElementById("postTitle").value = "";
    document.getElementById("postContent").value = "";
    postForm.classList.add("hidden");
    window.location.reload();
    })

}

// logout
if(logoutBtn){
    logoutBtn.addEventListener("click", async () => {
        await client.auth.signOut();
        window.location.href = "index.html";
    })
}



// show
async function show() {
    const { data: { session } } = await client.auth.getSession();
    console.log(session.user.id);

    const { data, error } = await client.from("PostApp").select("*");
    if(error){
        console.log(error);
    }
    else{
        console.log(data);
        data.forEach(element => {
            postsContainer.innerHTML += `
            <div class="post">
                <h3>${element.title}</h3>
                <p>${element.content}</p>
            </div>
            `
            
        });
    }
    
    
}

show();

window.onload = async () =>{
    const { data: { session } } = await client.auth.getSession();
    if(!session){
        let path = window.location.pathname;
        if(path == "/dashboard.html"){
            window.location.href = "index.html";
        }
    }
    else{
        let { data: { user } } = await client.auth.getUser();
        userName.innerHTML = user.user_metadata.display_name;
    }
}

if(feed){
    async function render() {
        const { data, error } = await client.from("PostApp").select("*");
        if(error){
            console.log(error);
        }
        else{
            // console.log(data);
            data.forEach(element => {
                feed.innerHTML += `
                <div class="post">
                    <h3>${element.title}</h3>
                    <p>${element.content}</p>
                </div>
                `
            });
        }
        
    }
    render();
}



