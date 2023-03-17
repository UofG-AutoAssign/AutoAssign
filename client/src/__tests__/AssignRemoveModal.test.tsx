import '@testing-library/jest-dom';
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import AssignRemoveModal from '../components/general/AssignRemoveModal';

describe('AssignRemoveModal', () => {
  it('renders the correct text and buttons for the "AssignGraduate" modal type', () => {
    const handleSubmissionMock = jest.fn();
    render(
      <AssignRemoveModal
        handleSubmission={handleSubmissionMock}
        modalType="AssignGraduate"
      />
    );
    expect(screen.getByText(/Are you sure that you want to assign graduate?/i)).toBeInTheDocument();
    expect(screen.getByText(/Cancel/i)).toBeInTheDocument();
    expect(screen.getByText(/Yes, I'm sure/i)).toBeInTheDocument();
    expect(screen.getByText(/Yes, I'm sure/i)).toHaveClass('bg-blue-700');
    fireEvent.click(screen.getByText(/Yes, I'm sure/i));
    expect(handleSubmissionMock).toHaveBeenCalled();
  });

  it('renders the correct text and buttons for the "RemoveGraduate" modal type', () => {
    const handleSubmissionMock = jest.fn();
    render(
      <AssignRemoveModal
        handleSubmission={handleSubmissionMock}
        modalType="RemoveGraduate"
      />
    );
    expect(screen.getByText(/Are you sure that you want to remove graduate?/i)).toBeInTheDocument();
    expect(screen.getByText(/Cancel/i)).toBeInTheDocument();
    expect(screen.getByText(/Yes, I'm sure/i)).toBeInTheDocument();
    expect(screen.getByText(/Yes, I'm sure/i)).toHaveClass('bg-red-700');
    fireEvent.click(screen.getByText(/Yes, I'm sure/i));
    expect(handleSubmissionMock).toHaveBeenCalled();
  });

  it('renders the correct text and buttons for the "AssignManager" modal type', () => {
    // similar to previous tests, but with modalType="AssignManager"
    const handleSubmissionMock = jest.fn();
    render(
      <AssignRemoveModal
        handleSubmission={handleSubmissionMock}
        modalType="AssignManager"
      />
    );
    expect(screen.getByText(/Are you sure that you want to assign manager?/i)).toBeInTheDocument();
    expect(screen.getByText(/Cancel/i)).toBeInTheDocument();
    expect(screen.getByText(/Yes, I'm sure/i)).toBeInTheDocument();
    expect(screen.getByText(/Yes, I'm sure/i)).toHaveClass('bg-blue-700');
    fireEvent.click(screen.getByText(/Yes, I'm sure/i));
    expect(handleSubmissionMock).toHaveBeenCalled();
  });

  it('renders the correct text and buttons for the "RemoveManager" modal type', () => {
    // similar to previous tests, but with modalType="RemoveManager"
    const handleSubmissionMock = jest.fn();
    render(
      <AssignRemoveModal
        handleSubmission={handleSubmissionMock}
        modalType="RemoveManager"
      />
    );
    expect(screen.getByText(/Are you sure that you want to remove manager?/i)).toBeInTheDocument();
    expect(screen.getByText(/Cancel/i)).toBeInTheDocument();
    expect(screen.getByText(/Yes, I'm sure/i)).toBeInTheDocument();
    expect(screen.getByText(/Yes, I'm sure/i)).toHaveClass('bg-red-700');
    fireEvent.click(screen.getByText(/Yes, I'm sure/i));
    expect(handleSubmissionMock).toHaveBeenCalled();

  });

  it('renders the correct text and buttons for the "DeleteTeam" modal type', () => {
    // similar to previous tests, but with modalType="DeleteTeam"
    const handleSubmissionMock = jest.fn();
    render(
      <AssignRemoveModal
        handleSubmission={handleSubmissionMock}
        modalType="DeleteTeam"
      />
    );
    expect(screen.getByText(/Are you sure that you want to delete team?/i)).toBeInTheDocument();
    expect(screen.getByText(/Cancel/i)).toBeInTheDocument();
    expect(screen.getByText(/Yes, I'm sure/i)).toBeInTheDocument();
    expect(screen.getByText(/Yes, I'm sure/i)).toHaveClass('bg-red-700');
    fireEvent.click(screen.getByText(/Yes, I'm sure/i));
    expect(handleSubmissionMock).toHaveBeenCalled();
  });
});
