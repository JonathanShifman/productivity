package prod.cli.entities;

import prod.cli.entities.interfaces.IItem;

public class Item implements IItem {

	private String name;
	
	public Item(String name) {
		this.name = name;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}
	
	
	
}
