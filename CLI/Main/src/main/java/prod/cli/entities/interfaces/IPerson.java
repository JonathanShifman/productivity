package prod.cli.entities.interfaces;

import java.util.Date;
import java.util.Optional;

public interface IPerson {

    String getName();

    Optional<String> getPhoneNumber();

    Optional<Date> getBirthDate();

}
