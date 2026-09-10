import { ISelectOption } from '../../ui-kit';
import {
  TaskStatusTypes,
  TaskStatusTypesRu,
} from '../../enums/TaskStatusTypes';

export const options: ISelectOption[] = [
  { value: TaskStatusTypes.INPROGRESS, label: TaskStatusTypesRu.INPROGRESS },
  { value: TaskStatusTypes.TODO, label: TaskStatusTypesRu.TODO },
  { value: TaskStatusTypes.CANCELLED, label: TaskStatusTypesRu.CANCELLED },
  { value: TaskStatusTypes.DONE, label: TaskStatusTypesRu.DONE },
];
