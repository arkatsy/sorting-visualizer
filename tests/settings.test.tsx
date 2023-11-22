import { describe, it, expect } from "vitest";
import { Settings } from "../src/components/Settings";
import { renderWithGlobalContext, screen, userEvent } from "./utils";

describe("Settings", () => {
  it("should disable UI when sorting", async () => {
    renderWithGlobalContext(<Settings />);
    const user = userEvent.setup();

    const settingsActions = [...screen.getAllByRole("button"), screen.getByRole("slider")];

    const sortButton = screen.getByText("Sort");
    await user.click(sortButton);

    settingsActions.forEach((element) => {
      expect(element).toBeDisabled();
    });
  });
});
