package prod.cli.main;

import prod.cli.commands.CommandManager;

import java.util.Arrays;

public class Main {

	public static void main(String[] args) {
		if (args.length == 0) {
			System.out.println("No command chosen");
			return;
		}
		
		System.out.println("Invoking command");
		CommandManager commandManager = new CommandManager();
		try {
			commandManager.invokeCommand(args[0], Arrays.copyOfRange(args, 1, args.length));
		}
		catch (Exception e) {
			System.out.println(e.getMessage());
		}
	}

}
