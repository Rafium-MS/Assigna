import type { Assignment } from '../types/assignment';

export const getLastAssignmentDate = (
  territoryId: string,
  assignments: Assignment[],
): Date | undefined => {
  return assignments
    .filter((assignment) => assignment.territoryId === territoryId)
    .map((assignment) => new Date(`${assignment.startDate}T00:00:00`))
    .sort((a, b) => b.getTime() - a.getTime())[0];
};
