package prod.cli.commands;

import java.util.HashMap;

public class CommandManager {
	
	private HashMap<String, ICommand> commandsMap;
	
	public CommandManager() {
		commandsMap = new HashMap<>();
		commandsMap.put("item", null);
		commandsMap.put("list", null);
	}
	
	public void invokeCommand(String command, String[] args) throws Exception {
		if (!commandsMap.containsKey(command)) {
			throw new Exception("Invalid command: " + command);
		}
	}

}
