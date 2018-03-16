package prod.cli.main;

import prod.cli.commands.CommandManager;

public class Main {

	public static void main(String[] args) {
		if (args.length == 0) {
			System.out.println("No command chosen");
			return;
		}
		
		System.out.println("Invoking command");
		CommandManager commandManager = new CommandManager();
		try {
			commandManager.invokeCommand(args[0], args);
		}
		catch (Exception e) {
			System.out.println(e.getMessage());
		}
	}

}
