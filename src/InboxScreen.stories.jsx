import { rest } from "msw";

import InboxScreen from "./InboxScreen";

import { Default as TaskListDefault } from "./components/TaskList.stories";

import { expect, userEvent, findByRole, within } from "@storybook/test";

export default {
  component: InboxScreen,
  title: "InboxScreen",
};

export const Default = {
  parameters: {
    msw: {
      handlers: [
        rest.get("/tasks", (req, res, ctx) => {
          return res(ctx.json(TaskListDefault.args));
        }),
      ],
    },
  },
};

export const Error = {
  args: {
    error: "Something",
  },
  parameters: {
    msw: {
      handlers: [
        rest.get("/tasks", (req, res, ctx) => {
          return res(ctx.json([]));
        }),
      ],
    },
  },
};

export const PinTask = {
  parameters: {
    ...Default.parameters,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const getTask = (id) => canvas.findByRole("listitem", { name: id });

    const itemToPin = await getTask("task-4");
    // Find the pin button
    const pinButton = await findByRole(itemToPin, "button", { name: "pin" });
    // Click the pin button
    await userEvent.click(pinButton);
    // Check that the pin button is now a unpin button
    const unpinButton = within(itemToPin).getByRole("button", {
      name: "unpin",
    });
    await expect(unpinButton).toBeInTheDocument();
  },
};
