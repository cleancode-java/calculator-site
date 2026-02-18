import { createClient } from "https://esm.sh/@supabase/supabase-js@2.39.7";

const supabase = createClient(
  "MY_SUPABASE_URL",
  "MY_PUBLIC_ANON_KEY"
);

const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");

document.getElementById("loginBtn").addEventListener("click", async () => {

  const { error } = await supabase.auth.signInWithPassword({
    email: emailInput.value,
    password: passwordInput.value
  });

  if (error) {
    alert(error.message);
    return;
  }

  // після логіну редірект
  window.location.href = "/";
});

document.getElementById("signupBtn").addEventListener("click", async () => {

  const { error } = await supabase.auth.signUp({
    email: emailInput.value,
    password: passwordInput.value
  });

  if (error) {
    alert(error.message);
    return;
  }

  alert("Check your email for confirmation!");
});
