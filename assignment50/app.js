const supabaseUrl = "https://vmcveofukestnfhmkbcr.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZtY3Zlb2Z1a2VzdG5maG1rYmNyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTM2ODgzNDMsImV4cCI6MjA2OTI2NDM0M30.MJ-cpe6IGG5wAG9lQleKb8jBKkB3CSNYp91L8B4NvfA";
const client = supabase.createClient(supabaseUrl, supabaseKey);

// =============================== Signup Handler =============================================

let signupForm = document.getElementById("signupForm");
if (signupForm) {
  const signUpBtn = signupForm.querySelector("button[type='submit']");
  const btnText = signUpBtn.querySelector(".btn-text");
  const loader = signUpBtn.querySelector(".loader");

  signupForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    btnText.classList.add("hidden");
    loader.classList.remove("hidden");
    signUpBtn.disabled = true;

    const username = document.getElementById("userName").value.trim();
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value.trim();
    const profileImage = document.getElementById("profileImage").files[0];

    if (!username || !email || !password || !profileImage) {
      alert("All fields are required.");
      btnText.classList.remove("hidden");
      loader.classList.add("hidden");
      signUpBtn.disabled = false;
      return;
    }

    let { data, error } = await client.auth.signUp({
      email,
      password,
    });
    if (error) {
      alert(error.message);
      btnText.classList.remove("hidden");
      loader.classList.add("hidden");
      signUpBtn.disabled = false;
      return;
    }

    let userId = data.user.id;
    let fileExt = profileImage.name.split(".").pop();
    let filePath = `${userId}.${fileExt}`;
    let { error: uploadError } = await client.storage
      .from("profile_images")
      .upload(filePath, profileImage, { upsert: true });

    if (uploadError) {
      alert(uploadError.message);
      btnText.classList.remove("hidden");
      loader.classList.add("hidden");
      signUpBtn.disabled = false;
      return;
    }

    let { data: publicUrlData } = client.storage
      .from("profile_images")
      .getPublicUrl(filePath);

    let avatarUrl = publicUrlData.publicUrl;

    let { error: profileError } = await client
      .from("postapp_profiles")
      .insert([{ id: userId, username: username, avatar_url: avatarUrl }]);

    if (profileError) {
      alert(profileError.message);
      btnText.classList.remove("hidden");
      loader.classList.add("hidden");
      signUpBtn.disabled = false;
      return;
    }

    alert("Signup successful!");
    setTimeout(() => {
      window.location.href = "login.html";
    }, 1200);

    document.getElementById("userName").value = "";
    document.getElementById("email").value = "";
    document.getElementById("password").value = "";
    document.getElementById("profileImage").value = "";
  });
}

// ===================================== Login Handler ====================================

let loginForm = document.getElementById("loginForm");
if (loginForm) {
  const loginBtn = loginForm.querySelector("button[type='submit']");
  const btnText = loginBtn.querySelector(".btn-text");
  const loader = loginBtn.querySelector(".loader");

  loginForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    btnText.classList.add("hidden");
    loader.classList.remove("hidden");
    loginBtn.disabled = true;

    let { data, error } = await client.auth.signInWithPassword({
      email: document.getElementById("email").value,
      password: document.getElementById("password").value,
    });

    if (error) {
      alert(error.message);
      btnText.classList.remove("hidden");
      loader.classList.add("hidden");
      loginBtn.disabled = false;
      return;
    }

    setTimeout(() => {
      window.location.href = "dashboard.html";
    }, 1200);
  });
}

// ================================= Create Post Handler ================================

let createPostBtn = document.getElementById("createPostBtn");
let postForm = document.getElementById("postForm");
let submitPostBtn = document.getElementById("submitPostBtn");
let postsContainer = document.getElementById("postsContainer");
let logoutBtn = document.getElementById("logoutBtn");

if (createPostBtn) {
  createPostBtn.addEventListener("click", () => {
    postForm.classList.remove("hidden");
  });

  submitPostBtn.addEventListener("click", async (e) => {
    e.preventDefault();

    const btnText = submitPostBtn.querySelector(".btn-text");
    const loader = submitPostBtn.querySelector(".loader");
    btnText.classList.add("hidden");
    loader.classList.remove("hidden");
    submitPostBtn.disabled = true;

    const postTitle = document.getElementById("postTitle").value.trim();
    const postContent = document.getElementById("postContent").value.trim();
    const postImage = document.getElementById("postImage").files[0];

    if (!postTitle || !postContent || !postImage) {
      alert("All Fields are required.");
      btnText.classList.remove("hidden");
      loader.classList.add("hidden");
      submitPostBtn.disabled = false;
      return;
    }

    const {
      data: { session },
    } = await client.auth.getSession();
    const userId = session?.user?.id;
    if (!userId) {
      alert("User not logged in");
      btnText.classList.remove("hidden");
      loader.classList.add("hidden");
      submitPostBtn.disabled = false;
      return;
    }

    try {
      const { data: userData, error: profileErr } = await Promise.race([
        client
          .from("postapp_profiles")
          .select("username, avatar_url")
          .eq("id", userId)
          .maybeSingle(),
        new Promise((_, reject) =>
          setTimeout(() => reject(new Error("Profile fetch timeout")), 10000)
        ),
      ]);

      if (profileErr) {
        console.error("Profile fetch error:", profileErr.message);
        alert("Something went wrong");
        btnText.classList.remove("hidden");
        loader.classList.add("hidden");
        submitPostBtn.disabled = false;
        return;
      }

      let postImageUrl = null;
      if (postImage) {
        // Show loader during image upload
        const fileName = `${userId}-${Date.now()}-${postImage.name}`;
        await new Promise((resolve) => setTimeout(resolve, 0)); 
        const { error: imgError } = await Promise.race([
          client.storage.from("post-images").upload(fileName, postImage),
          new Promise((_, reject) =>
            setTimeout(() => reject(new Error("Image upload timeout")), 10000)
          ),
        ]);

        if (imgError) {
          console.error("Image upload error:", imgError.message);
          alert("Image upload failed: " + imgError.message);
          btnText.classList.remove("hidden");
          loader.classList.add("hidden");
          submitPostBtn.disabled = false;
          return;
        }

        const { data: pub } = client.storage
          .from("post-images")
          .getPublicUrl(fileName);
        postImageUrl = pub.publicUrl;
      }

      const { data, error } = await Promise.race([
        client.from("newPostApp").insert({
          title: postTitle,
          content: postContent,
          user_id: userId,
          image_url: postImageUrl,
          user_name: userData?.username || null,
          user_image_url: userData?.avatar_url || null,
        }),
        new Promise((_, reject) =>
          setTimeout(() => reject(new Error("Post insertion timeout")), 10000)
        ),
      ]);

      if (error) {
        console.error("Insert error:", error.message);
        alert("Something went wrong: " + error.message);
        btnText.classList.remove("hidden");
        loader.classList.add("hidden");
        submitPostBtn.disabled = false;
        return;
      }

      alert("Post Created Successfully!");
      document.getElementById("postTitle").value = "";
      document.getElementById("postContent").value = "";
      document.getElementById("postImage").value = "";
      postForm.classList.add("hidden");
      setTimeout(() => {
        window.location.reload();
      }, 1200);
    } catch (err) {
      console.error("Operation failed:", err.message);
      alert("Operation failed: " + err.message);
      btnText.classList.remove("hidden");
      loader.classList.add("hidden");
      submitPostBtn.disabled = false;
    }
  });
}

// ==================================== Logout Handler =========================================

if (logoutBtn) {
  const btnText = logoutBtn.querySelector(".btn-text");
  const loader = logoutBtn.querySelector(".loader");

  logoutBtn.addEventListener("click", async () => {
    btnText.classList.add("hidden");
    loader.classList.remove("hidden");

    const { error } = await client.auth.signOut();
    if (error) {
      console.log("error", error);
    }
    setTimeout(() => {
      window.location.href = "index.html";
    }, 1000);
  });
}

// ===================================== Load All Post  ====================================


let homePostsContainer = document.getElementById("homePostsContainer");

async function loadAllPosts() {
  const { data: posts, error } = await client
    .from("newPostApp")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error fetching posts:", error.message);
    return;
  }

  console.log(posts);
  

  homePostsContainer.innerHTML = "";

  if (!posts || posts.length === 0) {
    homePostsContainer.innerHTML = "<p>No posts yet.</p>";
    return;
  }

  posts.forEach((post) => {
    homePostsContainer.innerHTML += `
      <div class="post-card">
        <div class="post-header">
          <img src="${post.user_image_url || "default-avatar.png"}" class="profile-pic">
          <span class="username">${post.user_name || "Anonymous"}</span>
        </div>
        ${
          post.image_url
            ? `<img src="${post.image_url}" alt="Post Image" class="post-img">`
            : ""
        }
        <div class="post-content">
          <h3 class="post-title">${post.title}</h3>
          <p class="post-text">${post.content}</p>
        </div>
      </div>
    `;
  });
}

if (homePostsContainer) {
  loadAllPosts();
}



// ===================================== Show Posts Handler ====================================

async function show() {
  const {
    data: { session },
  } = await client.auth.getSession();
  if (!session) {
    window.location.href = "index.html";
    return;
  }

  const userId = session.user.id;
  const { data: posts, error } = await client
    .from("newPostApp")
    .select("*")
    .eq("user_id", userId)
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Post fetch error:", error.message);
    alert("Failed to load posts.");
    return;
  }

  postsContainer.innerHTML = "";
  if (posts.length === 0) {
    document.getElementById("emptyState").style.display = "block";
  } else {
    document.getElementById("emptyState").style.display = "none";
    posts.forEach(async (element) => {
      const { data: likes, error: likeError } = await client
        .from("likes")
        .select("id")
        .eq("post_id", element.id)
        .eq("user_id", userId);

      const isLiked = likes && likes.length > 0;
      const { data: likeCountData } = await client
        .from("likes")
        .select("id")
        .eq("post_id", element.id);

      postsContainer.innerHTML += `
        <div class="post-card">
          <div class="post-header">
            <div class="user-info">
              <img src="${
                element.user_image_url || "default-avatar.jpg"
              }" class="user-avatar"/>
              <span class="user-name">${element.user_name || "Anonymous"}</span>
            </div>
            <div>
              <button class="edit-btn" data-id="${element.id}">✏️</button>
              <button class="delete-btn" data-id="${element.id}" data-image="${
        element.image_url || ""
      }">✖</button>
            </div>
          </div>
          ${
            element.image_url
              ? `<img src="${element.image_url}" alt="${element.title}" class="post-img"/>`
              : ""
          }
          <div class="post-body">
            <h3 class="post-title">${element.title}</h3>
            <p class="post-content">${element.content}</p>
            <div>
              <button class="like-btn ${isLiked ? "liked" : ""}" data-id="${
        element.id
      }">${isLiked ? "❤️" : "♡"}</button>
              <span class="like-count">${
                likeCountData ? likeCountData.length : 0
              } likes</span>
            </div>
          </div>
        </div>
      `;
    });
  }

  setTimeout(() => {
    document.querySelectorAll(".delete-btn").forEach((btn) => {
      btn.addEventListener("click", async () => {
        const postId = btn.getAttribute("data-id");
        const imageUrl = btn.getAttribute("data-image");

        if (confirm("Are you sure you want to delete this post?")) {
          const { error: likeDeleteError } = await client
            .from("likes")
            .delete()
            .eq("post_id", postId);

          if (likeDeleteError) {
            console.error("Like delete error:", likeDeleteError.message);
            alert("Failed to delete likes.");
            return;
          }

          const { error: postDeleteError } = await client
            .from("newPostApp")
            .delete()
            .eq("id", postId);

          if (postDeleteError) {
            console.error("Post delete error:", postDeleteError.message);
            alert("Failed to delete post.");
            return;
          }

          if (imageUrl) {
            const fileName = imageUrl.split("/").pop();
            const { error: imageDeleteError } = await client.storage
              .from("post-images")
              .remove([fileName]);

            if (imageDeleteError) {
              console.error("Image delete error:", imageDeleteError.message);
              alert("Failed to delete post image.");
              return;
            }
          }

          alert("Post deleted successfully!");
          window.location.reload();
        }
      });
    });

    document.querySelectorAll(".like-btn").forEach((btn) => {
      btn.addEventListener("click", async () => {
        const postId = btn.getAttribute("data-id");
        const isLiked = btn.classList.contains("liked");

        if (isLiked) {
          const { error } = await client
            .from("likes")
            .delete()
            .eq("post_id", postId)
            .eq("user_id", userId);

          if (error) {
            console.error("Unlike error:", error.message);
            alert("Failed to unlike post.");
            return;
          }
        } else {
          const { error } = await client
            .from("likes")
            .insert({ post_id: postId, user_id: userId });

          if (error) {
            console.error("Like error:", error.message);
            alert("Failed to like post.");
            return;
          }
        }

        window.location.reload();
      });
    });
  }, 0);
}

if (postsContainer) {
  show();
}

// ============================ Window Onload Handler =======================================

window.onload = async () => {
  const {
    data: { session },
  } = await client.auth.getSession();
  if (!session) {
    let path = window.location.pathname;
    if (path.includes("dashboard.html")) {
      window.location.href = "index.html";
    }
    return;
  }

  const { data: userData, error } = await client
    .from("postapp_profiles")
    .select("username")
    .eq("id", session.user.id)
    .maybeSingle();

  if (error) {
    console.error("Profile fetch error:", error.message);
  }

  const userNameElement = document.getElementById("userName");
  if (userNameElement) {
    userNameElement.innerHTML = userData?.username || "User";
  }
};
