export interface EditSave {
  name: string;
  comment: string;
}

export interface Save extends EditSave {
  id: number;
  date: string;
}
