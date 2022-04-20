(function () {
  function load(participants$, conferenceDetails$) {
    console.log('Rename Participant Plugin', 'Loaded');
  }

  function renameParticipant(participant) {
    PEX.pluginAPI
      .openTemplateDialog({
        title: 'Rename Participant',
        body: `<div>
              <input id="NewOverlaytext" class="pex-text-input" placeholder="Type the new overlay text here" autofocus />
              <button class="dialog-button buttons green-action-button" style="margin-top: 40px" id="NewOverlaytextButton">rename</button>
              </div>`,
      })
      .then((dialogRef) => {
        document
          .getElementById('NewOverlaytextButton')
          .addEventListener('click', () =>
            submitChange(
              document.getElementById('NewOverlaytext').value,
              participant.uuid,
              dialogRef
            )
          );

        dialogRef.close$.subscribe(() => {});
      });
  }

  function submitChange(newName, p, ref) {
    var pUrl = '/participants/' + p + '/overlaytext';

    window.PEX.pluginAPI.sendRequest(pUrl, { text: newName });

    console.log(
      'Rename Participant Plugin',
      `submitChange(${newName}, ${p}, ${ref})`
    );

    ref.close();
  }

  function unload() {
    console.log('Rename Participant Plugin', 'Unloaded');
  }

  PEX.pluginAPI.registerPlugin({
    id: 'rename-participant-plugin-1.1',
    load: load,
    unload: unload,
    renameParticipant: renameParticipant,
  });
})();
