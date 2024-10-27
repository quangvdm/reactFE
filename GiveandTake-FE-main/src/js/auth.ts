"use client";

//currrently token is UTC date string

let activated = false;

export const isTokenExpired = (token: string) => {
  const decodedToken = JSON.parse(atob(token.split(".")[1]));
  let expirer = new Date(decodedToken.exp * 1000);
  let now = new Date();
  if (expirer <= now) {
    console.log("token expired");
    localStorage.removeItem("token");
    window.location.href = "/auth/signin";
  } else {
    console.log(
      "token will expire at: ",
      expirer.toLocaleTimeString(),
      "in seconds: ",
      (expirer.getTime() - now.getTime()) / 1000,
    );
    setTimeout(() => {
      tokenExpired();
    }, expirer.getTime() - now.getTime());
  }
};

function tokenExpired() {
  if (activated) return;
  activated = true;

  localStorage.removeItem("token");
  alert("Your session has expired. Please sign in again.");
  window.location.href = "/auth/signin";
}
