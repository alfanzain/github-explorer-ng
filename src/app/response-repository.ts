import { Repository } from "./repository";

export interface ResponseRepository {
  total_count: number;
  items: Repository[];
}
