function signUp(form) {
  const user = {
    username: form.username.value,
    email: form.email.value,
    password: form.password.value,
  };

  localStorage.setItem("user_profile", JSON.stringify(user));

  return authenticateUser(form);
}

function authenticateUser(form) {
  const userProfile = JSON.parse(localStorage.getItem("user_profile"));
  
  if (userProfile !== null) {
    const usernameMatches = userProfile.username === form.username.value;
    const passwordMatches = userProfile.password === form.password.value;
  
    if (usernameMatches && passwordMatches) {
      alert(`Welcome ${userProfile.username}!`);
      window.location.href = "home/home.html";
    } else if (usernameMatches && !passwordMatches) {
      alert("The password entered is incorrect");
    } else if (!usernameMatches && passwordMatches) {
      alert("The username entered is incorrect");
    } else {
      alert("The information entered does not match any profile. Please try again");
    }
  }
  alert("We cannot find an account matching the entered information. Please try signing up before logging in.")
  return false;
}

// polyfill for RegExp.escape
if(!RegExp.escape) {
  RegExp.escape = function(s) {
    return String(s).replace(/[\\^$*+?.()|[\]{}]/g, '\\$&');
  };
}
