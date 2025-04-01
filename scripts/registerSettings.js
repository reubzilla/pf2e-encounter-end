Hooks.once("init", () => {
    game.settings.register("pf2e-encounter-end", "warningType", {
        name: "Warning Type",
        hint: "Choose how you want to be warned when a PC has the Dying or Persistent Damage condition.",
        scope: "world", // Affects all users, only editable by the GM
        config: true,
        type: String,
        choices: {
            "popup": "Popup Window",
            "notification": "UI Notification"
        },
        default: "popup", // Default is the popup window
        onChange: value => console.log(`PF2e Encounter End: Warning Type changed to ${value}`)
    });
});
