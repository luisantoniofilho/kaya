import { render } from "@testing-library/react";
import userEvent, { UserEvent } from "@testing-library/user-event";
import AddOrEditProductForm from "../_components/forms/AddOrEditProductForm";
import { getCorrectValues } from "./utils/getCorrectValues";
import { getFormElements } from "./utils/getFormElements";

// Mock redirect from next/navigation
vi.mock("next/navigation", async () => {
  const actual =
    await vi.importActual<typeof import("next/navigation")>("next/navigation");
  return {
    ...actual,
    redirect: vi.fn(),
  };
});

// Mock the Input component to the file input not be required
vi.mock("../_components/ui/Input", () => {
  return {
    default: vi.fn(({ children, type, name, defaultValue, ...props }) => {
      if (type === "textarea") {
        return (
          <div>
            <label htmlFor={name}>{children}</label>
            <textarea
              id={name}
              name={name}
              defaultValue={defaultValue}
              {...props}
              required
            />
          </div>
        );
      }

      return (
        <div>
          <label htmlFor={name}>{children}</label>
          <input
            id={name}
            name={name}
            type={type}
            defaultValue={defaultValue}
            {...props}
            required={type !== "file"}
          />
        </div>
      );
    }),
  };
});

describe("AddOrEditProductForm Component", () => {
  let user: UserEvent;
  const mockOnSubmit = vi.fn().mockResolvedValue({ data: null });

  beforeEach(() => {
    vi.clearAllMocks();
    user = userEvent.setup();
  });

  test("should render form with empty initial fields", () => {
    render(<AddOrEditProductForm onSubmit={mockOnSubmit} />);

    const {
      titleInput,
      descriptionInput,
      categorySelect,
      priceInput,
      imageInput,
      phoneInput,
      submitButton,
    } = getFormElements();

    expect(titleInput).toHaveValue("");
    expect(descriptionInput).toHaveValue("");
    expect(categorySelect).toHaveValue("");
    expect(priceInput).toHaveValue(null);
    expect(imageInput).toHaveValue("");
    expect(phoneInput).toHaveValue("");
    expect(submitButton).toBeInTheDocument();
  });

  test("should submit form with correct values", async () => {
    render(<AddOrEditProductForm onSubmit={mockOnSubmit} />);

    const {
      titleInput,
      descriptionInput,
      categorySelect,
      phoneInput,
      priceInput,
      submitButton,
    } = getFormElements();

    // Get correct values to test
    const {
      correctTitle,
      correctDescription,
      correctCategory,
      correctPrice,
      correctPhone,
    } = getCorrectValues;

    await user.type(titleInput, correctTitle);
    await user.type(descriptionInput, correctDescription);
    await user.selectOptions(categorySelect, correctCategory);
    await user.type(phoneInput, correctPhone);
    await user.type(priceInput, correctPrice);

    await user.click(submitButton);

    expect(mockOnSubmit).toHaveBeenCalledOnce();
  });

  test("validates required fields", async () => {
    render(<AddOrEditProductForm onSubmit={mockOnSubmit} />);
    const { submitButton } = getFormElements();
    await user.click(submitButton);
    expect(mockOnSubmit).not.toHaveBeenCalled();
  });

  test("should render form with product data in edit mode", () => {
    render(
      <AddOrEditProductForm
        onSubmit={mockOnSubmit}
        product={{
          title: "Mesa de madeira",
          description: "Mesa de madeira com 2 anos de uso",
          category: "Mobília",
          contactNumber: "11912345678",
          price: 500,
        }}
      />,
    );

    const {
      titleInput,
      descriptionInput,
      categorySelect,
      phoneInput,
      priceInput,
    } = getFormElements();

    expect(titleInput).toHaveValue("Mesa de madeira");
    expect(descriptionInput).toHaveValue("Mesa de madeira com 2 anos de uso");
    expect(categorySelect).toHaveValue("Mobília");
    expect(phoneInput).toHaveValue("11912345678");
    expect(priceInput).toHaveValue(500);
  });
});
