export interface CategoryPayload {
  id?: number;
  name: string;
}

interface Category {
  id: number;
  name: string;
  updatedBy: number;
  createdAt: string;
  updatedAt: string;
}

export default Category;
