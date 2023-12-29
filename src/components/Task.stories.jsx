import Task from "./Task";

export default {
  component: Task,
  title: "Task",
  argTypes: {
    onArchiveTask: { action: "onArchiveTask" },
    onTogglePinTask: { action: "onTogglePinTask" },
    onEditTitle: { action: "onEditTitle" },
  },
};

export const Default = {
  args: {
    task: {
      id: "1",
      title: "Buy milk",
      state: "TASK_INBOX",
    },
  },
};

export const Pinned = {
  args: {
    task: {
      id: "2",
      title: "QA dropdown",
      state: "TASK_PINNED",
    },
  },
};

export const Archived = {
  args: {
    task: {
      id: "3",
      title: "Write schema for account menu",
      state: "TASK_ARCHIVED",
    },
  },
};
