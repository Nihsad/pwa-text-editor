const butInstall = document.getElementById('buttonInstall');

let deferredPrompt; 
// logic for installing the PWA
// add an event handler to the `beforeinstallprompt` event
window.addEventListener('beforeinstallprompt', (event) => {
    // prevent Chrome 67 and earlier from automatically showing the prompt
    event.preventDefault();
    // stash the event so it can be triggered later.
    deferredPrompt = event;
    // update UI notify the user they can install the PWA
    butInstall.style.display = 'block';
});

// implement a click event handler on the `butInstall` element
butInstall.addEventListener('click', async () => {
    if (deferredPrompt) {
        // show the prompt
        deferredPrompt.prompt();
        // wait for the user to respond to the prompt
        const choiceResult = await deferredPrompt.userChoice;
        if (choiceResult.outcome === 'accepted') {
            console.log('User accepted the A2HS prompt');
        } else {
            console.log('User dismissed the A2HS prompt');
        }
        // reset deferredPrompt variable
        deferredPrompt = null;
        // hide install button
        butInstall.style.display = 'none';
    }
});

// add an handler for the `appinstalled` event
window.addEventListener('appinstalled', (event) => {
    console.log('App was installed', event);
});
