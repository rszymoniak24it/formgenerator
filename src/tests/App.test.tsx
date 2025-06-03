import { render, screen, fireEvent } from "@testing-library/react";
import App from "../App";
import '@testing-library/jest-dom';


describe("App component", () => {
  
  beforeEach(() => {
    render(<App />);
  });
  
  it("renders Config tab by default", () => {
    expect(screen.getByPlaceholderText(/Enter form configuration JSON here/i)).toBeInTheDocument();
  });

  it("switches to Result tab", () => {
    fireEvent.click(screen.getByText("Result"));
    expect(screen.getByText(/No form configuration loaded/i)).toBeInTheDocument();
  });

  it("shows error on invalid JSON", () => {
    fireEvent.change(screen.getByPlaceholderText(/Enter form configuration JSON here/i), {
      target: { value: "{ invalid json" },
    });
    fireEvent.click(screen.getByText("Generate Form"));
    expect(screen.getByText("Invalid JSON")).toBeInTheDocument();
  });

  it("renders form on valid JSON", () => {
    const validJson = JSON.stringify({
      title: "Sample Form",
      fields: [
        { name: "username", label: "Username", type: "string" }
      ],
      buttons: [{label:"Submit"}]
    });

    fireEvent.change(screen.getByPlaceholderText(/Enter form configuration JSON here/i), {
      target: { value: validJson },
    });
    fireEvent.click(screen.getByText("Generate Form"));
    fireEvent.click(screen.getByText("Result"));

    expect(screen.getByText("Sample Form")).toBeInTheDocument();
    expect(screen.getByText("Username")).toBeInTheDocument();
    expect(screen.getByText("Submit")).toBeInTheDocument();
  });
});