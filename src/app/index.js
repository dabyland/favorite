function postLogin(form) {
  console.log("username", form.username.value);
  const user = {
    username: form.username.value,
    email: form.email.value,
    password: form.password.value,
  };

  localStorage.setItem("user_profile", JSON.stringify(user));
  window.location.href = "home/home.html";
}

// polyfill for RegExp.escape
if(!RegExp.escape) {
  RegExp.escape = function(s) {
    return String(s).replace(/[\\^$*+?.()|[\]{}]/g, '\\$&');
  };
}
