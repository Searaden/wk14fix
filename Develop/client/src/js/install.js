const butInstall = document.getElementById('buttonInstall');

let deferredPrompt;

window.addEventListener('beforeinstallprompt', (event) => {
  event.preventDefault();
  deferredPrompt = event;
  butInstall.style.display = 'block'; // Show the install button
});

butInstall.addEventListener('click', async () => {
  if (deferredPrompt) {
    deferredPrompt.prompt();
    const choiceResult = await deferredPrompt.userChoice;
    if (choiceResult.outcome === 'accepted') {
      console.log('User accepted the installation prompt');
    } else {
      console.log('User dismissed the installation prompt');
    }
    deferredPrompt = null;
  }
});

window.addEventListener('appinstalled', (event) => {
  console.log('App installed:', event);
});
