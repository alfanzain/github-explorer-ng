export interface Repository {
  id: string;
  node_id: string;
  name: string;
  full_name: string;
  description: string;
  language: string;
  html_url: string;
  owner_url: string;
  watchers_count: number;
  stargazers_count: number;
  forks_count: number;
  open_issues_count: number;
  created_at: string;
  updated_at: string;
  owner: {
    id: number,
    login: string,
    avatar_url: string
  };
  author_avatar: string;
}
