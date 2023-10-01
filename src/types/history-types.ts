export interface EditSave {
  name: string;
  comment: string;
}

export interface Save extends EditSave {
  id: number | null;
  date: string | null;
}
