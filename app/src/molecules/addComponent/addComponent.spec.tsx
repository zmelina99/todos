import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import AddComponent from './addComponent';

describe('AddComponent', () => {
  it('renders the component with the title', () => {
    render(
      <AddComponent
        title="Add Todo"
        inputLabel=""
        inputValue=""
        setData={() => {}}
        addValues={() => {}}
        dropdownOptions={[]}
        closeAddComponent={() => {}}
        isDisabled={() => false}
      />
    );
    expect(screen.getByText('Add Todo')).toBeInTheDocument();
  });
  it('renders the input with the correct label', () => {
    render(
      <AddComponent
        title=""
        inputLabel="Name"
        inputValue=""
        setData={() => {}}
        addValues={() => {}}
        dropdownOptions={[]}
        closeAddComponent={() => {}}
        isDisabled={() => false}
      />
    );
    expect(screen.getByText('Name')).toBeInTheDocument();
  });
  it('renders the input with the correct value', () => {
    render(
      <AddComponent
        title=""
        inputLabel=""
        inputValue="Test"
        setData={() => {}}
        addValues={() => {}}
        dropdownOptions={[]}
        closeAddComponent={() => {}}
        isDisabled={() => false}
      />
    );
    expect(screen.getByDisplayValue('Test')).toBeInTheDocument();
  });
  it('calls addValues when the add button is clicked', () => {
    const addValues = jest.fn();
    render(
      <AddComponent
        title=""
        inputLabel=""
        inputValue=""
        setData={() => {}}
        addValues={addValues}
        dropdownOptions={[]}
        closeAddComponent={() => {}}
        isDisabled={() => false}
      />
    );
    fireEvent.click(screen.getByText('Add'));
    expect(addValues).toHaveBeenCalled();
  });
  it('calls closeAddComponent when the close icon is clicked', () => {
    const closeAddComponent = jest.fn();
    render(
      <AddComponent
        title=""
        inputLabel=""
        inputValue=""
        setData={() => {}}
        addValues={() => {}}
        dropdownOptions={[]}
        closeAddComponent={closeAddComponent}
        isDisabled={() => false}
      />
    );
    fireEvent.click(screen.getByTestId('CloseButton'));
    expect(closeAddComponent).toHaveBeenCalled();
  });
});
