import { System, startSystems } from "./decorators/System";
import { Players } from "@rbxts/services";

@System() // This decorator registers the class as a system
class WalkDetector {
	// This class will be instantiated and its init method called
	init() {
		// This method is called when the system is started
		print("WalkDetector activated");

		Players.PlayerAdded.Connect((player) => {
			// Listen for new players
			player.CharacterAdded.Connect((char) => {
				// Listen for character added
				const hum = char.WaitForChild("Humanoid") as Humanoid;

				if (hum.WalkSpeed > 20) {
					// Check if WalkSpeed is greater than 20
					player.Kick("Speedhack detected");
				}

				hum.GetPropertyChangedSignal("WalkSpeed").Connect(() => {
					print(`WalkSpeed of ${player.Name}: ${hum.WalkSpeed}`);
					if (hum.WalkSpeed > 20) {
						player.Kick("Speedhack detected"); // Kick the player if WalkSpeed is greater than 20
					}
				});
			});
		});
	}
}

startSystems(); // This function starts all registered systems
