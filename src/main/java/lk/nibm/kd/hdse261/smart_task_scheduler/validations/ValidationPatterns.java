package lk.nibm.kd.hdse261.smart_task_scheduler.validations;

public final class ValidationPatterns {

    private ValidationPatterns() {
    }

    public static final String PRIORITY = "HIGH|MEDIUM|LOW";

    public static final String DATE_YYYY_MM_DD = "^\\d{4}-\\d{2}-\\d{2}$";

    public static final String PHONE_10_DIGITS = "^$|^[0-9]{10}$";

    public static final String HEX_COLOR = "^#([A-Fa-f0-9]{6})$";
}