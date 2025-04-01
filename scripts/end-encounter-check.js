Hooks.on("preDeleteCombat", (combat, data, options) => {
    // Only proceed if the user ending combat is the GM
    if (!game.user.isGM) return;

    // Get all player-controlled characters in combat
    const playerActors = combat.combatants
        .map(c => c.actor)
        .filter(actor => actor && actor.hasPlayerOwner);

    // Check if any PCs have the Dying Condition or Persistent Damage
    const hasDangerousCondition = playerActors.some(actor => 
        actor.itemTypes.condition.some(cond => 
            cond.slug === "dying" || cond.slug.includes("persistent-damage")
        )
    );

    if (hasDangerousCondition) {
        // Get the selected warning type from module settings
        const warningType = game.settings.get("pf2e-encounter-end", "warningType");

        if (warningType === "popup") {
            // Show a popup warning
            new Dialog({
                title: "Encounter End Warning",
                content: `<p>Some PCs have the <strong>Dying</strong> condition or <strong>Persistent Damage</strong>!<br>
                          You should resolve these conditions before ending the encounter.</p>`,
                buttons: {
                    ok: {
                        label: "OK",
                        callback: () => {}
                    }
                },
                default: "ok"
            }).render(true);
        } else {
            // Show a UI notification
            ui.notifications.warn("Warning: Some PCs have the Dying condition or Persistent Damage!");
        }

        // **Prevent the combat from being deleted**
        return false; // Stops the encounter from ending
    }

    // Otherwise, allow the encounter to end normally
    ui.notifications.info("Encounter ended successfully.");
});
