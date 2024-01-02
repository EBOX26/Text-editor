const installButton = document.getElementById("buttonInstall");

// Logic for installing the PWA
const handleBeforeInstallPrompt = (event) => {
  window.deferredPrompt = event;
  installButton.classList.remove("hidden");
};

const handleInstallButtonClick = async () => {
  const promptEvent = window.deferredPrompt;

  if (!promptEvent) {
    return;
  }

  // Show the install prompt
  const userChoice = await promptEvent.prompt();

  // Reset the deferred prompt variable, it can only be used once.
  window.deferredPrompt = null;

  if (userChoice.outcome === 'accepted') {
    console.log('User accepted the install prompt');
    installButton.classList.add("hidden");
  } else {
    console.log('User dismissed the install prompt');
  }
};

const handleAppInstalled = () => {
  // Clear prompt
  window.deferredPrompt = null;
};

// Event listeners
window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
installButton.addEventListener("click", handleInstallButtonClick);
window.addEventListener("appinstalled", handleAppInstalled);
