const butInstall = document.getElementById('buttonInstall');

let deferredPrompt;

// Logic for installing the PWA
window.addEventListener('beforeinstallprompt', (event) => {
    // Prevent the default behavior
    event.preventDefault();
    // Stash the event so it can be triggered later
    deferredPrompt = event;
    // Show the install button
    butInstall.style.display = 'block';
  });

  butInstall.addEventListener('click', async () => {
    if (deferredPrompt) {
      // Show the install prompt
      deferredPrompt.prompt();
      // Wait for the user to respond to the prompt
      const choiceResult = await deferredPrompt.userChoice;
      if (choiceResult.outcome === 'accepted') {
        console.log('User accepted the install prompt');
      } else {
        console.log('User dismissed the install prompt');
      }
      // Clear the deferred prompt variable
      deferredPrompt = null;
      // Hide the install button
      butInstall.style.display = 'none';
    }
  });

  window.addEventListener('appinstalled', (event) => {
    console.log('App installed successfully');
  });
