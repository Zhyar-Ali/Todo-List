import { format } from "date-fns";

export default function createTask(title, description, date, priority) {
    const dueDate = format(new Date(date), "PPPP");
    const formatTask = `${title}\n${description}\nDue Date: ${dueDate}\nPriority: ${priority}`;

    return { formatTask };
}

