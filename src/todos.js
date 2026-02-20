import { format } from "date-fns";

function createTask(title, description, year, month, day, priority) {
    const dueDate = format(new Date(year, month, day), "PPPP");
    const formatTask = `${title}\n${description}    Due Date: ${dueDate}\nPriority: ${priority}`;

    return { formatTask };
}

