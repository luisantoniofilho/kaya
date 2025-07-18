import { screen } from "@testing-library/react";

export const getFormElements = () => {
  return {
    titleInput: screen.getByRole("textbox", {
      name: /título/i,
    }),
    descriptionInput: screen.getByRole("textbox", {
      name: /descrição/i,
    }),
    categorySelect: screen.getByRole("combobox", { name: /categoria/i }),
    priceInput: screen.getByRole("spinbutton", { name: /preço/i }),
    imageInput: screen.getByLabelText(/imagem/i),
    phoneInput: screen.getByRole("textbox", { name: /telefone/i }),
    submitButton: screen.getByRole("button", {
      name: /anunciar produto|confirmar alterações/i,
    }),
  };
};
