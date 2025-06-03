import { render, screen, fireEvent } from "@testing-library/react";
import App from "../App";
import '@testing-library/jest-dom';

const validConfig = JSON.stringify({
  title: "Test Form",
  fields: [
    { name: "username", label: "Username", type: "string", validation: { required: true } },
    { name: "age", label: "Age", type: "numeric", validation: { min: 18, max: 99 } },
    { name: "email", label: "Email", type: "string", validation: { pattern: "^[^@\\s]+@[^@\\s]+\\.[^@\\s]+$" } }
  ],
  buttons: [{label: "Submit", "action": "handleSubmit"}]
});

describe("App with validations", () => {
  beforeEach(() => {
    render(<App />);
    fireEvent.change(screen.getByPlaceholderText(/Enter form configuration JSON here/i), {
      target: { value: validConfig },
    });
    fireEvent.click(screen.getByText("Generate Form"));
    fireEvent.click(screen.getByText("Result"));
  });

  it("shows required validation error if username is empty", () => {
    fireEvent.click(screen.getByText("Submit"));

    expect(screen.getByText("This field is required.")).toBeInTheDocument();
  });

  it("shows min validation error if age is below min", () => {
    fireEvent.change(screen.getByLabelText("Age"), { target: { value: "10" } });
    fireEvent.click(screen.getByText("Submit"));

    expect(screen.getByText("Minimum value is 18")).toBeInTheDocument();
  });

  it("shows max validation error if age is above max", () => {
    fireEvent.change(screen.getByLabelText("Age"), { target: { value: "120" } });
    fireEvent.click(screen.getByText("Submit"));

    expect(screen.getByText("Maximum value is 99")).toBeInTheDocument();
  });

  it("shows pattern validation error if email is invalid", () => {
    fireEvent.change(screen.getByLabelText("Email"), { target: { value: "invalidemail" } });
    fireEvent.click(screen.getByText("Submit"));

    expect(screen.getByText("Invalid format.")).toBeInTheDocument();
  });

  it("submits successfully if all fields are valid", () => {
    fireEvent.change(screen.getByLabelText("Username"), { target: { value: "testuser" } });
    fireEvent.change(screen.getByLabelText("Age"), { target: { value: "25" } });
    fireEvent.change(screen.getByLabelText("Email"), { target: { value: "test@example.com" } });

    // Mock window alert to suppress it and check call
    window.alert = jest.fn();

    fireEvent.click(screen.getByText("Submit"));

    expect(window.alert).toHaveBeenCalledWith("Form submitted successfully!");
  });
});