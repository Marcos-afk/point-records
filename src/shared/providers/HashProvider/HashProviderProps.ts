export interface HashProviderProps {
  hash(password: string): Promise<string>;
  compare(password: string, comparePassword: string): Promise<boolean>;
}
